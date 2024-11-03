/**
 * Bouncy Ball Ball Bonanza
 * Pippin Barr
 * 
 * The starting point for a ball-bouncing experience of
 * epic proportions!
 */

"use strict";

// Our ball
const ball = {
    x: 300,
    y: 20,
    width: 10,
    height: 10,
    velocity: {
        x: 0,
        y: 10
    }
};

// Our paddle
const paddle = {
    x: 300,
    y: 280,
    width: 80,
    height: 10
};

/**
 * Create the canvas
*/
function setup() {
    createCanvas(600, 300);
}


/**
 * Move and display the ball and paddle
*/
function draw() {
    background("#87ceeb");

    movePaddle(paddle);
    moveBall(ball);

    handleBounce(ball, paddle);

    drawBlock(paddle);
    drawBlock(ball);
}

/**
 * Moves the paddle
 */
function movePaddle(paddle) {
    paddle.x = mouseX;
}

const gravity = 0.9

/**
 * Moves the ball
 */
function moveBall(ball) {
    ball.velocity.y += gravity;

    ball.x += ball.velocity.x;
    ball.y += ball.velocity.y;
}

function handleBounce(ball, paddle) {
    if (
        ball.y + ball.height / 2 >= paddle.y - paddle.height / 2 && // Ball is at or below the top of the paddle
        ball.y - ball.height / 2 <= paddle.y + paddle.height / 2 && // Ball is at or above the bottom of the paddle
        ball.x + ball.width / 2 >= paddle.x - paddle.width / 2 &&   // Ball is at or to the right of the left edge of the paddle
        ball.x - ball.width / 2 <= paddle.x + paddle.width / 2      // Ball is at or to the left of the right edge of the paddle
    ) {
        // Reverse the y-velocity of the ball
        ball.velocity.y *= -1;
    }
}

// draws the block and paddle
function drawBlock (block) {
    push();
    rectMode(CENTER);
    noStroke();
    fill("pink");
    rect(block.x, block.y, block.width, block.height);
    pop();
}
