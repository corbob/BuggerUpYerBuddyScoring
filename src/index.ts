function DrawScorecard() {
    let suits: Array<string> = ['♥','♠','♦','♣','☺'];
    let direction: number = 1;
    let numCards: number = 1;
    let headerRow: HTMLTableRowElement = document.getElementById('header') as HTMLTableRowElement;
    let scoreTable: HTMLTableElement = document.getElementById('score') as HTMLTableElement;
    let totalPlayers: number = parseInt((document.getElementById('numPlayers') as HTMLInputElement).value);
    let maxHands: number = Math.floor(52 / totalPlayers);
    // Set header
    for (let i: number = 1 ; i < (totalPlayers + 1) ; i++ ) {
        var player = document.createElement('th');
        player.colSpan = 3;
        player.innerText = 'Player ' + i;
        headerRow.appendChild(player);
    }
    for (let i: number = 1 ; i < (maxHands * 2) + 1 ; i++) {
        if(numCards > maxHands) {
            direction = -1;
            numCards--;
        }
        var scoreRow = document.createElement('tr');
        scoreRow.id = 'hand' + numCards;
        var handNum = document.createElement('td');
        handNum.innerText = numCards as any as string;
        numCards += direction;
        scoreRow.appendChild(handNum);
        var suit = document.createElement('td');
        suit.innerText = suits[(i-1) % 5];
        suit.className = suits[(i-1) % 5];
        scoreRow.appendChild(suit);
        scoreRow.appendChild(newCell('totalBid',0 as any));
        for (let j: number = 1 ; j < (totalPlayers + 1) ; j++ ) {
            // var player = document.createElement('td');
            // player.innerHTML = '&nbsp;';
            scoreRow.appendChild(newCell('tricksBid','bid'));
            scoreRow.appendChild(newCell('tricksTaken','taken'));
            scoreRow.appendChild(newCell('score','score'));
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