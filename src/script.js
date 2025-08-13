let computerMove;
let result = '';
function pickComputerMove() {
    const randomNumber = Math.random();
    if (randomNumber < 1 / 3) {
        computerMove = 'Rock'
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'Paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'Scissors';
    }
    return computerMove;
}

let counts = JSON.parse(localStorage.getItem('counts')) || {
    Wins: 0,
    Looses: 0,
    Ties: 0
}
let intervalId;
let isautoplay = false;
function autoplay(){
    if (!isautoplay){
intervalId = setInterval(function(){
    const playerMove = pickComputerMove();
    pickplayerMove(playerMove);
},1000);
isautoplay = true;
    }else{
        isautoplay = false;
        clearInterval(intervalId);
    }

}
function pickplayerMove(playerMove) {
    let computerMove = pickComputerMove();
    if(playerMove === ''){
        computerMove = '';
        result = '';
    }
    
    if (playerMove === 'Rock') {
        if (computerMove == 'Rock') {
            result = 'You Tie';
        } else if (computerMove === 'Paper') {
            result = 'You Win';
        } else if (computerMove === 'Scissors') {
            result = 'You Loose';
        }
    } else if (playerMove === 'Paper') {
        if (computerMove === 'Paper') {
            result = 'You Tie';
        } else if (computerMove === 'Rock') {
            result = 'You Loose';
        } else if (computerMove === 'Scissors') {
            result = 'You Win';
        }
    } else if (playerMove === 'Scissors') {
        if (computerMove === 'Scissors') {
            result = 'You Tie';
        } else if (computerMove === 'Rock') {
            result = 'You Win';
        } else if (computerMove === 'Paper') {
            result = 'You Loose';
        }
    }

    if (result === 'You Win') {
        counts.Wins++;
    } else if (result === 'You Loose') {
        counts.Looses++;
    } else if (result === 'You Tie') {
        counts.Ties++;
    }

    localStorage.setItem('counts', JSON.stringify(counts));

    const resultElement = document.querySelector('.show-result');
    resultElement.innerHTML = `You <span class="html-entity">&#10147;</span> <img src="${playerMove}-emoji.png" class="player-icon"> Computer <span class="html-entity">&#10147;</span><img src="${computerMove}-emoji.png" class="computer-icon"><div class="result-div">${result}</div>`
    updateScore();
}
function updateScore() {
    const countsElement = document.querySelector('.show-counts');
    countsElement.innerHTML = `Wins:${counts.Wins} Looses:${counts.Looses} Ties:${counts.Ties}`;
}
updateScore();
