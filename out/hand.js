define(["require", "exports", "./lib"], function (require, exports, LIB) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Hand = /** @class */ (function () {
        function Hand(numberCards) {
            this.numberCards = numberCards;
        }
        Object.defineProperty(Hand.prototype, "tricksBid", {
            get: function () {
                return this._tricksBid;
            },
            set: function (tricksBid) {
                if (tricksBid < 0 || tricksBid > this.numberCards) {
                    LIB.error("Trying to set the bid to something not allowed");
                }
                this._tricksBid = tricksBid;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Hand.prototype, "tricksTaken", {
            get: function () {
                return this._tricksTaken;
            },
            set: function (tricksTaken) {
                if (tricksTaken < 0 || tricksTaken > this.numberCards) {
                    LIB.error("Trying to set the tricks taken to something not allowed");
                }
                this._tricksTaken = tricksTaken;
            },
            enumerable: true,
            configurable: true
        });
        return Hand;
    }());
    exports.Hand = Hand;
});
