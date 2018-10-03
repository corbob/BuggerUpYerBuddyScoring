var Game = /** @class */ (function () {
    function Game(playerNames) {
        var _this = this;
        this.maxHands = Math.floor(52 / playerNames.length);
        playerNames.forEach(function (element) {
            //this.players.push(new Player(element));
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
