let maze;
let player;
let cellSize;
let finishLine;
let directions = { up: false, down: false, left: false, right: false };
let level = 1;
let highScore = 0;
let skipButton;

function setup() {
  createCanvas(600, 600);
  cellSize = 30;
  generateNewLevel();
  textSize(16);
  textAlign(RIGHT, TOP);

  //skip button
  skipButton = createButton('Skip Level');
  skipButton.position(width - 100, 10);
  skipButton.mousePressed(skipLevel);
}

function draw() {
  background(220);
  
  // Draw maze
  drawMaze();
  
  // Draw player
  fill(0, 255, 0);
  noStroke();
  rect(player.x * cellSize, player.y * cellSize, cellSize, cellSize);
  
  // Draw finish line
  fill(255, 0, 0);
  noStroke();
  rect(finishLine.x * cellSize, finishLine.y * cellSize, cellSize, cellSize);

  // Draw Level and High Score
  fill(0);
  text(`Level: ${level}`, width - 10, 10);
  text(`High Score: ${highScore}`, width - 10, 30);

  // Check for win
  if (player.x === finishLine.x && player.y === finishLine.y) {
    // Update high score
    highScore = max(highScore, level);

    // Go to next level
    level++;
    generateNewLevel();
  } else {
    // Move player continuously in the direction until collision w/ wall
    movePlayer();
  }
}

// Generate a new maze
function generateNewLevel() {
  maze = createMaze(floor(width / cellSize), floor(height / cellSize));
  player = createVector(1, 1); // Starting position
  finishLine = createVector(maze[0].length - 2, maze.length - 2); // Finish line at bottom-right corner
  
  // Ensure start and finish are open
  maze[1][1] = 0;
  maze[maze.length - 2][maze[0].length - 2] = 0;

  // valid path from start to finish
  if (!isMazeSolvable()) {
    generateNewLevel(); // Retry if maze is unsolvable
  }
}

// Create a random maze and ensure it's solvable
function createMaze(rows, cols) {
  let maze = [];
  for (let i = 0; i < rows; i++) {
    maze[i] = [];
    for (let j = 0; j < cols; j++) {
      if (i == 0 || j == 0 || i == rows - 1 || j == cols - 1) {
        maze[i][j] = 1; // Walls on the edges
      } else {
        maze[i][j] = random(1) < 0.2 ? 1 : 0; // Random walls inside
      }
    }
  }
  return maze;
}

// Check if there is a valid path from the start to the finish
function isMazeSolvable() {
  let queue = [createVector(1, 1)]; // Start at the top-left corner
  let visited = Array.from({ length: maze.length }, () => Array(maze[0].length).fill(false));
  visited[1][1] = true;

  let directions = [
    createVector(0, -1), // up
    createVector(1, 0),  // right
    createVector(0, 1),  // down
    createVector(-1, 0)  // left
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
        fill(0);
      } else {
        fill(255);
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
  }
  if (directions.right) {
    while (canMoveTo(player.x + 1, player.y)) {
      player.x++;
    }
  }
  if (directions.up) {
    while (canMoveTo(player.x, player.y - 1)) {
      player.y--;
    }
  }
  if (directions.down) {
    while (canMoveTo(player.x, player.y + 1)) {
      player.y++;
    }
  }
}

// Check if the player can move to the specified cell
function canMoveTo(x, y) {
  return maze[y] && maze[y][x] === 0; 
}

// Key pressed handlers to set movement direction
function keyPressed() {
  if (key === 'W' || key === 'w') {
    directions.up = true;
  }
  if (key === 'A' || key === 'a') {
    directions.left = true;
  }
  if (key === 'S' || key === 's') {
    directions.down = true;
  }
  if (key === 'D' || key === 'd') {
    directions.right = true;
  }
}

// Key released handlers to stop movement in the direction
function keyReleased() {
  if (key === 'W' || key === 'w') {
    directions.up = false;
  }
  if (key === 'A' || key === 'a') {
    directions.left = false;
  }
  if (key === 'S' || key === 's') {
    directions.down = false;
  }
  if (key === 'D' || key === 'd') {
    directions.right = false;
  }
}

// Skip level button
function skipLevel() {
  // Skip to the next level
  level++;
  generateNewLevel();
}