var Player = /** @class */ (function () {
    function Player(name, numHands) {
        this._hands = [];
        this._score = 0;
        this._name = name;
        var numCards = 1;
        var direction = 1;
        for (var i = 0; i < (numHands * 2); i++) {
            if (numCards > numHands) {
                direction = -1;
                numCards--;
            }
            this._hands[i] = new Hand(numCards);
            numCards += direction;
        }
    }
    ;
    Object.defineProperty(Player.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "score", {
        get: function () {
            return this._score;
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.calculateScore = function () {
        this._score = 0;
        for (var i = 0; i < this._hands.length; i++) {
            if (this._hands[i].tricksBid !== undefined && this._hands[i].tricksBid === this._hands[i].tricksTaken) {
                this._score += 10 + this._hands[i].tricksBid;
            }
        }
        // TODO: Calculate the score for the user.
    };
    Player.prototype.createHand = function (numCards) {
        this._hands.push(new Hand(numCards));
    };
    Player.prototype.getHandTricks = function (handNum) {
        return this._hands[handNum].tricksBid;
    };
    Player.prototype.setHandTricks = function (handNum, tricksTaken) {
        this._hands[handNum].tricksTaken = tricksTaken;
    };
    Player.prototype.getHandBid = function (handNum) {
        return this._hands[handNum].tricksBid || 0;
    };
    Player.prototype.setHandBid = function (handNum, tricksBid) {
        this._hands[handNum].tricksBid = tricksBid;
    };
    Player.prototype.getHandCards = function (handNum) {
        return this._hands[handNum].numberCards;
    };
    return Player;
}());
