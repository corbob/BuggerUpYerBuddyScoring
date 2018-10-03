let players: Player[] = [];
let numPlayers: number;
const SUITS: string[] = ['♥','♠','♦','♣','☺'];
let headerRow: HTMLTableRowElement;
let subHeaderRow: HTMLTableRowElement;
let tblScore: HTMLTableElement;
let playerNumbers: HTMLDivElement;
let playerNames: HTMLDivElement;
let scoreTable: HTMLDivElement;
let scoreRow: HTMLTableRowElement = document.createElement('tr');

let bodyOnload = () => {
    headerRow = l.gid('header') as HTMLTableRowElement;
    subHeaderRow = l.gid('subHeader') as HTMLTableRowElement;
    tblScore = l.gid('score') as HTMLTableElement;
    playerNumbers = l.gid('playerNumbers') as HTMLDivElement;
    playerNames = l.gid('playerNames') as HTMLDivElement;
    scoreRow.appendChild(l.newCell());
    scoreRow.appendChild(l.newCell());
    scoreRow.appendChild(l.newCell());
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
    let maxHands: number = Math.floor(52 / totalPlayers);
    // Set header
    for (let i: number = 0 ; i < totalPlayers ; i++ ) {
        players[i] = new Player((l.gid('inputplayer' + i.toString()) as HTMLInputElement).value.toString(), maxHands);
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
    for (let i: number = 0 ; i < (maxHands * 2) ; i++) {
        if(numCards > maxHands) {
            direction = -1;
            numCards--;
        }
        var handRow = document.createElement('tr');
        handRow.id = `hand${ i }`;
        handRow.appendChild(l.newCell(numCards.toString()));
        numCards += direction;
        handRow.appendChild(l.newCell(SUITS[i % 5], SUITS[i % 5]));
        handRow.appendChild(l.newCell(0 as any));
        for (let j: number = 0 ; j < totalPlayers ; j++ ) {
            handRow.appendChild(l.newCell('input', 'tricks Bid player' + j.toString()));
            handRow.appendChild(l.newCell('input', 'tricks Taken player' + j.toString()));
        }
        tblScore.appendChild(handRow);
    }
    tblScore.appendChild(scoreRow);

    // Add callback to all Bids.

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
    let handNum: number = parseInt(this.parentElement.parentElement.id.replace('hand',''));
    //this.parentElement.parentElement.children[2].innerText = parseInt(this.parentElement.parentElement.children[2].innerText) + parseInt(this.value);
    try {
        if(this.classList.contains('Bid')) {
            players[playerIndex].setHandBid(handNum,parseInt(this.value));    
        } else {
            players[playerIndex].setHandTricks(handNum,parseInt(this.value));    
        }
        
        this.oldValue = this.value;
    } catch (error) {
        this.value = this.oldValue;
        console.log(error);
    }
    calculateScore();
    sumUpBids(handNum);
}

function sumUpBids(handNum: number) {
    let totalBids: number = 0;
    for (let i = 0; i < players.length ; i++) {
        totalBids += players[i].getHandBid(handNum);
    }
    l.gid('hand' + handNum).children[2].innerHTML = totalBids.toString();
}

function calculateScore() {
    let totalScores: HTMLTableCellElement[] = document.getElementsByClassName("totals") as any as HTMLTableCellElement[];
    for (let i = 0; i < totalScores.length ; i++) {
        let playerNum = parseInt(totalScores[i].className.replace('totals','').replace('player',''))
        players[playerNum].calculateScore();
        totalScores[i].innerText = players[playerNum].score.toString();
    }
}