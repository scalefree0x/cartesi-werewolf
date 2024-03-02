import { Peasant } from "./Peasant";
import { Drunk } from "./Drunk";

export class Doctor extends Peasant {

    special_used = false;

    constructor(key: string, turn: number) {
        super(key, turn);
    }

    heal = (peasant: Peasant | Drunk, turn: number) => {
        if (peasant instanceof Drunk && !peasant.immune && !this.special_used) {
            return {
                error: false,
                message: "This person is filthy and no one, not even the werewolves are going to touch that!"
            };
        } else if (!peasant.immune && !this.special_used) {
            peasant.immune = true;
            this.pass(turn);
        } else if (this.special_used) {
            return {
                error: false,
                message: "You are out of supplies!"
            }
        }else {
            return {
                error: false,
                message: "This person has no need for your attention"
            };
        }
    }
}