# Copyright 2022 Cartesi Pte. Ltd.
#
# SPDX-License-Identifier: Apache-2.0
# Licensed under the Apache License, Version 2.0 (the "License"); you may not use
# this file except in compliance with the License. You may obtain a copy of the
# License at http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software distributed
# under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
# CONDITIONS OF ANY KIND, either express or implied. See the License for the
# specific language governing permissions and limitations under the License.

from enum import Enum
import rsa
import jsonpickle
import json
import random

Role = Enum("Role", ["MODERATOR", "WEREWOLF", "VILLAGER", "UNKNOWN"])
# 1 werewolf, 4 villagers, 1 moderator
NUMBER_OF_PLAYER = 6


class Player:
    """
    Werewolf player

    Encapsulates player status
    """

    def __init__(self, id: str, pub_key: str):
        self._id = id
        self._pub_key = pub_key

        self.role = Role.UNKNOWN
        self.alive = True
        self.can_be_voted = True
        self.has_voted = False
        self.has_moved = False
        self.votes_got = 0
        self.encrypted_role = ""

    @property
    def alive(self):
        return self._alive

    @property
    def can_be_voted(self):
        return self._can_be_voted

    @property
    def encrypted_role(self):
        return self._encrypted_role

    @property
    def has_moved(self):
        return self._has_moved

    @property
    def has_voted(self):
        return self._has_voted

    @property
    def pub_key(self):
        return self._pub_key

    @property
    def votes_got(self):
        return self._votes_got

    @property
    def id(self):
        return self._id

    @property
    def role(self):
        return self._role

    @alive.setter
    def alive(self, alive: bool):
        self._alive = alive

    @can_be_voted.setter
    def can_be_voted(self, can_be_voted: bool):
        self._can_be_voted = can_be_voted

    @encrypted_role.setter
    def encrypted_role(self, encrypted_role):
        self._encrypted_role = encrypted_role

    @has_moved.setter
    def has_moved(self, has_moved: bool):
        self._has_moved = has_moved

    @pub_key.setter
    def pub_key(self, pub_key):
        self._pub_key = pub_key

    @has_voted.setter
    def has_voted(self, has_voted: bool):
        self._has_voted = has_voted

    @votes_got.setter
    def votes_got(self, votes_got: int):
        self._votes_got = votes_got

    @role.setter
    def role(self, role: Role):
        self._role = role

    def move(self):
        if self.role == Role.MODERATOR:
            raise ValueError("moderator cannot move")

        if self._has_moved:
            raise ValueError("player has already moved")

        self._has_moved = True

    def vote(self, candidate):
        if self.role == Role.MODERATOR:
            raise ValueError("moderator cannot vote")

        if self._has_voted:
            raise ValueError("voter has already voted")

        if not candidate._can_be_voted:
            raise ValueError("candidate cannot be voted")

        self._has_voted = True
        candidate._votes_got += 1

        return candidate._votes_got

    def reset_vote(self):
        self._has_voted = False
        self._votes_got = 0

    def print(self):
        print(f"""player {self.id} plays {self.role}, alive: {self.alive}, has_moved: {self.has_moved},
              has_voted: {self.has_voted}, got_votes: {self.votes_got}, can_be_voted: {self.can_be_voted}""")


