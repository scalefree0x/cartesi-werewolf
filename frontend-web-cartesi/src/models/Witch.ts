import { Peasant } from "./Peasant";
import { Drunk } from "./Drunk";

export class Witch extends Peasant {

    poison_used = false;
    ward_used = false;

    constructor(key: string, turn: number) {
        super(key, turn);
    }

    poison = (peasant: Peasant, turn: number) => {
        if (!this.poison_used) {
            if (!peasant.immune) {
                peasant.die();
                this.pass(turn);
            } else {
                // witch can still perform an action
                if (peasant instanceof Drunk && peasant.immune && peasant.filthy) {
                    return {
                        error: false,
                        message: "This person is so filthy you cannot get close enough to poison!"
                    }
                } else if (!peasant.immune) {
                    peasant.die();
                    this.pass(turn);
                } else {
                    return {
                        error: false,
                        message: "This person is protected by powers beyond your abilities!"
                    };
                }
            }
        } else {
            return {
                error: false,
                message: "You are out of poison!"
            }
        }
    }

    ward = (peasant: Peasant, turn: number) => {
        if (this.ward_used) {
            if (!peasant.immune) {
                peasant.immune = true;
                this.pass(turn);
            } else {
                // witch can still perform an action
                if (peasant instanceof Drunk && peasant.immune && peasant.filthy) {
                    return {
                        error: false,
                        message: "This person is filthy and no one, not even the werewolves are going to touch that!"
                    }
                } else if (!peasant.immune) {
                    peasant.immune = true;
                    this.pass(turn);
                } else {
                    return {
                        error: false,
                        message: "This person has no need for your attention"
                    };
                }
            }
        } else {
            return {
                error: false,
                message: "You have no more ward reagents!"
            }
        }
    }
}