class Lib {
    gid (id: string): HTMLElement {
        return document.getElementById(id);
    }
    error(message: string) {
        window.alert(message);
        throw (message);
    }
    newCell(contents?: string, className?: string): HTMLTableCellElement {
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
            temp.innerHTML = '&nbsp;';
        }
        if(className !== undefined) {
            temp.className = className;
        }
        return temp;
    }
    newInput(id: string, className?: string): HTMLDivElement {
        let temp: HTMLDivElement = document.createElement('div');
        let tempLbl: HTMLLabelElement = document.createElement('label');
        let tempInput: HTMLInputElement = document.createElement('input');
        tempLbl.id = 'label' + id;
        tempInput.id = 'input' + id;
        tempLbl.htmlFor = tempInput.id;
        tempLbl.innerText = id + ': ';
        temp.appendChild(tempLbl);
        temp.appendChild(tempInput);
        if(className !== undefined) {
            temp.className = className;
        }
        return temp;
    }
}

let l: Lib = new Lib();
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
    if (3 > totalPlayers || totalPlayers > 10) {
        l.error("What the firetruck dude!");
    }
    let maxHands: number = Math.floor(52 / totalPlayers);
    // Set header
    for (let i: number = 0 ; i < totalPlayers ; i++ ) {
        players[i] = new Player((l.gid('inputplayer' + i.toString()) as HTMLInputElement).value.toString());
        var currentPlayer = document.createElement('th');
        currentPlayer.colSpan = 2;
        currentPlayer.innerText = players[i].name;
        headerRow.appendChild(currentPlayer);
        subHeaderRow.appendChild(l.newCell('Bid'));
        subHeaderRow.appendChild(l.newCell('Taken'));
        var scoreCell = l.newCell('0', 'totals');
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
            handRow.appendChild(l.newCell('input', 'tricksBid player' + j.toString()));
            handRow.appendChild(l.newCell('input', 'tricksTaken player' + j.toString()));
        }
        tblScore.appendChild(handRow);
    }
    tblScore.appendChild(scoreRow);

    // Add callback to all Bids.

    let allBids: HTMLInputElement[] = document.getElementsByClassName('tricksBid') as any as HTMLInputElement[];
    for (let i = 0 ; i < allBids.length ; i++){
        allBids[i].addEventListener('change', bidChanged);
    }
}; // Draw Scoreboard on button click.



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

class Player {
    private _name: string;
    private _hands: Hand[]
    private _score: number;

    constructor(name: string) {
        this._name = name;
    };
    get name(): string {
        return this._name;
    }

    get score(): number {
        return this._score;
    }

    calculateScore() {
        // TODO: Calculate the score for the user.
    }

    createHand(numCards: number) {
        this._hands.push(new Hand(numCards));
    }

    getHandTricks(handNum: number): number {
        return this._hands[handNum].tricksBid;
    }
    setHandTricks(handNum: number, tricksTaken: number) {
        this._hands[handNum].tricksTaken = tricksTaken;
    }

    getHandBid(handNum: number): number {
        return this._hands[handNum].tricksBid;
    }
    
    setHandBid(handNum: number, tricksBid: number) {
        this._hands[handNum].tricksBid = tricksBid;
    }
}

class Hand {
    // public readonly numberCards: number;
    private _tricksBid: number;
    private _tricksTaken: number;

    constructor(private numberCards: number) {
    }
    
    get tricksBid(): number {
        return this._tricksBid;
    }
    set tricksBid(tricksBid: number) {
        if (tricksBid < 0 || tricksBid > this.numberCards) {
            l.error("Trying to set the bid to something not allowed");
        }
        this._tricksBid = tricksBid;
    }

    get tricksTaken(): number {
        return this._tricksTaken;
    }

    set tricksTaken(tricksTaken: number) {
        if (tricksTaken < 0 || tricksTaken > this.numberCards) {
            l.error("Trying to set the tricks taken to something not allowed");
        }
        this._tricksTaken = tricksTaken;
    }
}

class Game {
    private players: Player[];
    public readonly maxHands

    constructor(playerNames: string[]) {
        this.maxHands = Math.floor(52 / playerNames.length);
        playerNames.forEach(element => {
            this.players.push(new Player(element));
        });
        this.players.forEach(element => {
            let numCards: number = 1;
            let direction: number = 1;
            for (let i: number = 0; i < this.maxHands * 2 ; i++) {
                if(numCards > this.maxHands) {
                    direction = -1;
                    numCards--;
                }
                element.createHand(numCards);
                numCards += direction;
            }
        });
    }
    
}
