const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ballRadius = 20;
let ballX = canvas.width / 2;
let ballY = canvas.height - ballRadius - 20;
let ballSpeedX = 5;
let ballSpeedY = -5;
let gravity = 0.1;

let platformWidth = canvas.width * 2;
let platformHeight = 40;
let platformY = canvas.height - platformHeight;

let gameOver = false;

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#ff0';
    ctx.fill();
    ctx.closePath();
}

function drawPlatform() {
    ctx.beginPath();
    ctx.rect(0, platformY, platformWidth, platformHeight);
    ctx.fillStyle = '#f00';
    ctx.fill();
    ctx.closePath();
}

function moveBall() {
    if (!gameOver) {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        ballSpeedY += gravity;

        if (ballY + ballRadius > platformY && ballX > 0 && ballX < canvas.width) {
            ballSpeedY = -5;  // Bounce back
        }

        if (ballY + ballRadius > canvas.height) {
            gameOver = true;
            alert("Game Over!");
        }

        if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
            ballSpeedX = -ballSpeedX;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPlatform();
    moveBall();
    
    if (!gameOver) {
        requestAnimationFrame(draw);
    }
}

function handleKeyPress(e) {
    if (e.key === 'ArrowLeft') {
        ballSpeedX = -5;
    } else if (e.key === 'ArrowRight') {
        ballSpeedX = 5;
    }
}

document.addEventListener('keydown', handleKeyPress);

draw();
