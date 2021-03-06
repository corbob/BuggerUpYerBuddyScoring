class Hand {
    // public readonly numberCards: number;
    private _tricksBid: number;
    private _tricksTaken: number;

    constructor(private _numberCards: number) {
    }
    
    get tricksBid(): number {
        return this._tricksBid;
    }
    set tricksBid(tricksBid: number) {
        if (tricksBid < 0 || tricksBid > this._numberCards) {
            l.error("Trying to set the bid to something not allowed");
        }
        this._tricksBid = tricksBid;
    }
    
    get numberCards(): number {
        return this._numberCards;
    }

    get tricksTaken(): number {
        return this._tricksTaken;
    }

    set tricksTaken(tricksTaken: number) {
        if (tricksTaken < 0 || tricksTaken > this._numberCards) {
            l.error("Trying to set the tricks taken to something not allowed");
        }
        this._tricksTaken = tricksTaken;
    }
}