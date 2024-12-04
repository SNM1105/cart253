// Global variables for game state tracking
let maze;
let player;
let playerPosition;
let cellSize;
let finishLine;
let directions = { up: false, down: false, left: false, right: false };
let level = 1;
let highScore = 0;
let skipButton, restartButton;
let timeLimit = 15; // 15 seconds per level
let startTime;
let showInstructions = true;

// Key game initialization: sets up canvas, buttons, and first level
function setup() {
  createCanvas(600, 600);
  cellSize = 30;
  generateNewLevel();
  textSize(16);
  textAlign(RIGHT, TOP);

  // Create control buttons for game navigation
  skipButton = createButton('Skip Level');
  skipButton.mousePressed(skipLevel);
  skipButton.style('background-color', '#008000');
  skipButton.style('color', 'black');

  restartButton = createButton('Restart Level');
  restartButton.mousePressed(restartLevel);
  restartButton.style('background-color', '#008000');
  restartButton.style('color', 'black');

  positionButtons();

  // Initialize player position
  playerPosition = createVector(player.x * cellSize, player.y * cellSize);
}

function draw() {
  // Display instructions or game based on game state
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
  // Game title and detailed instructions
  text("Welcome to the Cyber Maze: Time Crunch!", width / 2, height / 4);
  textSize(16);
  text("Use W, A, S, D keys to move.", width / 2, height / 4 + 60);
  text("You are the bright green square.", width / 2, height / 4 + 100);
  text("Reach the bright blue square in under 15 seconds to complete the level!", width / 2, height / 4 + 140);
  fill(255, 0, 0);
  text("WARNING: Not every map is solvable.", width / 2, height / 4 + 190);
  text("Please skip if you can't solve it!", width / 2, height / 4 + 210);
  fill(0, 255, 0);
  textSize(18);
  text("Press ENTER to start!", width / 2, height / 4 + 280);
}

function drawGame() {
  background(0);

  // Smooth player movement animation
  playerPosition.x = lerp(playerPosition.x, player.x * cellSize, 0.3);
  playerPosition.y = lerp(playerPosition.y, player.y * cellSize, 0.3);

  drawMaze();

  // Draw player
  fill(0, 255, 0);
  noStroke();
  rect(playerPosition.x, playerPosition.y, cellSize, cellSize);

  // Draw finish line
  fill(0, 174, 255);
  noStroke();
  rect(finishLine.x * cellSize, finishLine.y * cellSize, cellSize, cellSize);

  // Calculate remaining time
  let timeRemaining = max(0, timeLimit - (millis() - startTime) / 1000);

  // Display game info
  textSize(14);
  fill(0, 200, 0, 150);
  rect(width - 140, 5, 135, 60, 5);
  fill(0);
  textAlign(RIGHT, TOP);
  text(`Level: ${level}`, width - 20, 10);
  text(`High Score: ${highScore}`, width - 20, 25);
  text(`Time: ${floor(timeRemaining)}s`, width - 20, 40);

  // Check win/lose conditions
  if (player.x === finishLine.x && player.y === finishLine.y) {
    // Level completed successfully
    highScore = max(highScore, level);
    level++;
    generateNewLevel();
  } else if (timeRemaining <= 0) {
    // Time's up - game over
    textSize(24);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0);
    text("Time's Up! Game Over", width / 2, height / 2);
    noLoop();
  } else {
    // Continue player movement
    movePlayer();
  }
}

function keyPressed() {
  // Handle instructions screen
  if (showInstructions) {
    if (keyCode === ENTER) {
      showInstructions = false;
      startTime = millis(); // Start the timer when game begins
    }
    return;
  }

  // Detect movement key presses
  if (key === 'W' || key === 'w') directions.up = true;
  if (key === 'A' || key === 'a') directions.left = true;
  if (key === 'S' || key === 's') directions.down = true;
  if (key === 'D' || key === 'd') directions.right = true;
}

