import { Peasant } from "./Peasant";
import { WereWolf } from "./WereWolf";

export class Seer extends Peasant {
    constructor(key: string, turn: number) {
        super(key, turn);
    }

    skry = (peasant: Peasant) => {
        if (peasant instanceof WereWolf) {
            return true;
        } else {
            return false;
        }
    }
}