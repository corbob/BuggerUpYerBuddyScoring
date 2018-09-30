define(["require", "exports", "./player"], function (require, exports, player_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Game = /** @class */ (function () {
        function Game(playerNames) {
            var _this = this;
            this.maxHands = Math.floor(52 / playerNames.length);
            playerNames.forEach(function (element) {
                _this.players.push(new player_1.Player(element));
            });
            this.players.forEach(function (element) {
                var numCards = 1;
                var direction = 1;
                for (var i = 0; i < _this.maxHands * 2; i++) {
                    if (numCards > _this.maxHands) {
                        direction = -1;
                        numCards--;
                    }
                    element.createHand(numCards);
                    numCards += direction;
                }
            });
        }
        return Game;
    }());
    exports.Game = Game;
});
