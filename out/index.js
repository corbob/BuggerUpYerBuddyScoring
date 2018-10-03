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
    if (3 > numPlayers || numPlayers > 10) {
        l.error("What the firetruck dude!");
    }
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
    var maxHands = Math.floor(52 / totalPlayers);
    // Set header
    for (var i = 0; i < totalPlayers; i++) {
        players[i] = new Player(l.gid('inputplayer' + i.toString()).value.toString(), maxHands);
        var currentPlayer = document.createElement('th');
        currentPlayer.colSpan = 2;
        currentPlayer.innerText = players[i].name;
        headerRow.appendChild(currentPlayer);
        subHeaderRow.appendChild(l.newCell('Bid'));
        subHeaderRow.appendChild(l.newCell('Taken'));
        var scoreCell = l.newCell('0', 'totals player' + i);
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
            handRow.appendChild(l.newCell('input', 'tricks Bid player' + j.toString()));
            handRow.appendChild(l.newCell('input', 'tricks Taken player' + j.toString()));
        }
        tblScore.appendChild(handRow);
    }
    tblScore.appendChild(scoreRow);
    // Add callback to all Bids.
    var allBids = document.getElementsByClassName('tricks');
    for (var i = 0; i < allBids.length; i++) {
        allBids[i].addEventListener('change', inputChanged);
    }
}
; // Draw Scoreboard on button click.
function inputChanged() {
    if (this.oldValue === undefined) {
        this.oldValue = this.defaultValue;
    }
    var playerIndex = parseInt(this.className.replace('Bid', '').replace('Taken', '').replace('tricks', '').replace('player', ''));
    var handNum = parseInt(this.parentElement.parentElement.id.replace('hand', ''));
    //this.parentElement.parentElement.children[2].innerText = parseInt(this.parentElement.parentElement.children[2].innerText) + parseInt(this.value);
    try {
        if (this.classList.contains('Bid')) {
            players[playerIndex].setHandBid(handNum, parseInt(this.value));
        }
        else {
            players[playerIndex].setHandTricks(handNum, parseInt(this.value));
        }
        this.oldValue = this.value;
    }
    catch (error) {
        this.value = this.oldValue;
        console.log(error);
    }
    calculateScore();
    sumUpBids(handNum);
}
function sumUpBids(handNum) {
    var totalBids = 0;
    for (var i = 0; i < players.length; i++) {
        totalBids += players[i].getHandBid(handNum);
    }
    l.gid('hand' + handNum).children[2].innerHTML = totalBids.toString();
}
function calculateScore() {
    var totalScores = document.getElementsByClassName("totals");
    for (var i = 0; i < totalScores.length; i++) {
        var playerNum = parseInt(totalScores[i].className.replace('totals', '').replace('player', ''));
        players[playerNum].calculateScore();
        totalScores[i].innerText = players[playerNum].score.toString();
    }
}
