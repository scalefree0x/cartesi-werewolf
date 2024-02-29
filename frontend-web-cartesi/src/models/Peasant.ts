
export class Peasant {

    alive: null | boolean = null;
    immune: null | boolean = null;
    publicKey: null | string = null;
    turn: null | number = null;

    constructor(key: string, turn: number) {
        this.alive = true;
        this.immune = false;
        this.publicKey = key;
        this.turn = turn;
    }

    // perhaps we want to incorporate chat functionality and bind to states of alive?
    chat = () => { 
        if(this.alive) {
            // say stuff somehow?
        } else {
            // razz them on that the dead cannot speak!
        }
    }

    die = () => {
        this.alive = false;
    }

    // perhaps we want to incorporate vote functionatity and bind to states of alive?
    vote = () => {
        if(this.alive) {
            // vote somehow?
        } {
            // razz them on that the dead cannot vote! or can they?? ;)
        }
    }

    wake = () => {
        this.immune = false;
    }
}