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
        players[i] = new Player('Player ' + i);
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
        handRow.id = 'hand' + numCards + 1;
        handRow.appendChild(newCell(numCards.toString()));
        numCards += direction;
        handRow.appendChild(newCell(SUITS[i % 5], SUITS[i % 5]));
        handRow.appendChild(newCell(0 as any));
        for (let j: number = 0 ; j < totalPlayers ; j++ ) {
            handRow.appendChild(newCell('input', 'trickBid'));
            handRow.appendChild(newCell('input', 'trickTaken'));
            // player[j].getHand(i) = {
            //     tricksBid: newCell('input','tricksBid'),
            //     tricksTaken: newCell('input','tricksTaken'),
            // }
            // scoreRow.appendChild(Players[j][i].tricksBid);
            // scoreRow.appendChild(Players[j][i].tricksTaken);
            // scoreRow.appendChild(Players[j][i].score);
        }
        scoreTable.appendChild(handRow);
    }
    scoreTable.appendChild(scoreRow)
}

let newCell = (contents?: string, className?: string) => {
    let temp: HTMLTableCellElement = document.createElement('td');
    if(className !== undefined) {
        temp.className = className;
    }
    if(contents !== undefined && contents !== 'input') {
        temp.innerText = contents;
    } else if (contents === 'input') {
        let inputTemp: HTMLInputElement = document.createElement('input');
        inputTemp.type = 'number';
        temp.appendChild(inputTemp)
    } else {
        temp.innerHTML = '&nbsp;';
    }
    return temp;
}

class Player {
    private name: string;
    private hands: Array<Hand>;
    constructor(name: string) {
        this.name = name;
    };
    getName(): string {
        return this.name;
    }
    getHand(handNum: number): Hand {
        return this.hands[handNum];
    };
    setHand(handNum: number, hand: Hand) {

    };
}
interface Hand {
    tricksBid: number;
    tricksTaken: number;
}