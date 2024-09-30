/**
 * Circle Master
 * Pippin Barr
 *
 * This will be a program in which the user can move a circle
 * on the canvas using their own circle to "lead" it around.
 */

const puck = {
  x: 350,
  y: 350,
  size: 100,
  fill: "#292929"
};

const user = {
  x: undefined, // will be mouseX
  y: undefined, // will be mouseY
  size: 75,
  fill: "#000000"
};

const target = {
    x: 30,
    y: 30,
    size: 150,
    fill: "#aaaaaa",
    fills: {
        overlap: "#00ff00"
    } 
};


/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Move the user circle, check for overlap, draw the two circles
 */
function draw() {
  background("#00eeff");
  
  // Move user circle
  moveUser();
  
  // Draw the user and puck
  drawUser();
  // Check for overlap
  drawTarget();
  drawPuck();
  movePuck();
  checkPuck();
}

/**
 * Sets the user position to the mouse position
 */
function moveUser() {
  user.x = mouseX;
  user.y = mouseY;
}

/**
 * Displays the user circle
 */
function drawUser() {
  push();
  noStroke();
  fill(user.fill);
  ellipse(user.x, user.y, user.size);
  pop();
}

/**
 * Displays the puck circle
 */
function drawPuck() {
  push();
  noStroke();
  fill(puck.fill);
  ellipse(puck.x, puck.y, puck.size);
  pop();
}

//Displays the target
function drawTarget () {
    push();
    noStroke();
    fill(target.fill);
    ellipse(target.x, target.y, target.size);
    pop();
}

function movePuck () {
    //Calculate the distance between the user the the puck
    const d = dist(user.x, user.y, puck.x, puck.y);
    //Check if the distance is smaller than their two radii,
    //Because if it is, they are overlapping!
    const overlap = (d < user.size/2 + puck.size/2);
    //Moves the target by 1 pixel while the circles overlap
    if (overlap) {
        puck.x -= 1;
        puck.y -= 1;
    }
}

function checkPuck () {
    //Calclate the distance between the puck and the target
    const d = dist(puck.x, puck.y, target.x, target.y);
    //Check if overlapping
    const overlap = (d < puck.size/2 + target.size/2);
    //Make the target change colour if they overlap
    if (overlap) {
        target.fill = target.fills.overlap
    }
}