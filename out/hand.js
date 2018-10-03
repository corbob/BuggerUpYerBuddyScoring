var Hand = /** @class */ (function () {
    function Hand(_numberCards) {
        this._numberCards = _numberCards;
    }
    Object.defineProperty(Hand.prototype, "tricksBid", {
        get: function () {
            return this._tricksBid;
        },
        set: function (tricksBid) {
            if (tricksBid < 0 || tricksBid > this._numberCards) {
                l.error("Trying to set the bid to something not allowed");
            }
            this._tricksBid = tricksBid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hand.prototype, "numberCards", {
        get: function () {
            return this._numberCards;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hand.prototype, "tricksTaken", {
        get: function () {
            return this._tricksTaken;
        },
        set: function (tricksTaken) {
            if (tricksTaken < 0 || tricksTaken > this._numberCards) {
                l.error("Trying to set the tricks taken to something not allowed");
            }
            this._tricksTaken = tricksTaken;
        },
        enumerable: true,
        configurable: true
    });
    return Hand;
}());
