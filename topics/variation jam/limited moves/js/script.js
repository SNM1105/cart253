let maze;
let player;
let playerPosition;
let cellSize;
let finishLine;
let directions = { up: false, down: false, left: false, right: false };
let level = 1;
let highScore = 0;
let skipButton, restartButton;
let movesLimit = 20;
let movesLeft = movesLimit;
let showInstructions = true;

function setup() {
  createCanvas(600, 600);
  cellSize = 30;
  movesLeft = movesLimit;
  generateNewLevel();
  textSize(16);
  textAlign(RIGHT, TOP);

  skipButton = createButton('Skip Level');
  skipButton.mousePressed(skipLevel);
  skipButton.style('background-color', '#008000');
  skipButton.style('color', 'black');

  restartButton = createButton('Restart Level');
  restartButton.mousePressed(restartLevel);
  restartButton.style('background-color', '#008000');
  restartButton.style('color', 'black');

  positionButtons();

  playerPosition = createVector(player.x * cellSize, player.y * cellSize);
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
  text("Welcome to the Cyber Maze: Limited!", width / 2, height / 4);
  textSize(16);
  text("Use W, A, S, D keys to move.", width / 2, height / 4 + 60);
  text("You are the bright green square.", width / 2, height / 4 + 100);
  text("Reach the bright blue square in under 20 moves to complete the level!", width / 2, height / 4 + 140);
  fill(255, 0, 0);
  text("WARNING: Not every map is solvable.", width / 2, height / 4 + 190);
  text("Please skip if you can't solve it!", width / 2, height / 4 + 210);
  fill(0, 255, 0);
  textSize(18);
  text("Press ENTER to start!", width / 2, height / 4 + 280);
}

function drawGame() {
  background(0);

  playerPosition.x = lerp(playerPosition.x, player.x * cellSize, 0.3);
  playerPosition.y = lerp(playerPosition.y, player.y * cellSize, 0.3);

  drawMaze();

  fill(0, 255, 0);
  noStroke();
  rect(playerPosition.x, playerPosition.y, cellSize, cellSize);

  fill(0, 174, 255);
  noStroke();
  rect(finishLine.x * cellSize, finishLine.y * cellSize, cellSize, cellSize);

  textSize(14);
  fill(0, 200, 0, 150);
  rect(width - 140, 5, 135, 60, 5);
  fill(0);
  textAlign(RIGHT, TOP);
  text(`Level: ${level}`, width - 20, 10);
  text(`High Score: ${highScore}`, width - 20, 25);
  text(`Moves Left: ${movesLeft}`, width - 20, 40);

  if (player.x === finishLine.x && player.y === finishLine.y) {
    highScore = max(highScore, level);
    level++;
    movesLeft = movesLimit;
    generateNewLevel();
  } else if (movesLeft <= 0) {
    textSize(24);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0);
    text("Game Over!", width / 2, height / 2);
    noLoop();
  } else {
    movePlayer();
  }
}

function keyPressed() {
  if (showInstructions) {
    if (keyCode === ENTER) {
      showInstructions = false;
    }
    return;
  }

  if (movesLeft > 0) {
    if (key === 'W' || key === 'w') directions.up = true;
    if (key === 'A' || key === 'a') directions.left = true;
    if (key === 'S' || key === 's') directions.down = true;
    if (key === 'D' || key === 'd') directions.right = true;
    movesLeft--;
  }
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

function generateNewLevel() {
  maze = createMaze(floor(width / cellSize), floor(height / cellSize));
  player = createVector(1, 1);
  finishLine = createVector(maze[0].length - 2, maze.length - 2);

  maze[1][1] = 0;
  maze[maze.length - 2][maze[0].length - 2] = 0;

  if (!isMazeSolvable()) {
    generateNewLevel();
  }

  playerPosition = createVector(player.x * cellSize, player.y * cellSize);
}

function restartLevel() {
  player = createVector(1, 1);
  playerPosition = createVector(player.x * cellSize, player.y * cellSize);
  movesLeft = movesLimit;
  loop();
}

function skipLevel() {
  level++;
  movesLeft = movesLimit;
  generateNewLevel();
  positionButtons();
  loop();
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

    if (current.x === maze[0].length - 2 && current.y === maze.length - 2) {
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
  if (directions.left) {
    while (canMoveTo(player.x - 1, player.y)) {
      player.x--;
    }
    directions.left = false;
  }
  if (directions.right) {
    while (canMoveTo(player.x + 1, player.y)) {
      player.x++;
    }
    directions.right = false;
  }
  if (directions.up) {
    while (canMoveTo(player.x, player.y - 1)) {
      player.y--;
    }
    directions.up = false;
  }
  if (directions.down) {
    while (canMoveTo(player.x, player.y + 1)) {
      player.y++;
    }
    directions.down = false;
  }
}

function canMoveTo(x, y) {
  return maze[y] && maze[y][x] !== 1;
}
