let players: Array<Player> = [];
const SUITS: Array<string> = ['♥','♠','♦','♣','☺'];
let headerRow: HTMLTableRowElement;
let subHeaderRow: HTMLTableRowElement;
let scoreTable: HTMLTableElement;
let scoreRow: HTMLTableRowElement = document.createElement('tr');

function LoadVariables() {
    headerRow = document.getElementById('header') as HTMLTableRowElement;
    subHeaderRow = document.getElementById('subHeader') as HTMLTableRowElement;
    scoreTable = document.getElementById('score') as HTMLTableElement;
    scoreRow.appendChild(newCell());
    scoreRow.appendChild(newCell());
    scoreRow.appendChild(newCell());
}

function DrawScorecard() {
    let direction: number = 1;
    let numCards: number = 1;
    let totalPlayers: number = parseInt((document.getElementById('numPlayers') as HTMLInputElement).value);
    if (3 > totalPlayers || totalPlayers > 10) {
        window.alert("What the firetruck dude!");
        throw new Error("What the firetruck dude!");
    }
    let maxHands: number = Math.floor(52 / totalPlayers);
    // Set header
    for (let i: number = 0 ; i < totalPlayers ; i++ ) {
        players[i] = new Player('Player ' + i, maxHands);
        var currentPlayer = document.createElement('th');
        currentPlayer.colSpan = 2;
        currentPlayer.innerText = players[i].getName();
        headerRow.appendChild(currentPlayer);
        subHeaderRow.appendChild(newCell('Bid'));
        subHeaderRow.appendChild(newCell('Taken'));
        var scoreCell = newCell('0', 'totals');
        scoreCell.colSpan = 2;
        scoreRow.appendChild(scoreCell);
    }
    for (let i: number = 0 ; i < (maxHands * 2) ; i++) {
        if(numCards > maxHands) {
            direction = -1;
            numCards--;
        }
        var handRow = document.createElement('tr');
        handRow.id = `hand${ i }`;
        handRow.appendChild(newCell(numCards.toString()));
        numCards += direction;
        handRow.appendChild(newCell(SUITS[i % 5], SUITS[i % 5]));
        handRow.appendChild(newCell(0 as any));
        for (let j: number = 0 ; j < totalPlayers ; j++ ) {
            handRow.appendChild(newCell('input', 'tricksBid player' + j.toString()));
            handRow.appendChild(newCell('input', 'tricksTaken player' + j.toString()));
        }
        scoreTable.appendChild(handRow);
    }
    scoreTable.appendChild(scoreRow);

    // Add callback to all Bids.

    let allBids: HTMLInputElement[] = document.getElementsByClassName('tricksBid') as any as HTMLInputElement[];
    for (let i = 0 ; i < allBids.length ; i++){
        allBids[i].addEventListener('change', bidChanged);
    }
}

let newCell = (contents?: string, className?: string) => {
    let temp: HTMLTableCellElement = document.createElement('td');
    if(contents !== undefined && contents !== 'input') {
        temp.innerText = contents;
    } else if (contents === 'input') {
        let inputTemp: HTMLInputElement = document.createElement('input');
        inputTemp.type = 'number';
        inputTemp.defaultValue = '0';
        if(className !== undefined) {
            inputTemp.className = className;
        }
        temp.appendChild(inputTemp)
    } else {
        if(className !== undefined) {
            temp.className = className;
        }
        temp.innerHTML = '&nbsp;';
    }
    return temp;
}

class Player {
    private name: string;
    private handBids: number[];
    private handTakens: number[];
    constructor(name: string, maxHands: number) {
        this.name = name;
        this.handBids = [];
        this.handTakens = [];
    };
    getName(): string {
        return this.name;
    }
    
    setHandBid(handNum: number, tricksBid: number) {
        this.handBids[handNum] = tricksBid;
        console.log(handNum);
        console.log(tricksBid);
    };
}

function bidChanged() {
    let playerIndex: number = parseInt(this.className.replace(' ','').replace('tricksBid','').replace('player',''));
    let handNum: number = parseInt(this.parentElement.parentElement.id.replace('hand',''));
    //this.parentElement.parentElement.children[2].innerText = parseInt(this.parentElement.parentElement.children[2].innerText) + parseInt(this.value);
    players[playerIndex].setHandBid(handNum,parseInt(this.value));
    sumUpBids(this.parentElement.parentElement);
}

function sumUpBids(hand: HTMLTableRowElement) {
    let totalBids: number = 0;
    let bids: HTMLInputElement[] = hand.getElementsByClassName('tricksBid') as any as HTMLInputElement[];
    for ( let i: number; i < bids.length ; i++ ) {
        totalBids += parseInt(bids[i].value);
    }
    hand.children[2].innerHTML = totalBids.toString();
}