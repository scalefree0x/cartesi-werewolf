import { Peasant } from "./Peasant";

export class Drunk extends Peasant {
    constructor(key: string, turn: number) {
        super(key, turn);
    }
    
    // The were wolves only smell piss and shit, no prey can possibly be here
    soilSelf = () => {
        this.immune = true;
    }

}