let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

let snake = [{ x: 10, y: 10 }];
let direction = 'RIGHT';
let food = { x: 15, y: 15 };
let score = 0;
let gameInterval;
let countdownInterval;
let countdownTime = 3;

let startButton = document.getElementById('startButton');
let restartButton = document.getElementById('restartButton');
let rankingButton = document.getElementById('rankingButton');
let countdownDisplay = document.getElementById('countdown');
let scoreDisplay = document.getElementById('score');

// Função para desenhar a cobrinha
function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'green' : 'blue';
        ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
    });
}

// Função para desenhar a comida
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
}

// Função para mover a cobrinha
function moveSnake() {
    let head = { ...snake[0] };
    if (direction === 'UP') head.y -= 1;
    if (direction === 'DOWN') head.y += 1;
    if (direction === 'LEFT') head.x -= 1;
    if (direction === 'RIGHT') head.x += 1;

    snake.unshift(head);

    // Verificar se comeu a comida
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = 'Pontos: ' + score;
        spawnFood();
    } else {
        snake.pop();
    }

    // Verificar colisão com as bordas ou com o próprio corpo
    if (head.x < 0 || head.x >= canvas.width / 20 || head.y < 0 || head.y >= canvas.height / 20 || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
    }
}

// Função para criar a comida em uma posição aleatória
function spawnFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / 20)),
        y: Math.floor(Math.random() * (canvas.height / 20))
    };
}

// Função de game over
function gameOver() {
    clearInterval(gameInterval);
    alert('Game Over! Pontos: ' + score);
}

// Função para iniciar o jogo
function startGame() {
    countdownDisplay.textContent = countdownTime;
    countdownInterval = setInterval(() => {
        countdownTime--;
        countdownDisplay.textContent = countdownTime;
        if (countdownTime <= 0) {
            clearInterval(countdownInterval);
            countdownDisplay.textContent = '';
            gameInterval = setInterval(() => {
                moveSnake();
                drawSnake();
                drawFood();
            }, 100);
        }
    }, 1000);
}

// Função para reiniciar o jogo
function restartGame() {
    snake = [{ x: 10, y: 10 }];
    direction = 'RIGHT';
    score = 0;
    scoreDisplay.textContent = 'Pontos: ' + score;
    clearInterval(gameInterval);
    startGame();
}

// Função para mudar a direção da cobrinha
function changeDirection(event) {
    if (event.key === 'w' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 's' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'a' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'd' && direction !== 'LEFT') direction = 'RIGHT';
}

document.addEventListener('keydown', changeDirection);

// Função para mostrar ranking
function showRanking() {
    alert('Ranking em breve!');
}

// Botões
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
rankingButton.addEventListener('click', showRanking);
