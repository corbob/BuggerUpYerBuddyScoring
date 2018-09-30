var Lib = /** @class */ (function () {
    function Lib() {
    }
    Lib.prototype.gid = function (id) {
        return document.getElementById(id);
    };
    Lib.prototype.error = function (message) {
        window.alert(message);
        throw (message);
    };
    Lib.prototype.newCell = function (contents, className) {
        var temp = document.createElement('td');
        if (contents !== undefined && contents !== 'input') {
            temp.innerText = contents;
        }
        else if (contents === 'input') {
            var inputTemp = document.createElement('input');
            inputTemp.type = 'number';
            inputTemp.defaultValue = '0';
            if (className !== undefined) {
                inputTemp.className = className;
            }
            temp.appendChild(inputTemp);
        }
        else {
            temp.innerHTML = '&nbsp;';
        }
        if (className !== undefined) {
            temp.className = className;
        }
        return temp;
    };
    Lib.prototype.newInput = function (id, className) {
        var temp = document.createElement('div');
        var tempLbl = document.createElement('label');
        var tempInput = document.createElement('input');
        tempLbl.id = 'label' + id;
        tempInput.id = 'input' + id;
        tempLbl.htmlFor = tempInput.id;
        tempLbl.innerText = id + ': ';
        temp.appendChild(tempLbl);
        temp.appendChild(tempInput);
        if (className !== undefined) {
            temp.className = className;
        }
        return temp;
    };
    return Lib;
}());
var l = new Lib();
var players = [];
var numPlayers;
var SUITS = ['♥', '♠', '♦', '♣', '☺'];
var headerRow;
var subHeaderRow;
var tblScore;
var playerNumbers;
var playerNames;
var scoreTable;
var scoreRow = document.createElement('tr');
var bodyOnload = function () {
    headerRow = l.gid('header');
    subHeaderRow = l.gid('subHeader');
    tblScore = l.gid('score');
    playerNumbers = l.gid('playerNumbers');
    playerNames = l.gid('playerNames');
    scoreRow.appendChild(l.newCell());
    scoreRow.appendChild(l.newCell());
    scoreRow.appendChild(l.newCell());
}; // on load of body
function execNamePlayers() {
    numPlayers = parseInt(l.gid('numPlayers').value);
    playerNumbers.className = 'invis';
    playerNames.className = 'visible';
    var playNames = l.gid("nameInputs");
    for (var i = 0; i < numPlayers; i++) {
        playNames.appendChild(l.newInput('player' + i.toString(), 'playerNames'));
    }
}
function drawBoard() {
    var direction = 1;
    var numCards = 1;
    var totalPlayers = numPlayers;
    if (3 > totalPlayers || totalPlayers > 10) {
        l.error("What the firetruck dude!");
    }
    var maxHands = Math.floor(52 / totalPlayers);
    // Set header
    for (var i = 0; i < totalPlayers; i++) {
        players[i] = new Player(l.gid('inputplayer' + i.toString()).value.toString());
        var currentPlayer = document.createElement('th');
        currentPlayer.colSpan = 2;
        currentPlayer.innerText = players[i].name;
        headerRow.appendChild(currentPlayer);
        subHeaderRow.appendChild(l.newCell('Bid'));
        subHeaderRow.appendChild(l.newCell('Taken'));
        var scoreCell = l.newCell('0', 'totals');
        scoreCell.colSpan = 2;
        scoreRow.appendChild(scoreCell);
    }
    l.gid('playerNames').className = 'invis';
    l.gid('scoreTable').className = 'visible';
    for (var i = 0; i < (maxHands * 2); i++) {
        if (numCards > maxHands) {
            direction = -1;
            numCards--;
        }
        var handRow = document.createElement('tr');
        handRow.id = "hand" + i;
        handRow.appendChild(l.newCell(numCards.toString()));
        numCards += direction;
        handRow.appendChild(l.newCell(SUITS[i % 5], SUITS[i % 5]));
        handRow.appendChild(l.newCell(0));
        for (var j = 0; j < totalPlayers; j++) {
            handRow.appendChild(l.newCell('input', 'tricksBid player' + j.toString()));
            handRow.appendChild(l.newCell('input', 'tricksTaken player' + j.toString()));
        }
        tblScore.appendChild(handRow);
    }
    tblScore.appendChild(scoreRow);
    // Add callback to all Bids.
    var allBids = document.getElementsByClassName('tricksBid');
    for (var i = 0; i < allBids.length; i++) {
        allBids[i].addEventListener('change', bidChanged);
    }
}
; // Draw Scoreboard on button click.
function bidChanged() {
    var playerIndex = parseInt(this.className.replace(' ', '').replace('tricksBid', '').replace('player', ''));
    var handNum = parseInt(this.parentElement.parentElement.id.replace('hand', ''));
    //this.parentElement.parentElement.children[2].innerText = parseInt(this.parentElement.parentElement.children[2].innerText) + parseInt(this.value);
    players[playerIndex].setHandBid(handNum, parseInt(this.value));
    sumUpBids(this.parentElement.parentElement);
}
function sumUpBids(hand) {
    var totalBids = 0;
    var bids = hand.getElementsByClassName('tricksBid');
    for (var i = void 0; i < bids.length; i++) {
        totalBids += parseInt(bids[i].value);
    }
    hand.children[2].innerHTML = totalBids.toString();
}
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
        this._hands.push(new Hand(numCards));
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
                l.error("Trying to set the bid to something not allowed");
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
                l.error("Trying to set the tricks taken to something not allowed");
            }
            this._tricksTaken = tricksTaken;
        },
        enumerable: true,
        configurable: true
    });
    return Hand;
}());
var Game = /** @class */ (function () {
    function Game(playerNames) {
        var _this = this;
        this.maxHands = Math.floor(52 / playerNames.length);
        playerNames.forEach(function (element) {
            _this.players.push(new Player(element));
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
