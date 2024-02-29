import { Peasant } from "./Peasant";

export class WereWolf extends Peasant {

    constructor(key: string, turn: number) {
        super(key, turn);
    }
    
    kill = (peasant: Peasant) => {
        peasant.die();
    }
}