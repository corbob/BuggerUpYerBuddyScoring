var players = [];
var numPlayers;
var SUITS = ['♥', '♠', '♦', '♣', '☺'];
var headerRow;
var tblScore;
var playerNumbers;
var playerNames;
var scoreTable;
var scoreRow = document.createElement('tr');
function bodyOnload() {
    headerRow = l.gid('header');
    tblScore = l.gid('score');
    playerNumbers = l.gid('playerNumbers');
    playerNames = l.gid('playerNames');
    for (var i = 0; i < 3; i++) {
        scoreRow.appendChild(l.newCell());
    }
}
function calculateCards(selection) {
    var maxCards = Math.floor(52 / selection.value);
    var numCardsInput = l.gid("numCards");
    numCardsInput.value = maxCards.toString();
}
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
    var maxHands = parseInt(l.gid('numCards').value);
    if ((maxHands * numPlayers) > 52 || maxHands < 1) {
        maxHands = Math.floor(52 / numPlayers);
    }
    // Set header
    for (var i = 0; i < numPlayers; i++) {
        players[i] = new Player(l.gid('inputplayer' + i.toString()).value.toString(), maxHands);
        var currentPlayer = document.createElement('th');
        currentPlayer.innerText = players[i].name;
        headerRow.appendChild(currentPlayer);
        var scoreCell = l.newCell('0', 'totals player' + i);
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
        var tricksRow = document.createElement('tr');
        handRow.className = 'handRow';
        handRow.id = "bids" + i;
        tricksRow.id = "tricks" + i;
        var handCell = l.newCell(numCards.toString(), 'cards');
        handCell.rowSpan = 2;
        handRow.appendChild(handCell);
        numCards += direction;
        var suitCell = l.newCell(SUITS[i % 5], 'suits ' + SUITS[i % 5]);
        suitCell.rowSpan = 2;
        handRow.appendChild(suitCell);
        var bidCell = l.newCell(0);
        var tricksCell = l.newCell(0);
        handRow.appendChild(bidCell);
        tricksRow.appendChild(tricksCell);
        for (var j = 0; j < numPlayers; j++) {
            var handBidCell = l.newCell(undefined, 'tricks Bid player' + j.toString());
            handBidCell.appendChild(l.newTrickInput(i, j, 'tricks bid'));
            handRow.appendChild(handBidCell);
            var handTricksCell = l.newCell(undefined, 'tricks Taken player' + j.toString());
            handTricksCell.appendChild(l.newTrickInput(i, j, 'tricks taken'));
            tricksRow.appendChild(handTricksCell);
        }
        tblScore.appendChild(handRow);
        tblScore.appendChild(tricksRow);
    }
    tblScore.appendChild(scoreRow);
}
; // Draw Scoreboard on button click.
function inputChanged() {
    if (this.oldValue === undefined) {
        this.oldValue = this.defaultValue;
    }
    var playerIndex = this.dataset['player'];
    var handNum = this.dataset['hand'];
    try {
        if (this.classList.contains('bid')) {
            players[playerIndex].setHandBid(handNum, parseInt(this.value));
            sumUpBids(handNum);
        }
        else {
            players[playerIndex].setHandTricks(handNum, parseInt(this.value));
            sumUpTricks(handNum);
        }
        this.oldValue = this.value;
    }
    catch (error) {
        this.value = this.oldValue;
        console.log(error);
    }
    calculateScore();
}
function sumUpBids(handNum) {
    var totalBids = 0;
    var numCards = players[0].getHandCards(handNum);
    for (var i = 0; i < players.length; i++) {
        totalBids += players[i].getHandBid(handNum);
    }
    var bidsCell = l.gid("bids" + handNum).children[2];
    if (totalBids === numCards) {
        bidsCell.classList.add('badInput');
    }
    else {
        bidsCell.classList.remove('badInput');
    }
    bidsCell.innerHTML = totalBids.toString();
}
function sumUpTricks(handNum) {
    var totalTricks = 0;
    var numCards = players[0].getHandCards(handNum);
    for (var i = 0; i < players.length; i++) {
        totalTricks += players[i].getHandTricks(handNum);
    }
    var tricksCell = l.gid('tricks' + handNum).children[0];
    if (totalTricks !== numCards) {
        tricksCell.classList.add('badInput');
    }
    else {
        tricksCell.classList.remove('badInput');
    }
    tricksCell.innerHTML = totalTricks.toString();
}
function calculateScore() {
    var totalScores = document.getElementsByClassName("totals");
    for (var i = 0; i < totalScores.length; i++) {
        var playerNum = parseInt(totalScores[i].className.replace('totals', '').replace('player', ''));
        players[playerNum].calculateScore();
        totalScores[i].innerText = players[playerNum].score.toString();
    }
}
