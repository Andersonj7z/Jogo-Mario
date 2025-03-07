const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const restartButton = document.querySelector('.restart-button');
const gameOverMessage = document.querySelector('.game-over-message');
const scoreDisplay = document.querySelector('#score');

let score = 0;
let gameRunning = true;

const scoreInterval = setInterval(() => {
    if (gameRunning) {
        score++;
        scoreDisplay.textContent = score;
    }
}, 100);

const jump = () => {
    if (!gameRunning) return;
    
    mario.classList.add('jump');

    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
};

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './img/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        gameRunning = false; 
        clearInterval(scoreInterval); 

        gameOverMessage.innerHTML = `Game Over! <br> Pontuação: ${score}`;
        gameOverMessage.style.display = 'block';
        restartButton.style.display = 'block'; 

        clearInterval(loop);
    }
}, 10);

document.addEventListener('keydown', jump);

function restartGame() {
    location.reload();
}