let maze;
let player;
let playerPosition;
let cellSize;
let finishLine;
let coins = [];
let originalCoins = []; // New variable to store the original coin positions
let collectedCoins = 0;
let requiredCoins = 3;
let directions = { up: false, down: false, left: false, right: false };
let level = 1;
let highScore = 0;
let skipButton, restartButton;
let showInstructions = true;

// Timer-related variables
let startTime;
let timeLimit = 10; // 15 seconds
let gameOver = false;

// Movement speed control
let moveDelay = 150; // Milliseconds between moves
let lastMoveTime = 0;

function setup() {
  createCanvas(600, 600);
  cellSize = 30;
  
  skipButton = createButton('Skip Level');
  skipButton.mousePressed(skipLevel);
  skipButton.style('background-color', '#008000');
  skipButton.style('color', 'black');

  restartButton = createButton('Restart Level');
  restartButton.mousePressed(restartLevel);
  restartButton.style('background-color', '#008000');
  restartButton.style('color', 'black');

  positionButtons();

  generateNewLevel();
  textSize(16);
  textAlign(RIGHT, TOP);
}

function draw() {
  if (showInstructions) {
    displayInstructions();
  } else {
    drawGame();
  }
}

function displayInstructions() {
  background(0);
  textSize(20);
  fill(0, 255, 0);
  textAlign(CENTER, CENTER);
  text("Welcome to the Cyber Maze: Node Run!", width / 2, height / 4);
  textSize(16);
  text("Use W, A, S, D keys to move.", width / 2, height / 4 + 60);
  text("You are the bright green square.", width / 2, height / 4 + 100);
  text("Press all the yellow nodes to unlock the blue finish.", width / 2, height / 4 + 140);
  text(`You have ${timeLimit} seconds to complete each level!`, width / 2, height / 4 + 170);
  fill(255, 0, 0);
  text("WARNING: Not every map is solvable.", width / 2, height / 4 + 220);
  text("Please skip if you can't solve it!", width / 2, height / 4 + 240);
  fill(0, 255, 0);
  textSize(18);
  text("Press ENTER to start!", width / 2, height / 4 + 310);
}

function drawGame() {
  background(0);

  // Smooth player movement
  playerPosition.x = lerp(playerPosition.x, player.x * cellSize, 0.3);
  playerPosition.y = lerp(playerPosition.y, player.y * cellSize, 0.3);

  drawMaze();
  drawCoins();

  // Draw player
  fill(0, 255, 0);
  noStroke();
  rect(playerPosition.x, playerPosition.y, cellSize, cellSize);

  // Draw finish line (only if all coins are collected)
  if (collectedCoins >= requiredCoins) {
    fill(0, 174, 255);
    noStroke();
    rect(finishLine.x * cellSize, finishLine.y * cellSize, cellSize, cellSize);
  }

  // Draw UI
  textSize(14);
  fill(0, 200, 0, 150);
  rect(width - 140, 5, 135, 70, 5);
  fill(0);
  textAlign(RIGHT, TOP);
  text(`Level: ${level}`, width - 20, 10);
  text(`Coins: ${collectedCoins}/${requiredCoins}`, width - 20, 25);

  // Draw timer
  let timeRemaining = timeLimit - floor((millis() - startTime) / 1000);
  text(`Time: ${max(0, timeRemaining)}`, width - 20, 40);

  // Game over condition
  if (timeRemaining <= 0 && !gameOver) {
    gameOver = true;
    noLoop();
    displayGameOver();
  }

  // Check for level completion
  if (collectedCoins >= requiredCoins && 
      player.x === finishLine.x && player.y === finishLine.y) {
    highScore = max(highScore, level);
    level++;
    generateNewLevel();
  } else if (!gameOver) {
    movePlayer();
    checkCoinCollection();
  }
}

function displayGameOver() {
  fill(255, 0, 0);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("Time's Up!", width / 2, height / 2 - 50);
  textSize(20);
  text("Game Over", width / 2, height / 2 + 20);
}

function generateNewLevel() {
  maze = createMaze(floor(width / cellSize), floor(height / cellSize));
  player = createVector(1, 1);
  finishLine = createVector(maze[0].length - 2, maze.length - 2);
  collectedCoins = 0;
  gameOver = false;

  // Reset start time for the new level
  startTime = millis();

  // Ensure start and end are clear
  maze[1][1] = 0;
  maze[maze.length - 2][maze[0].length - 2] = 0;

  // Generate coins
  coins = [];
  originalCoins = []; // Clear original coins array
  for (let i = 0; i < requiredCoins; i++) {
    let coinPos;
    do {
      coinPos = createVector(
        floor(random(1, maze[0].length - 1)), 
        floor(random(1, maze.length - 1))
      );
    } while (
      maze[coinPos.y][coinPos.x] === 1 || 
      (coinPos.x === player.x && coinPos.y === player.y) ||
      (coinPos.x === finishLine.x && coinPos.y === finishLine.y) ||
      coins.some(c => c.x === coinPos.x && c.y === coinPos.y)
    );
    coins.push(coinPos);
    originalCoins.push(createVector(coinPos.x, coinPos.y)); // Store original coin position
  }

  if (!isMazeSolvable()) {
    generateNewLevel();
  }

  playerPosition = createVector(player.x * cellSize, player.y * cellSize);
  loop();
}

