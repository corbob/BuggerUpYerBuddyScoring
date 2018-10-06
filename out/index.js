var players = [];
var numPlayers;
var SUITS = ['♥', '♠', '♦', '♣', '☺'];
var headerRow;
var tblScore;
var playerNumbers;
var playerNames;
var scoreTable;
var scoreRow = document.createElement('tr');
var bodyOnload = function () {
    headerRow = l.gid('header');
    tblScore = l.gid('score');
    playerNumbers = l.gid('playerNumbers');
    playerNames = l.gid('playerNames');
    scoreRow.appendChild(l.newCell());
    scoreRow.appendChild(l.newCell());
    scoreRow.appendChild(l.newCell());
    var numPlayersInput = l.gid('numPlayers');
    numPlayersInput.addEventListener('change', calculateCards);
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
    var maxHands = parseInt(l.gid('numCards').value);
    // Set header
    for (var i = 0; i < totalPlayers; i++) {
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
        // bidCell.id = 'bids' + i;
        var tricksCell = l.newCell(0);
        // tricksCell.id = 'tricks' + i;
        handRow.appendChild(bidCell);
        tricksRow.appendChild(tricksCell);
        for (var j = 0; j < totalPlayers; j++) {
            handRow.appendChild(l.newCell('input', 'tricks Bid player' + j.toString()));
            tricksRow.appendChild(l.newCell('input', 'tricks Taken player' + j.toString()));
        }
        tblScore.appendChild(handRow);
        tblScore.appendChild(tricksRow);
    }
    tblScore.appendChild(scoreRow);
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
    var handNum = parseInt(this.parentElement.parentElement.id.replace('bids', '').replace('tricks', ''));
    //this.parentElement.parentElement.children[2].innerText = parseInt(this.parentElement.parentElement.children[2].innerText) + parseInt(this.value);
    try {
        if (this.classList.contains('Bid')) {
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
    var bidsCell = l.gid('bids' + handNum).children[2];
    if (totalBids === numCards) {
        bidsCell.classList.add('badInput');
    }
    else {
        bidsCell.classList.remove('badInput');
    }
    bidsCell.innerHTML = totalBids.toString();
}
function calculateCards() {
    console.log(this);
    var maxCards = Math.floor(52 / this.value);
    var numCardsInput = l.gid("numCards");
    numCardsInput.value = maxCards.toString();
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
