import { Peasant } from "./Peasant";
import { WereWolf } from "./WereWolf";

export class Seer extends Peasant {

    private knowledge: { public_key: string, werewolf: boolean }[] = [];

    constructor(key: string, turn: number) {
        super(key, turn);
    }

    private updateKnowledge = (peasant: Peasant, isWerewolf: boolean) => {
        if (typeof peasant.public_key === "string") {
            this.knowledge.push({
                public_key: peasant.public_key,
                werewolf: isWerewolf,
            })
        } else {
            return {
                error: true,
                message: "This peasant shouldn't be here"
            }
        }
    }

    /**
     * This should update the UI, only for the Seer.
     * This can never update for anyone else.
     * Knowledge can be a curse when now one else will believe >:)
     */
    // is the seer ability one time use?
    skry = (peasant: Peasant, turn: number) => {
        this.updateKnowledge(peasant, peasant instanceof WereWolf);
        this.pass(turn);
        return this.knowledge;
    }

    // allow the personal retrieval of knowledge for the seer alone
    getKnowledge = () => this.knowledge;

}