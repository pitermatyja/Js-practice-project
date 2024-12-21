let timerHeading = document.getElementById('heading');
document.getElementById('Start').addEventListener('click', startGame);
document.getElementById('Stop').addEventListener('click', stopGame);
document.getElementById('Restart').addEventListener('click', restartGame);

let timeLeft = 100;
let timerId = null;
let isGameRunning = false;

let score = 0;
let scoreDisplay = document.getElementById('score');
let starPositions = [];
let bombPositions = [];
let maxBombs = 5;


function startGame() {
    if (isGameRunning === false && timeLeft > 0){
    timerHeading.textContent = timeLeft;
    isGameRunning = true;

    for(let i = 0; i < 3; i++) {
        placeNewStar();
    }
    for(let i = 0; i < 2; i++) {
        placeNewBomb();
    }
    
    timerId = setInterval(function() {
        timeLeft--;
        timerHeading.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            isGameRunning = false;
            document.getElementById('gameOver').style.display = 'block'
            document.getElementById('gameOverScore').textContent = 'Your score: ' + score;
        }
    }, 1000) }
    else {}
}

function stopGame() {
    if (isGameRunning === false){}
    else {
        clearInterval(timerId);
        isGameRunning= false;
    }
}

function restartGame() {
    if (isGameRunning === false && timeLeft === 100){}
    else { 
        clearInterval(timerId);
        isGameRunning = false;
        timeLeft = 100;
        score = 0;
        scoreDisplay.textContent = score;
        clearAllStars(); clearAllBombs();
        pointer.style.backgroundColor = 'white';
        currentPosition = 1;
        pointer = document.getElementById('no1');
        pointer.style.backgroundColor = 'black';
        startGame();
    }
 }

let pointer = document.getElementById('no1');
let currentPosition = 1;

// Listen for keyboard events on the whole document
document.addEventListener("keydown", function(e) {

    if (isGameRunning === true) {
let squareDown = document.getElementById('no' + (currentPosition + 4));
let squareRight = document.getElementById('no' + (currentPosition + 1));
let squareUp = document.getElementById('no' + (currentPosition - 4));
let squareLeft = document.getElementById('no' + (currentPosition - 1));

const rightEdge = [4, 8, 12, 16];
const leftEdge = [1, 5, 9, 13];


    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && 
        e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {}

else if (e.key === 'ArrowDown'){
    if (currentPosition <= 12)
    pointer.style.backgroundColor = 'white';
    squareDown.style.backgroundColor = "black";
    currentPosition = currentPosition +4;
    pointer = squareDown;

checkCollisions();}


else if (e.key === 'ArrowUp'){
    if (currentPosition >4){
    pointer.style.backgroundColor = 'white';
    squareUp.style.backgroundColor = "black";
    currentPosition = currentPosition -4;
    pointer = squareUp;

    checkCollisions();}
}

else if (e.key === 'ArrowLeft'){
    if(!leftEdge.includes(currentPosition)){
    pointer.style.backgroundColor = 'white';
    squareLeft.style.backgroundColor = "black";
    currentPosition = currentPosition -1;
    pointer = squareLeft

    checkCollisions();
}}
else if (e.key === 'ArrowRight'){
    if (!rightEdge.includes(currentPosition)){
    pointer.style.backgroundColor = 'white';
    squareRight.style.backgroundColor = "black";
    currentPosition = currentPosition +1;
    pointer = squareRight;
    checkCollisions();
}}
else{}

}});

function adjustScore(points) {
    score += points;
    scoreDisplay.textContent = score;
    if (points > 0){
        checkScoreAndAddBombs()
    }
}

function randomPosition() {
    return Math.floor(Math.random() * 16) + 1
}

function getAvailablePosition() {
    let position = randomPosition();
    while (
        position === currentPosition || starPositions.includes(position) ||
        bombPositions.includes(position)     
    ) {
        position = randomPosition();
    }
    return position;
}

function placeNewStar() {
    let position = getAvailablePosition();
    starPositions.push(position);
    let square = document.getElementById('no' + position);
    square.textContent = '⭐';
    square.style.fontSize = '50px';
    square.style.display = 'flex'
    square.style.justifyContent = 'center'
    square.style.alignItems = 'center'

}

function clearAllStars() {
    starPositions.forEach(position => {
        document.getElementById('no' + position).textContent = '';
    });
    starPositions = [];
}


function placeNewBomb() {
    if (bombPositions.length < 5) { 
        let availableSpaces = 16 - starPositions.length - bombPositions.length - 1; 
        if (availableSpaces > 3) { 
            let position = getAvailablePosition();
            bombPositions.push(position);
            let square = document.getElementById('no' + position);
            square.textContent = '💣';
    square.style.fontSize = '50px';
    square.style.display = 'flex';
    square.style.justifyContent = 'center'
    square.style.alignItems = 'center'
        }}
}

function clearAllBombs() {
    bombPositions.forEach(position => {
        document.getElementById('no' + position).textContent = '';
    });
    bombPositions = [];
}

function checkCollisions() {
    if (starPositions.includes(currentPosition)) {
        adjustScore(100);
        let starIndex = starPositions.indexOf(currentPosition);
        document.getElementById('no' + currentPosition).textContent = '';
        starPositions.splice(starIndex, 1);
        placeNewStar();
    }

    if (bombPositions.includes(currentPosition)) {
        adjustScore(-100);
        let bombIndex = bombPositions.indexOf(currentPosition);
        document.getElementById('no' + currentPosition).textContent = '';
        bombPositions.splice(bombIndex, 1);
        placeNewBomb();
        placeNewBomb();
    }
}

function checkScoreAndAddBombs (){
    if (score >= 800 && bombPositions.length < 3) {
        placeNewBomb();
    }
    if (score >= 3000 && bombPositions.length < 4) {
        placeNewBomb();
    }
    if (score >= 5500 && bombPositions.length < maxBombs) {
        placeNewBomb();
    }

}