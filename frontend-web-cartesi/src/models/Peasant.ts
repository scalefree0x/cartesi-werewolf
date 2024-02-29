// import { Drunk } from "./Drunk";

export class Peasant {

    alive: null | boolean = null;
    immune: null | boolean = null;
    public_key: null | string = null;
    turn: null | number = null;

    constructor(key: string, turn: number) {
        this.alive = true;
        this.immune = false;
        this.public_key = key;
        this.turn = turn;
    }

    // perhaps we want to incorporate chat functionality and bind to states of alive?
    chat = () => {
        if (this.alive) {
            // say stuff somehow?
        } else {
            // razz them on that the dead cannot speak!
        }
    }

    die = () => {
        this.alive = false;
    }

    pass = (turn: number) => {
        if (turn === this.turn) {
            // if turn ends up higher than the max number of players, we'll handle that elsewhere
            return turn++;
        } else {
            return {
                error: false,
                message: "Not your turn to do that, buck'o!"
            }
        }
    }

    // perhaps we want to incorporate vote functionatity and bind to states of alive?
    vote = () => {
        if (this.alive) {
            // vote somehow?
        } {
            // razz them on that the dead cannot vote! or can they?? ;)
        }
    }

    wake = () => {
        this.immune = false;
    }
}