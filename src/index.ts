let players: Player[] = [];
let numPlayers: number;
const SUITS: string[] = ['♥','♠','♦','♣','☺'];
let headerRow: HTMLTableRowElement;
let tblScore: HTMLTableElement;
let playerNumbers: HTMLDivElement;
let playerNames: HTMLDivElement;
let scoreTable: HTMLDivElement;
let scoreRow: HTMLTableRowElement = document.createElement('tr');

let bodyOnload = () => {
    headerRow = l.gid('header') as HTMLTableRowElement;
    tblScore = l.gid('score') as HTMLTableElement;
    playerNumbers = l.gid('playerNumbers') as HTMLDivElement;
    playerNames = l.gid('playerNames') as HTMLDivElement;
    scoreRow.appendChild(l.newCell());
    scoreRow.appendChild(l.newCell());
    scoreRow.appendChild(l.newCell());
    let numPlayersInput: HTMLInputElement = l.gid('numPlayers') as HTMLInputElement;
    numPlayersInput.addEventListener('change', calculateCards);
}; // on load of body

function execNamePlayers() {
    numPlayers = parseInt((l.gid('numPlayers') as HTMLInputElement).value);
    if (3 > numPlayers || numPlayers > 10) {
        l.error("What the firetruck dude!");
    }
    playerNumbers.className = 'invis';
    playerNames.className = 'visible';
    let playNames = l.gid("nameInputs");
    for(let i = 0; i < numPlayers; i++) {
        playNames.appendChild(l.newInput('player' + i.toString(), 'playerNames'));
    }
}

function drawBoard() {
    let direction: number = 1;
    let numCards: number = 1;
    let totalPlayers: number = numPlayers;
    let maxHands: number = parseInt((l.gid('numCards') as HTMLInputElement).value);
    // Set header
    for (let i: number = 0 ; i < totalPlayers ; i++ ) {
        players[i] = new Player((l.gid('inputplayer' + i.toString()) as HTMLInputElement).value.toString(), maxHands);
        var currentPlayer = document.createElement('th');
        currentPlayer.innerText = players[i].name;
        headerRow.appendChild(currentPlayer);
        var scoreCell = l.newCell('0', 'totals player' + i);
        scoreRow.appendChild(scoreCell);
    }
    l.gid('playerNames').className = 'invis';
    l.gid('scoreTable').className = 'visible';
    for (let i: number = 0 ; i < (maxHands * 2) ; i++) {
        if(numCards > maxHands) {
            direction = -1;
            numCards--;
        }
        let handRow = document.createElement('tr');
        let tricksRow = document.createElement('tr');
        handRow.className = 'handRow';
        handRow.id = `bids${ i }`;
        tricksRow.id = `tricks${ i }`;
        let handCell = l.newCell(numCards.toString(), 'cards');
        handCell.rowSpan = 2;
        handRow.appendChild(handCell);
        numCards += direction;
        let suitCell = l.newCell(SUITS[i % 5], 'suits ' + SUITS[i % 5]);
        suitCell.rowSpan = 2;
        handRow.appendChild(suitCell);
        let bidCell = l.newCell(0 as any)
        // bidCell.id = 'bids' + i;
        let tricksCell = l.newCell(0 as any)
        // tricksCell.id = 'tricks' + i;
        handRow.appendChild(bidCell);
        tricksRow.appendChild(tricksCell);
        for (let j: number = 0 ; j < totalPlayers ; j++ ) {
            handRow.appendChild(l.newCell('input', 'tricks Bid player' + j.toString()));
            tricksRow.appendChild(l.newCell('input', 'tricks Taken player' + j.toString()));
        }
        tblScore.appendChild(handRow);
        tblScore.appendChild(tricksRow);
    }
    tblScore.appendChild(scoreRow);

    let allBids: HTMLInputElement[] = document.getElementsByClassName('tricks') as any as HTMLInputElement[];
    for (let i = 0 ; i < allBids.length ; i++){
        allBids[i].addEventListener('change', inputChanged);
    }
}; // Draw Scoreboard on button click.

function inputChanged() {
    if (this.oldValue === undefined) {
        this.oldValue = this.defaultValue;
    }
    let playerIndex: number = parseInt(this.className.replace('Bid','').replace('Taken','').replace('tricks','').replace('player',''));
    let handNum: number = parseInt(this.parentElement.parentElement.id.replace('bids','').replace('tricks',''));
    //this.parentElement.parentElement.children[2].innerText = parseInt(this.parentElement.parentElement.children[2].innerText) + parseInt(this.value);
    try {
        if(this.classList.contains('Bid')) {
            players[playerIndex].setHandBid(handNum,parseInt(this.value)); 
            sumUpBids(handNum);
        } else {
            players[playerIndex].setHandTricks(handNum,parseInt(this.value));    
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
    for (let i = 0; i < players.length ; i++) {
        totalBids += players[i].getHandBid(handNum);
    }
    let bidsCell = l.gid('bids' + handNum).children[2];
    if(totalBids === numCards) {
        bidsCell.classList.add('badInput');
    } else {
        bidsCell.classList.remove('badInput');
    }
    bidsCell.innerHTML = totalBids.toString();
}

function calculateCards() {
    console.log(this);
    let maxCards: number = Math.floor(52 / this.value);
    let numCardsInput: HTMLInputElement = l.gid("numCards") as HTMLInputElement;
    numCardsInput.value = maxCards.toString();
}

function sumUpTricks(handNum: number) {
    let totalTricks: number = 0;
    let numCards: number = players[0].getHandCards(handNum);
    for (let i = 0; i < players.length ; i++) {
        totalTricks += players[i].getHandTricks(handNum);
    }
    let tricksCell = l.gid('tricks' + handNum).children[0];
    if(totalTricks !== numCards) {
        tricksCell.classList.add('badInput');
    } else {
        tricksCell.classList.remove('badInput');
    }
    tricksCell.innerHTML = totalTricks.toString();
}

function calculateScore() {
    let totalScores: HTMLTableCellElement[] = document.getElementsByClassName("totals") as any as HTMLTableCellElement[];
    for (let i = 0; i < totalScores.length ; i++) {
        let playerNum = parseInt(totalScores[i].className.replace('totals','').replace('player',''))
        players[playerNum].calculateScore();
        totalScores[i].innerText = players[playerNum].score.toString();
    }
}