class Game:
    """
    Werewolf game state

    The game can last for several rounds to finish. For each round, the werewolf kills one villager during the night,
    the moderator will anounce the victim the next day.
    The remaining villagers try to vote out the suspicious werewolf, who will be killed based on the vote.
    When there's a tie, revote is required.
    The game ends when all players from one party are all killed.
    """

    def __init__(self):
        self.__reset()

    def __reset(self):
        self._started = False
        self._is_daytime = True
        self._rounds = 0
        self._players = {}
        self._move_history = []
        self._moves = 0
        self._votes = 0
        self._alives = {}
        self._moderator = ""
        self._werewolf = ""
        self._game_result = ""

    def __try_get_player(self, id: str):
        return self._players.get(id)

    def __get_player(self, id: str):
        player = self._players.get(id)

        if player is None:
            raise ValueError("player is not found")

        return player

    def __advance(self):
        self._rounds += 1

    def __toggle_day(self):
        self._is_daytime = not self._is_daytime
        self._moves = 0
        for v in self._alives:
            player = self.__get_player(v)
            player.has_moved = False

        if self._is_daytime:
            self.__advance()

    def __kill(self, victim_id: str):
        victim = self.__get_player(victim_id)

        if not victim.alive:
            raise ValueError("victim already died")

        victim.alive = False
        self._alives.remove(victim_id)

        self.__toggle_day()

    def new_player(self, data):
        id = data["metadata"]["msg_sender"].upper()
        pub_key = data["payload"]

        if len(self._players) >= NUMBER_OF_PLAYER:
            raise ValueError("game is full, please join the next one")

        if self._started:
            raise ValueError("game has started, please join the next one")

        if self.__try_get_player(id) is not None:
            raise ValueError("player already joined")

        self._players[id] = Player(id, pub_key)

        if len(self._players) == NUMBER_OF_PLAYER:
            # TODO: select one player to be the moderator
            # moderator should assign roles to other player
            moderator = random.choice(list(self._players.keys()))
            # print(f"moderator: {moderator}")

            self._players[moderator].role = Role.MODERATOR
            self._players[moderator].can_be_voted = False
            self._moderator = moderator

    def reveal_role(self, player, payload):
        key = rsa.PrivateKey.load_pkcs1(bytes.fromhex(payload), "DER")
        role = rsa.decrypt(bytes.fromhex(player.encrypted_role), key)
        player.role = role
        if role == Role.WEREWOLF:
            self._werewolf = player.id

    def finish(self):  # def finish(self, payload):
        if len(self._werewolf) == 0 and len(self._alives) == 2:
            self._game_result = "WEREWOLF WIN!!!"
        elif len(self._werewolf) != 0 and self._werewolf not in self._alives:
            self._game_result = "VILLAGER WIN!!!"
        else:
            print("game is not finished")

        # private_keys_dict = json.loads(bytes.fromhex(payload).decode())
        # # TODO: replay the game with moderator key revealed

        # # decrypt everyone's role
        # for p, der in private_keys_dict.items():
        #     player = self.__get_player(p)
        #     if player.role == Role.MODERATOR:
        #         continue

        #     key = rsa.PrivateKey.load_pkcs1(bytes.fromhex(der), "DER")
        #     role = rsa.decrypt(bytes.fromhex(player.encrypted_role), key)

        #     if role == b"WEREWOLF":
        #         player.role = Role.WEREWOLF
        #         self._werewolf = p
        #     elif role == b"VILLAGER":
        #         player.role = Role.VILLAGER
        #     else:
        #         raise ValueError("invalid role")

        # werewolf = self.__get_player(self._werewolf)
        # alives = len(self._alives)
        # if alives > 2 and not werewolf.alive:
        #     self._game_result = "VILLAGER WIN!!!"
        #     # print("VILLAGER WIN!!!")
        # elif alives == 2 and werewolf.alive:
        #     self._game_result = "WEREWOLF WIN!!!"
        #     # print("WEREWOLF WIN!!!")
        # else:
        #     raise ValueError("game is not finished")

        # self.__reset()

    def handle_inspect(self):
        state = jsonpickle.encode(self, keys=True)
        return state

    def handle_advance(self, data):
        if not self._started:
            if len(self._players) == NUMBER_OF_PLAYER:
                self.dispatch_roles(data)
            else:
                self.new_player(data)
        else:
            player_id = data["metadata"]["msg_sender"].upper()
            player = self.__get_player(player_id)
            if self._game_result != "":
                self.reveal_role(player, data["payload"])
            elif player_id not in self._alives and player.role == Role.UNKNOWN:
                self.reveal_role(player, data["payload"])
                # "finish" = "0x66696e697368"
            elif data["payload"][:12] == "66696e697368":
                # self.finish(data["payload"][12:])
                self.finish()
            elif self._is_daytime:
                self.handle_vote(data)
            else:
                self.handle_night(data)

    def handle_night(self, data):
        if data["metadata"]["msg_sender"].upper() == self._moderator:
            self.handle_kill(bytes.fromhex(data["payload"]).decode())
        else:
            self.handle_move(data)

    def handle_move(self, data):
        player_id = data["metadata"]["msg_sender"].upper()

        player = self.__get_player(player_id)

        if not player.alive:
            raise ValueError("player already died")

        player.move()
        self._moves += 1
        self._move_history.append(data)

    def handle_vote(self, data):
        voter_id = data["metadata"]["msg_sender"].upper()
        candidate_id = bytes.fromhex(data["payload"]).decode()

        voter = self.__get_player(voter_id)

        if not voter.alive:
            raise ValueError("voter already died")

        candidate = self.__get_player(candidate_id)

        if not candidate.alive:
            raise ValueError("candidate already died")

        voter.vote(candidate)
        self._votes += 1

        if self._votes == len(self._alives):
            # sort the votes of alives in decending order
            alives = list(
                filter(lambda p: p.alive, self._players.values()))
            alives.sort(
                key=lambda p: p.votes_got, reverse=True)
            highest = alives[0].votes_got
            highest_candidate = alives[0].id

            highest_ties = list(
                filter(lambda p: p.votes_got == highest, alives))
            if len(highest_ties) > 1:
                print("revote!")
                self._votes = 0
                # more than one highest vote, requires revote
                for v in alives:
                    self._players[v._id].can_be_voted = False
                    self._players[v._id].votes_got = 0
                    self._players[v._id].has_voted = False

                for tie in highest_ties:
                    self._players[tie._id].can_be_voted = True
            else:
                for v in alives:
                    self._players[v._id].can_be_voted = True
                    self._players[v._id].votes_got = 0
                    self._players[v._id].has_voted = False
                self.__kill(highest_candidate)

    def handle_kill(self, victim_id: str):
        if self._moves != len(self._alives):
            raise ValueError("everyone has to make a move")

        self.__kill(victim_id)

    def dispatch_roles(self, data):
        if data["metadata"]["msg_sender"].upper() != self._moderator:
            raise ValueError("only moderator can dispatch roles")

        encrypted_roles = json.loads(bytes.fromhex(data["payload"]).decode())

        for p, e in encrypted_roles.items():
            self.__get_player(p).encrypted_role = e

        self._alives = set(list(encrypted_roles.keys()))
        self._started = True
        self.__toggle_day()

    def print(self):
        print("==================================================================")
        print(
            f"game round: {self._rounds}, daytime: {self._is_daytime}, game started: {self._started}")
        for p in self._players.values():
            p.print()


