/**
 * Retro Racing
 * Simon Medalssy
 * 
 * A top down view driving game.
 * Drive the car to the other end of the track. Careful not to hit the walls or you'll die!!!
 * 
 * Instructions:
 * - navigate the car with your WASD keys
 * - DON'T HIT THE WALLS OR ITS GAME OVER
 * - Get to the other end of the track
 * - Try again on a new track
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// The car
const car = {

};


/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly();
}

function draw() {
    background("#87ceeb");
    moveFly();
    drawFly();
    moveCar();
    moveTongue();
    drawCar();
    checkTongueFlyOverlap();
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveCar() {
    car.body.x = mouseX;
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawCar() {
}
