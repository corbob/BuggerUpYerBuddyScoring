class Player {
    private _name: string;
    private _hands: Hand[] = [];
    private _score: number = 0;

    constructor(name: string, numHands: number) {
        this._name = name;
        let numCards: number = 1;
        let direction: number = 1;
        for (let i = 0 ; i < (numHands * 2) ; i++) {
            if(numCards > numHands) {
                direction = -1;
                numCards--;
            }
            this._hands[i] = new Hand(numCards);
            numCards += direction;
        }
    };
    get name(): string {
        return this._name;
    }

    get score(): number {
        return this._score;
    }

    calculateScore() {
        this._score = 0;
        for (let i = 0; i < this._hands.length ; i++) {
            if(this._hands[i].tricksBid !== undefined && this._hands[i].tricksBid === this._hands[i].tricksTaken) {
                this._score += 10 + this._hands[i].tricksBid;
            }
        }
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
        return this._hands[handNum].tricksBid || 0;
    }
    
    setHandBid(handNum: number, tricksBid: number) {
        this._hands[handNum].tricksBid = tricksBid;
    }

    getHandCards(handNum: number): number {
        return this._hands[handNum].numberCards;
    }
}