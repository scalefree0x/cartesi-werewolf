import { Peasant } from "./Peasant";

export class Witch extends Peasant {
    constructor(key: string, turn: number) {
        super(key, turn);
    }

    poison = (peasant: Peasant) => {
        peasant.immune = true;
    }

    ward = (peasant: Peasant) => {
        peasant.die();
    }
}