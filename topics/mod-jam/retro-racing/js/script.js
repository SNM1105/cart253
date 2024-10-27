document.addEventListener('DOMContentLoaded', () => {
    // Set up the canvas and context only after the DOM has loaded
    const canvas = document.createElement('canvas');
    canvas.width = 720;
    canvas.height = 480;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

// Game state
let gameState = {
    isGameOver: false,
    hasWon: false,
    level: 1,
    cameraX: 0,
    cameraY: 0,
    isMoving: false
};

// Car properties
const car = {
    x: 50,
    y: 50,
    width: 20,
    height: 10,
    maxVelocity: 1.5,
    currentVelocity: 0,
    direction: 0, // 0 = right, 1 = down, 2 = left, 3 = up
    moving: false
};

// Direction vectors for each direction
const directions = [
    { dx: 1, dy: 0, angle: 0 },          // Right
    { dx: 0, dy: 1, angle: Math.PI / 2 }, // Down
    { dx: -1, dy: 0, angle: Math.PI },    // Left
    { dx: 0, dy: -1, angle: -Math.PI / 2 } // Up
];


// Road properties
let roadSegments = [];
const roadWidth = 30;
const gridSize = 40;
const mazeWidth = 40;
const mazeHeight = 30;
let maze = [];
let finishLine = { x: 0, y: 0 };

function generateMaze() {
    maze = Array(mazeHeight).fill().map(() => Array(mazeWidth).fill(0));
    
    function carve(x, y) {
        maze[y][x] = 1;
        const directions = [[0, 2], [2, 0], [0, -2], [-2, 0]];
        shuffleArray(directions);
        
        for (let [dx, dy] of directions) {
            const newX = x + dx;
            const newY = y + dy;
            
            if (newX >= 0 && newX < mazeWidth && newY >= 0 && newY < mazeHeight 
                && maze[newY][newX] === 0) {
                maze[y + dy / 2][x + dx / 2] = 1;
                carve(newX, newY);
            }
        }
    }

    carve(1, 1);
    
    roadSegments = [];
    for (let y = 0; y < mazeHeight; y++) {
        for (let x = 0; x < mazeWidth; x++) {
            if (maze[y][x] === 1) {
                if (x < mazeWidth - 1 && maze[y][x + 1] === 1) {
                    roadSegments.push({
                        x1: x * gridSize,
                        y1: y * gridSize,
                        x2: (x + 1) * gridSize,
                        y2: y * gridSize
                    });
                }
                if (y < mazeHeight - 1 && maze[y + 1][x] === 1) {
                    roadSegments.push({
                        x1: x * gridSize,
                        y1: y * gridSize,
                        x2: x * gridSize,
                        y2: (y + 1) * gridSize
                    });
                }
            }
        }
    }

    for (let y = mazeHeight - 2; y < mazeHeight; y++) {
        for (let x = mazeWidth - 2; x < mazeWidth; x++) {
            if (maze[y][x] === 1) {
                finishLine = { x: x * gridSize, y: y * gridSize };
                return;
            }
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function drawCar() {
    ctx.save();
    ctx.translate(car.x - gameState.cameraX, car.y - gameState.cameraY);
    ctx.rotate(directions[car.direction].angle);

    // Car body
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.roundRect(-car.width / 2, -car.height / 2, car.width, car.height, 3);
    ctx.fill();

    // Windshield
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(car.width / 2 - 8, -car.height / 2 + 2, 4, car.height - 4);

    // Headlights
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(car.width / 2 - 2, -car.height / 2 + 2, 1.5, 0, Math.PI * 2);
    ctx.arc(car.width / 2 - 2, car.height / 2 - 2, 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function drawRoad() {
    ctx.save();
    ctx.translate(-gameState.cameraX, -gameState.cameraY);
    
    ctx.strokeStyle = '#666';
    ctx.lineWidth = roadWidth;
    ctx.lineCap = 'square';
    
    roadSegments.forEach(segment => {
        ctx.beginPath();
        ctx.moveTo(segment.x1, segment.y1);
        ctx.lineTo(segment.x2, segment.y2);
        ctx.stroke();
    });

    // Draw finish line
    ctx.fillStyle = 'black';
    for (let i = 0; i < 4; i++) {
        if (i % 2 === 0) {
            ctx.fillRect(finishLine.x - roadWidth / 4, 
                       finishLine.y - roadWidth / 2 + i * (roadWidth / 4), 
                       roadWidth / 2, roadWidth / 4);
        }
    }
    
    ctx.restore();
}

function isOffRoad() {
    let onRoad = false;
    const tolerance = roadWidth / 2;

    roadSegments.forEach(segment => {
        if (Math.abs(segment.y1 - car.y) < tolerance && 
            car.x >= Math.min(segment.x1, segment.x2) - tolerance && 
            car.x <= Math.max(segment.x1, segment.x2) + tolerance) {
            onRoad = true;
        }
        if (Math.abs(segment.x1 - car.x) < tolerance && 
            car.y >= Math.min(segment.y1, segment.y2) - tolerance && 
            car.y <= Math.max(segment.y1, segment.y2) + tolerance) {
            onRoad = true;
        }
    });
    return !onRoad;
}

function checkWin() {
    return Math.abs(car.x - finishLine.x) < roadWidth && 
           Math.abs(car.y - finishLine.y) < roadWidth;
}

function drawGameOver() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
    ctx.font = '24px Arial';
    ctx.fillText('Press Space to Retry', canvas.width / 2, canvas.height / 2 + 40);
}

function drawWin() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Level Complete!', canvas.width / 2, canvas.height / 2);
    ctx.font = '24px Arial';
    ctx.fillText('Press Space for Next Level', canvas.width / 2, canvas.height / 2 + 40);
}

// Game loop
function update() {
    if (!gameState.isGameOver && !gameState.hasWon) {
        if (keys.space) {
            gameState.isMoving = true;
        } else {
            gameState.isMoving = false;
        }

        if (gameState.isMoving) {
            car.currentVelocity = car.maxVelocity;
        } else {
            car.currentVelocity = 0;
        }

        car.x += directions[car.direction].dx * car.currentVelocity;
        car.y += directions[car.direction].dy * car.currentVelocity;
        
        gameState.cameraX = car.x - canvas.width / 2;
        gameState.cameraY = car.y - canvas.height / 2;

        if (isOffRoad()) {
            gameState.isGameOver = true;
        }

        if (checkWin()) {
            gameState.hasWon = true;
        }
    }
}

function draw() {
    ctx.fillStyle = '#90EE90';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawRoad();
    drawCar();

    if (gameState.isGameOver) {
        drawGameOver();
    } else if (gameState.hasWon) {
        drawWin();
    }
}

// Input handling
const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    space: false
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'w') keys.w = true;
    if (e.key === 'a') keys.a = true;
    if (e.key === 's') keys.s = true;
    if (e.key === 'd') keys.d = true;
    if (e.key === ' ') keys.space = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'w') keys.w = false;
    if (e.key === 'a') keys.a = false;
    if (e.key === 's') keys.s = false;
    if (e.key === 'd') keys.d = false;
    if (e.key === ' ') keys.space = false;
});

// Initialization
generateMaze();

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
});