function positionButtons() {
  // Position game control buttons at the top left of the canvas
  if (skipButton && restartButton) {
    // Use the canvas width to position buttons
    skipButton.position(10, 10);
    restartButton.position(120, 10);
  }
}

function windowResized() {
  // Resize canvas
  resizeCanvas(600, 600);
  
  // Reposition buttons
  positionButtons();
}

function generateNewLevel() {
  // Create a new random maze
  maze = createMaze(floor(width / cellSize), floor(height / cellSize));
  player = createVector(1, 1);
  finishLine = createVector(maze[0].length - 2, maze.length - 2);

  // Ensure start and end points are clear
  maze[1][1] = 0;
  maze[maze.length - 2][maze[0].length - 2] = 0;

  // Regenerate if maze is not solvable
  if (!isMazeSolvable()) {
    generateNewLevel();
  }

  // Reset player position
  playerPosition = createVector(player.x * cellSize, player.y * cellSize);
  startTime = millis(); // Reset start time for new level
}

function restartLevel() {
  // Reset player to starting position
  player = createVector(1, 1);
  playerPosition = createVector(player.x * cellSize, player.y * cellSize);
  startTime = millis(); // Reset start time
  loop();
}

function skipLevel() {
  // Move to next level
  level++;
  generateNewLevel();
  positionButtons();
  loop();
}

function createMaze(rows, cols) {
  // Generate a random maze grid
  let maze = [];
  for (let i = 0; i < rows; i++) {
    maze[i] = [];
    for (let j = 0; j < cols; j++) {
      // Create wall borders
      if (i == 0 || j == 0 || i == rows - 1 || j == cols - 1) {
        maze[i][j] = 1;
      } else {
        // Randomly place walls
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
    createVector(0, -1),  // Up
    createVector(1, 0),   // Right
    createVector(0, 1),   // Down
    createVector(-1, 0)   // Left
  ];

  while (queue.length > 0) {
    let current = queue.shift();

    // Check if reached finish line
    if (current.x === maze[0].length - 2 && current.y === maze.length - 2) {
      return true;
    }

    // Explore adjacent cells
    for (let dir of directions) {
      let next = createVector(current.x + dir.x, current.y + dir.y);

      // Check if next cell is valid and unvisited
      if (next.x > 0 && next.y > 0 && 
          next.x < maze[0].length - 1 && next.y < maze.length - 1 && 
          !visited[next.y][next.x] && maze[next.y][next.x] === 0) {
        visited[next.y][next.x] = true;
        queue.push(next);
      }
    }
  }

  return false;
}

function drawMaze() {
  // Render maze grid
  for (let i = 0; i < maze.length; i++) {
    for (let j = 0; j < maze[i].length; j++) {
      // Color walls and paths differently
      if (maze[i][j] === 1) {
        fill(0, 110, 0);  // Dark green for walls
      } else {
        fill(0);  // Black for paths
      }
      noStroke();
      rect(j * cellSize, i * cellSize, cellSize, cellSize);
    }
  }
}

function movePlayer() {
  // Handle player movement based on keyboard input
  if (directions.left) {
    // Move left as far as possible
    while (canMoveTo(player.x - 1, player.y)) {
      player.x--;
    }
    directions.left = false;
  }
  if (directions.right) {
    // Move right as far as possible
    while (canMoveTo(player.x + 1, player.y)) {
      player.x++;
    }
    directions.right = false;
  }
  if (directions.up) {
    // Move up as far as possible
    while (canMoveTo(player.x, player.y - 1)) {
      player.y--;
    }
    directions.up = false;
  }
  if (directions.down) {
    // Move down as far as possible
    while (canMoveTo(player.x, player.y + 1)) {
      player.y++;
    }
    directions.down = false;
  }
}

function canMoveTo(x, y) {
  // Check if the target cell is a valid move
  return maze[y] && maze[y][x] !== 1;
}