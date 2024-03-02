from werewolf.network import Network
import time
import rsa
import random
import sys
import json

NUMBER_OF_PLAYER = 6

player_ids = [
    "0xd003f96523847D128956fB85f3d9BD011f14F4bc".upper(),
    "0xD9050051EE3363e5Ed2591b9F340ce60182Bd059".upper(),
    "0xfd5a9267da950327c1e5556d2f6De3Ec6a482dcC".upper(),
    "0x560cAf9471a7eBeeD69e733Cf220eB1Df57D09Bd".upper(),
    "0x706f17D480759bE6FD91dFe8bb98e4E16eE8Fa5D".upper(),
    "0xf4e676C749eFc281b59976BF307dea4A6287FB39".upper()
]


def main(player_index):
    signer_address = player_ids[player_index]
    print(f"\n Your address is : *** {signer_address} ***\n")
    n = Network()

    public_key, private_key = rsa.newkeys(2048)
    # send public key to join the game
    n.send_on_chain(public_key.save_pkcs1("DER").hex(), player_index)

    moderator = ""

    # get game state and moderator
    while not moderator:
        g = n.inspect()
        moderator = g._moderator
        time.sleep(1)

    if signer_address == moderator:
        role = "MODERATOR"

        # randomly choose a werewolf and send out all roles
        other_players = list(g._players.keys())
        other_players.remove(moderator)
        werewolf = random.choice(other_players)

        encrypted_roles = {}
        for i in range(0, NUMBER_OF_PLAYER):
            player = player_ids[i]
            if player == moderator:
                continue
            elif player == werewolf:
                encrypted_roles[player] = rsa.encrypt("WEREWOLF".encode(
                ), rsa.PublicKey.load_pkcs1(bytes.fromhex(g._players[player].pub_key), "DER")).hex()
            else:
                encrypted_roles[player] = rsa.encrypt("VILLAGER".encode(
                ), rsa.PublicKey.load_pkcs1(bytes.fromhex(g._players[player].pub_key), "DER")).hex()

        dump_encrypted_roles = json.dumps(encrypted_roles)
        n.send_on_chain(dump_encrypted_roles.encode().hex(), player_index)
    else:
        encrypted_role = ""
        # wait for role
        while len(encrypted_role) == 0:
            g = n.inspect()
            encrypted_role = g._players[signer_address].encrypted_role
            time.sleep(1)

        role = rsa.decrypt(bytes.fromhex(encrypted_role), private_key).decode()

    print("\nYour role is *** ", role, " ***\n")

    # game begins

    g = n.inspect()
    moderator_public_key = rsa.PublicKey.load_pkcs1(
        bytes.fromhex(g._players[moderator].pub_key), "DER")
    moves_counter = 0
    while True:
        if len(g._game_result) != 0:
            print(g._game_result + "\n")
            n.send_on_chain(private_key.save_pkcs1("DER").hex(), player_index)
            break
        # get the current round and _is_daytime
        # round = g._rounds
        _is_daytime = g._is_daytime

        if _is_daytime == False:
            print("\nnight falls...\n")
            if role == 'WEREWOLF':
                if not g._players[signer_address].has_moved:
                    victim = input('Who would you kill?\n')
                    n.send_on_chain(rsa.encrypt(
                        victim.encode(), moderator_public_key).hex(), player_index)
            elif role == 'VILLAGER':
                if not g._players[signer_address].has_moved:
                    n.send_on_chain(rsa.encrypt(
                        "dummy".encode(), moderator_public_key).hex(), player_index)
            elif role == 'MODERATOR':
                while len(g._move_history) < moves_counter + len(g._alives):
                    time.sleep(1)
                    g = n.inspect()

                if len(g._move_history) == moves_counter + len(g._alives):
                    move_history = g._move_history[moves_counter: moves_counter + len(
                        g._alives)]

                    victim = ""
                    for m in move_history:
                        payload = rsa.decrypt(
                            bytes.fromhex(m["payload"]), private_key).decode()

                        sender = m["metadata"]["msg_sender"].upper()
                        if sender == werewolf:
                            victim = payload

                    print(f"victim: {victim}\n")
                    n.send_on_chain(victim.encode().hex(), player_index)

                    moves_counter += len(g._alives)
        else:
            print("\nday breaks...\n")
            # discuss who is werewolf and vote
            if role != 'MODERATOR':
                vote_for = input('Who you think is werewolf?\n')
                n.send_on_chain(vote_for.encode().hex(), player_index)
                # revote if tie?

        # wait till day/night toggles
        while (_is_daytime == g._is_daytime):
            time.sleep(1)
            g = n.inspect()

        # check if game has finished
        if role == 'MODERATOR':
            alives = len(g._alives)
            werewolf_alive = (werewolf in g._alives)
            finish_payload = "finish"
            if alives > 2 and not werewolf_alive:
                n.send_on_chain(finish_payload.encode().hex(), player_index)
                print("\nVillagers win !!!\n")
                break
            elif alives == 2 and werewolf_alive:
                n.send_on_chain(finish_payload.encode().hex(), player_index)
                print("\nWerewolf wins !!!\n")
                break
        elif not signer_address in g._alives:
            print("I died...\n")
            # reveal private key
            n.send_on_chain(private_key.save_pkcs1("DER").hex(), player_index)
            break
        else:
            # wait for moderator to check if the game finishes
            time.sleep(15)
            g = n.inspect()
            if g._game_result != "":
                break

        
        g = n.inspect()

    print("game ended.\n")
    # n.send_on_chain(private_key, player_index)


main(int(sys.argv[1]))
