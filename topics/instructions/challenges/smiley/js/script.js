/**
 * Smiley Challenge by Simon M.
 */

"use strict";

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(500, 500);
    angleMode(DEGREES);
}


/**
 * Displays a Smiley on a yellow Background
*/
function draw() {
    // Yellow background
    background('yellow');

    // Draw the Smiley
    drawSmiley();
}

function drawSmiley() {
    drawHead();
    drawMouth();
    drawEyes();
}

/**
 * Draws the head of the Smiley
 */
function drawHead() {
    push();
    stroke('black');
    strokeWeight(15);
    fill(0,0,0,0);
    ellipse(250, 250, 400);
    pop();
}

/**
 * Draws the Mouth of the Smiley
 */
function drawMouth() {
    push();
    fill(0,0,0,0);
    stroke(0);
    strokeWeight(15);
    arc(250, 250, 300, 300, 0, 180);
    pop();
}

/**
 * Draws the Eyes of the Smiley
 */
function drawEyes(){
push();
noStroke(0);
fill(0);
ellipse(165, 190, 50, 100);
ellipse(335, 190, 50, 100);
pop();
}
