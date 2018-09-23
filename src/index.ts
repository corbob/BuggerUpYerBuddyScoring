let Players: Array<Array<Hands>> = [[]];
const SUITS: Array<string> = ['♥','♠','♦','♣','☺'];
let headerRow: HTMLTableRowElement; // = document.getElementById('header') as HTMLTableRowElement;
let scoreTable: HTMLTableElement; // = document.getElementById('score') as HTMLTableElement;

function LoadVariables() {
    headerRow = document.getElementById('header') as HTMLTableRowElement;
    scoreTable = document.getElementById('score') as HTMLTableElement;
}

function DrawScorecard() {
    let direction: number = 1;
    let numCards: number = 1;
    let totalPlayers: number = parseInt((document.getElementById('numPlayers') as HTMLInputElement).value);
    let maxHands: number = Math.floor(52 / totalPlayers);
    // Set header
    for (let i: number = 0 ; i < totalPlayers ; i++ ) {
        Players[i] = [];
        var player = document.createElement('th');
        player.colSpan = 3;
        player.innerText = 'Player ' + i;
        headerRow.appendChild(player);
    }
    for (let i: number = 0 ; i < (maxHands * 2) ; i++) {
        if(numCards > maxHands) {
            direction = -1;
            numCards--;
        }
        var scoreRow = document.createElement('tr');
        scoreRow.id = 'hand' + numCards + 1;
        var handNum = document.createElement('td');
        handNum.innerText = numCards.toString();
        numCards += direction;
        scoreRow.appendChild(handNum);
        var suit = document.createElement('td');
        suit.innerText = SUITS[(i) % 5];
        suit.className = SUITS[(i) % 5];
        scoreRow.appendChild(suit);
        scoreRow.appendChild(newCell('totalBid',0 as any));
        for (let j: number = 0 ; j < totalPlayers ; j++ ) {
            // var player = document.createElement('td');
            // player.innerHTML = '&nbsp;';
            Players[j][i] = {
                tricksBid: newCell('tricksBid','bid'),
                tricksTaken: newCell('tricksTaken','taken'),
                score: newCell('score','score'),
            }
            scoreRow.appendChild(Players[j][i].tricksBid);
            scoreRow.appendChild(Players[j][i].tricksTaken);
            scoreRow.appendChild(Players[j][i].score);
        }
        scoreTable.appendChild(scoreRow);
    }
}

let newCell = (className?: string, contents?: string) => {
    let temp: HTMLTableCellElement = document.createElement('td');
    if(className !== undefined) {
        temp.className = className;
    }
    if(contents !== undefined) {
        temp.innerText = contents;
    } else {
        temp.innerHTML = '&nbsp;';
    }
    return temp;
}

interface Hands {
    tricksBid: HTMLTableCellElement;
    tricksTaken: HTMLTableCellElement;
    score: HTMLTableCellElement;
}