# # testing below ##


# g = Game()

# g.print()
# g.handle_inspect()

# keys = []

# for i in range(0, NUMBER_OF_PLAYER):
#     (pub_key, pri_key) = rsa.newkeys(2048)

#     keys.append((pri_key, pub_key))

# player_ids = ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266".upper(),
#               "0x70997970C51812dc3A010C7d01b50e0d17dc79C8".upper(),
#               "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC".upper(),
#               "0x90F79bf6EB2c4f870365E785982E1f101E93b906".upper(),
#               "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65".upper(),
#               "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc".upper()]

# id_to_key = {}
# for i in range(0, NUMBER_OF_PLAYER):
#     id_to_key[player_ids[i]] = keys[i]

# data = {}
# for i in range(0, NUMBER_OF_PLAYER):
#     data["metadata"] = {}
#     data["metadata"]["msg_sender"] = player_ids[i]
#     data["payload"] = keys[i][1].save_pkcs1("DER").hex()
#     # new_player
#     g.handle_advance(data)

# g.print()

# moderator = g._moderator
# gamers = player_ids.copy()
# gamers.remove(moderator)
# werewolf = random.choice(gamers)
# villagers = gamers.copy()
# villagers.remove(werewolf)

# encrypted_roles = {}
# encrypted_roles[werewolf] = rsa.encrypt(
#     b"WEREWOLF", id_to_key[werewolf][1]).hex()


# for i in range(0, NUMBER_OF_PLAYER):
#     # skip moderator and werewolf itself
#     if player_ids[i] == moderator or player_ids[i] == werewolf:
#         continue

#     encrypted_roles[player_ids[i]] = rsa.encrypt(b"VILLAGER", keys[i][1]).hex()


# data = {}
# data["metadata"] = {}
# data["metadata"]["msg_sender"] = moderator
# data["payload"] = json.dumps(encrypted_roles)

# # dispatch roles
# g.handle_advance(data)

# g.print()

# # every alive send his move

# # werewolf kills
# data = {}
# data["metadata"] = {}
# data["metadata"]["msg_sender"] = werewolf
# data["payload"] = rsa.encrypt(
#     b"victim_id private_key", id_to_key[werewolf][1]).hex()
# g.handle_advance(data)

# data = {}
# for i in range(0, NUMBER_OF_PLAYER):
#     # skip moderator and werewolf itself
#     if player_ids[i] == moderator or player_ids[i] == werewolf:
#         continue

#     data["metadata"] = {}
#     data["metadata"]["msg_sender"] = player_ids[i]
#     data["payload"] = rsa.encrypt(b"private_key", keys[i][1]).hex()
#     # villagers move
#     g.handle_advance(data)
# g.print()


# victim = random.choice(villagers)

# # moderator send plaintext kill
# data = {}
# data["metadata"] = {}
# data["metadata"]["msg_sender"] = moderator
# data["payload"] = victim
# g.handle_advance(data)
# g.print()

# alives = villagers.copy()
# alives.remove(victim)

# data = {}
# data["metadata"] = {}
# data["metadata"]["msg_sender"] = werewolf
# data["payload"] = werewolf
# g.handle_advance(data)
# data["metadata"]["msg_sender"] = alives[0]
# data["payload"] = werewolf
# g.handle_advance(data)
# data["metadata"]["msg_sender"] = alives[1]
# data["payload"] = alives[1]
# g.handle_advance(data)
# data["metadata"]["msg_sender"] = alives[2]
# data["payload"] = alives[1]
# g.handle_advance(data)
# g.print()

# # revote
# data = {}
# data["metadata"] = {}
# data["metadata"]["msg_sender"] = werewolf
# data["payload"] = werewolf
# g.handle_advance(data)
# data["metadata"]["msg_sender"] = alives[0]
# data["payload"] = werewolf
# g.handle_advance(data)
# data["metadata"]["msg_sender"] = alives[1]
# data["payload"] = werewolf
# g.handle_advance(data)
# data["metadata"]["msg_sender"] = alives[2]
# data["payload"] = werewolf
# g.handle_advance(data)
# g.print()

# # finish game and try to validate result

# # print(jsonpickle.encode(g))

# private_keys_dict = {}
# for i in range(0, NUMBER_OF_PLAYER):
#     private_keys_dict[player_ids[i]] = keys[i][0].save_pkcs1(
#         "DER").hex()


# data = {}
# data["metadata"] = {}
# data["metadata"]["msg_sender"] = moderator
# data["payload"] = "finish" + json.dumps(private_keys_dict)
# # g.handle_inspect()
# g.handle_advance(data)
# g.print()
