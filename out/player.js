define(["require", "exports", "./hand"], function (require, exports, hand_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Player = /** @class */ (function () {
        function Player(name) {
            this._name = name;
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
            // TODO: Calculate the score for the user.
        };
        Player.prototype.createHand = function (numCards) {
            this._hands.push(new hand_1.Hand(numCards));
        };
        Player.prototype.getHandTricks = function (handNum) {
            return this._hands[handNum].tricksBid;
        };
        Player.prototype.setHandTricks = function (handNum, tricksTaken) {
            this._hands[handNum].tricksTaken = tricksTaken;
        };
        Player.prototype.getHandBid = function (handNum) {
            return this._hands[handNum].tricksBid;
        };
        Player.prototype.setHandBid = function (handNum, tricksBid) {
            this._hands[handNum].tricksBid = tricksBid;
        };
        return Player;
    }());
    exports.Player = Player;
});
