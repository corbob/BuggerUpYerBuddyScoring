function DrawScorecard() {
    var suits = ['♥','♠','♦','♣','☺'];
    var direction = 1;
    var numCards = 1;
    headerRow = document.getElementById('header');
    scoreTable = document.getElementById('score');
    totalPlayers = parseInt(document.getElementById('numPlayers').value);
    maxHands = Math.floor(52 / totalPlayers);
    for (i = 1 ; i < (totalPlayers + 1) ; i++ ) {
        var player = document.createElement('th');
        player.innerText = 'Player ' + i;
        headerRow.appendChild(player);
    }
    for (i = 1 ; i < (maxHands * 2) + 1 ; i++) {
        if(numCards > maxHands) {
            direction = -1;
            numCards--;
        }
        var scoreRow = document.createElement('tr');
        var handNum = document.createElement('td');
        handNum.innerText = numCards;
        numCards += direction
        scoreRow.appendChild(handNum);
        var suit = document.createElement('td');
        suit.innerText = suits[(i-1) % 5];
        scoreRow.appendChild(suit);
        for (j = 1 ; j < (totalPlayers + 1) ; j++ ) {
            var player = document.createElement('td');
            player.innerHtml = '&nbsp;';
            scoreRow.appendChild(player);
        }
        scoreTable.appendChild(scoreRow);
    }
}