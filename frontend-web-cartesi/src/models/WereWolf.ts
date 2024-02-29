import { Peasant } from "./Peasant";

export class WereWolf extends Peasant {

    private knowledge: { public_key: string, werewolf: boolean }[] = []

    constructor(key: string, turn: number) {
        super(key, turn);
    }

    kill = (peasant: Peasant, turn: number) => {
        if (!peasant.immune && peasant.alive) {
            peasant.die();
            this.pass(turn);
        } else if (!peasant.alive) {
            return {
                error: false,
                message: "There's beating a dead horse, then there's this..."
            }
        } else {
            return {
                error: false,
                message: "You have no power here, WereWolf the Gray!!"
            }
        }
    }
    // help identify other werewolves (maybe let then sniff out other roles?)
    sniff = (peasant: Peasant, turn: number) => {
        if (typeof peasant.public_key === 'string') {
            this.knowledge.push({
                public_key: peasant.public_key,
                werewolf: peasant instanceof WereWolf,
            });
            this.pass(turn);
            return this.knowledge
        } else {
            return {
                error: true,
                message: "This peasant shouldn't be here"
            }
        }
    }

    getKnowledge = () => this.knowledge;
}