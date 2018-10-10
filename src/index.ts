let players: Player[] = [];
let numPlayers: number;
const SUITS: string[] = ['♥', '♠', '♦', '♣', '☺'];
let headerRow: HTMLTableRowElement;
let tblScore: HTMLTableElement;
let playerNumbers: HTMLDivElement;
let playerNames: HTMLDivElement;
let scoreTable: HTMLDivElement;
let scoreRow: HTMLTableRowElement = document.createElement('tr');

function bodyOnload() {
    headerRow = l.gid('header') as HTMLTableRowElement;
    tblScore = l.gid('score') as HTMLTableElement;
    playerNumbers = l.gid('playerNumbers') as HTMLDivElement;
    playerNames = l.gid('playerNames') as HTMLDivElement;
    for (let i = 0; i < 3; i++) {
        scoreRow.appendChild(l.newCell());
    }
}

function calculateCards(selection) {
    let maxCards: number = Math.floor(52 / selection.value);
    let numCardsInput: HTMLInputElement = l.gid("numCards") as HTMLInputElement;
    numCardsInput.value = maxCards.toString();
}

function execNamePlayers() {
    numPlayers = parseInt((l.gid('numPlayers') as HTMLInputElement).value);
    if (3 > numPlayers || numPlayers > 10) {
        l.error("What the firetruck dude!");
    }
    playerNumbers.className = 'invis';
    playerNames.className = 'visible';
    let playNames = l.gid("nameInputs");
    for (let i = 0; i < numPlayers; i++) {
        playNames.appendChild(l.newInput('player' + i.toString(), 'playerNames'));
    }
}

function drawBoard() {
    let direction: number = 1;
    let numCards: number = 1;
    let maxHands: number = parseInt((l.gid('numCards') as HTMLInputElement).value);
    if ((maxHands * numPlayers) > 52 || maxHands < 1) {
        maxHands = Math.floor(52 / numPlayers);
    }
    // Set header
    for (let i: number = 0; i < numPlayers; i++) {
        players[i] = new Player((l.gid('inputplayer' + i.toString()) as HTMLInputElement).value.toString(), maxHands);
        var currentPlayer = document.createElement('th');
        currentPlayer.innerText = players[i].name;
        headerRow.appendChild(currentPlayer);
        var scoreCell = l.newCell('0', 'totals player' + i);
        scoreRow.appendChild(scoreCell);
    }
    l.gid('playerNames').className = 'invis';
    l.gid('scoreTable').className = 'visible';
    for (let i: number = 0; i < (maxHands * 2); i++) {
        if (numCards > maxHands) {
            direction = -1;
            numCards--;
        }
        let handRow = document.createElement('tr');
        let tricksRow = document.createElement('tr');
        handRow.className = 'handRow';
        handRow.id = `bids${i}`;
        tricksRow.id = `tricks${i}`;
        let handCell = l.newCell(numCards.toString(), 'cards');
        handCell.rowSpan = 2;
        handRow.appendChild(handCell);
        numCards += direction;
        let suitCell = l.newCell(SUITS[i % 5], 'suits ' + SUITS[i % 5]);
        suitCell.rowSpan = 2;
        handRow.appendChild(suitCell);
        let bidCell = l.newCell(0 as any)
        let tricksCell = l.newCell(0 as any)
        handRow.appendChild(bidCell);
        tricksRow.appendChild(tricksCell);
        for (let j: number = 0; j < numPlayers; j++) {
            let handBidCell = l.newCell(undefined, 'tricks Bid player' + j.toString())
            handBidCell.appendChild(l.newTrickInput(i, j, 'tricks bid'));
            handRow.appendChild(handBidCell);
            let handTricksCell = l.newCell(undefined, 'tricks Taken player' + j.toString())
            handTricksCell.appendChild(l.newTrickInput(i, j, 'tricks taken'));
            tricksRow.appendChild(handTricksCell);
        }
        tblScore.appendChild(handRow);
        tblScore.appendChild(tricksRow);
    }
    tblScore.appendChild(scoreRow);
}; // Draw Scoreboard on button click.

function inputChanged() {
    if (this.oldValue === undefined) {
        this.oldValue = this.defaultValue;
    }
    let playerIndex: number = this.dataset['player'];
    let handNum: number = this.dataset['hand'];
    try {
        if (this.classList.contains('bid')) {
            players[playerIndex].setHandBid(handNum, parseInt(this.value));
            sumUpBids(handNum);
        } else {
            players[playerIndex].setHandTricks(handNum, parseInt(this.value));
            sumUpTricks(handNum);
        }

        this.oldValue = this.value;
    } catch (error) {
        this.value = this.oldValue;
        console.log(error);
    }
    calculateScore();
}

function sumUpBids(handNum: number) {
    let totalBids: number = 0;
    let numCards: number = players[0].getHandCards(handNum);
    for (let i = 0; i < players.length; i++) {
        totalBids += players[i].getHandBid(handNum);
    }
    let bidsCell = l.gid(`bids${ handNum }`).children[2];
    if (totalBids === numCards) {
        bidsCell.classList.add('badInput');
    } else {
        bidsCell.classList.remove('badInput');
    }
    bidsCell.innerHTML = totalBids.toString();
}

function sumUpTricks(handNum: number) {
    let totalTricks: number = 0;
    let numCards: number = players[0].getHandCards(handNum);
    for (let i = 0; i < players.length; i++) {
        totalTricks += players[i].getHandTricks(handNum);
    }
    let tricksCell = l.gid('tricks' + handNum).children[0];
    if (totalTricks !== numCards) {
        tricksCell.classList.add('badInput');
    } else {
        tricksCell.classList.remove('badInput');
    }
    tricksCell.innerHTML = totalTricks.toString();
}

function calculateScore() {
    let totalScores: HTMLTableCellElement[] = document.getElementsByClassName("totals") as any as HTMLTableCellElement[];
    for (let i = 0; i < totalScores.length; i++) {
        let playerNum = parseInt(totalScores[i].className.replace('totals', '').replace('player', ''))
        players[playerNum].calculateScore();
        totalScores[i].innerText = players[playerNum].score.toString();
    }
}