function restartLevel() {
  player = createVector(1, 1);
  playerPosition = createVector(player.x * cellSize, player.y * cellSize);
  
  // Reset coins to their original positions
  coins = originalCoins.map(coin => createVector(coin.x, coin.y));
  collectedCoins = 0;
  
  startTime = millis();
  gameOver = false;
  loop();
}

function skipLevel() {
  level++;
  generateNewLevel();
  positionButtons();
  loop();
}

function keyPressed() {
  if (showInstructions) {
    if (keyCode === ENTER) {
      showInstructions = false;
      startTime = millis(); // Start the timer when instructions are dismissed
    }
    return;
  }

  if (gameOver) {
    return; // Prevent movement when game is over
  }

  if (key === 'W' || key === 'w') directions.up = true;
  if (key === 'A' || key === 'a') directions.left = true;
  if (key === 'S' || key === 's') directions.down = true;
  if (key === 'D' || key === 'd') directions.right = true;
}

function keyReleased() {
  if (key === 'W' || key === 'w') directions.up = false;
  if (key === 'A' || key === 'a') directions.left = false;
  if (key === 'S' || key === 's') directions.down = false;
  if (key === 'D' || key === 'd') directions.right = false;
}

function positionButtons() {
  if (skipButton && restartButton) {
    skipButton.position(width - 220, 10);
    restartButton.position(width - 110, 10);
  }
}

function windowResized() {
  resizeCanvas(600, 600);
  positionButtons();
}

function drawCoins() {
  fill(255, 255, 0);  // Yellow color for coins
  for (let coin of coins) {
    rect(coin.x * cellSize, coin.y * cellSize, cellSize, cellSize);
  }
}

function checkCoinCollection() {
  for (let i = coins.length - 1; i >= 0; i--) {
    if (player.x === coins[i].x && player.y === coins[i].y) {
      coins.splice(i, 1);
      collectedCoins++;
    }
  }
}

function createMaze(rows, cols) {
  let maze = [];
  for (let i = 0; i < rows; i++) {
    maze[i] = [];
    for (let j = 0; j < cols; j++) {
      if (i == 0 || j == 0 || i == rows - 1 || j == cols - 1) {
        maze[i][j] = 1;
      } else {
        maze[i][j] = random(1) < 0.2 ? 1 : 0;
      }
    }
  }
  return maze;
}

function isMazeSolvable() {
  let queue = [createVector(1, 1)];
  let visited = Array.from({ length: maze.length }, () => Array(maze[0].length).fill(false));
  visited[1][1] = true;

  let directions = [
    createVector(0, -1),
    createVector(1, 0),
    createVector(0, 1),
    createVector(-1, 0)
  ];

  while (queue.length > 0) {
    let current = queue.shift();

    // Check if player can reach each coin
    let coinsReached = 0;
    for (let coin of coins) {
      if (findPath(current, coin)) {
        coinsReached++;
      }
    }

    // Check if coins and finish line are reachable
    if (coinsReached === coins.length && findPath(current, finishLine)) {
      return true;
    }

    for (let dir of directions) {
      let next = createVector(current.x + dir.x, current.y + dir.y);

      if (next.x > 0 && next.y > 0 && next.x < maze[0].length - 1 && next.y < maze.length - 1 && !visited[next.y][next.x] && maze[next.y][next.x] === 0) {
        visited[next.y][next.x] = true;
        queue.push(next);
      }
    }
  }

  return false;
}

function findPath(start, end) {
  let queue = [start];
  let visited = Array.from({ length: maze.length }, () => Array(maze[0].length).fill(false));
  visited[start.y][start.x] = true;

  let directions = [
    createVector(0, -1),
    createVector(1, 0),
    createVector(0, 1),
    createVector(-1, 0)
  ];

  while (queue.length > 0) {
    let current = queue.shift();

    if (current.x === end.x && current.y === end.y) {
      return true;
    }

    for (let dir of directions) {
      let next = createVector(current.x + dir.x, current.y + dir.y);

      if (next.x > 0 && next.y > 0 && next.x < maze[0].length - 1 && next.y < maze.length - 1 && !visited[next.y][next.x] && maze[next.y][next.x] === 0) {
        visited[next.y][next.x] = true;
        queue.push(next);
      }
    }
  }

  return false;
}

function drawMaze() {
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      if (maze[i][j] === 1) {
        fill(0, 110, 0);
      } else {
        fill(0);
      }
      noStroke();
      rect(j * cellSize, i * cellSize, cellSize, cellSize);
    }
  }
}

function movePlayer() {
  // Add a delay between moves to slow down player speed
  if (millis() - lastMoveTime < moveDelay) {
    return;
  }

  let moved = false;
  if (directions.left && canMoveTo(player.x - 1, player.y)) {
    player.x--;
    moved = true;
  }
  if (directions.right && canMoveTo(player.x + 1, player.y)) {
    player.x++;
    moved = true;
  }
  if (directions.up && canMoveTo(player.x, player.y - 1)) {
    player.y--;
    moved = true;
  }
  if (directions.down && canMoveTo(player.x, player.y + 1)) {
    player.y++;
    moved = true;
  }

  // Update last move time if player moved
  if (moved) {
    lastMoveTime = millis();
  }
}

function canMoveTo(x, y) {
  return maze[y] && maze[y][x] !== 1;
}