import LIB = require('./lib');
import { Hand } from './hand';

export class Player {
    private _name: string;
    private _hands: Hand[]
    private _score: number;

    constructor(name: string) {
        this._name = name;
    };
    get name(): string {
        return this._name;
    }

    get score(): number {
        return this._score;
    }

    calculateScore() {
        // TODO: Calculate the score for the user.
    }

    createHand(numCards: number) {
        this._hands.push(new Hand(numCards));
    }

    getHandTricks(handNum: number): number {
        return this._hands[handNum].tricksBid;
    }
    setHandTricks(handNum: number, tricksTaken: number) {
        this._hands[handNum].tricksTaken = tricksTaken;
    }

    getHandBid(handNum: number): number {
        return this._hands[handNum].tricksBid;
    }
    
    setHandBid(handNum: number, tricksBid: number) {
        this._hands[handNum].tricksBid = tricksBid;
    }
}