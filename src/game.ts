class Game {
    private players: Player[];
    public readonly maxHands

    constructor(playerNames: string[]) {
        this.maxHands = Math.floor(52 / playerNames.length);
        playerNames.forEach(element => {
            //this.players.push(new Player(element));
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