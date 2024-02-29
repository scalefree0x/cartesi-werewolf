import { Peasant } from "./Peasant";

export class Doctor extends Peasant {
    constructor(key: string, turn: number) {
        super(key, turn);
    }

    heal = (peasant: Peasant) => {
        peasant.immune = true;
    }
}