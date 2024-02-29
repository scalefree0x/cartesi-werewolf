import { Peasant } from "./Peasant";

export class Drunk extends Peasant {

    filthy: boolean = false;
    drink_left: boolean = true;

    constructor(key: string, turn: number) {
        super(key, turn);
    }
    
    // The were wolves only smell piss and shit, no prey can possibly be here
    soilSelf = (turn: number) => {
        if(this.immune) {
            return {
                error: false,
                message: "Sorry buddy, you're clean tonight...",
            }
        } else if(this.drink_left) {
            this.immune = true;
            this.filthy = true;
            this.drink_left = false;
            // end turn
            this.pass(turn);
        } else {
            return {
                error: false,
                message: "Sorry buddy, you're all out of booze...",
            }
        }
    }

}