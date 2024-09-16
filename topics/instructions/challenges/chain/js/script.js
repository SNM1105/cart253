/**
 * Chain Challenge by Simon M.
 */
"use strict";

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(500, 500);
}


/**
 * Displays a chain on a yellow background
*/
function draw() {
    // Yellow background
    background('yellow');

    // Draw the chain
    drawChain();
}

function drawChain() {
    drawLinks();
}

/**
 * Draws the links of the chain
 */
function drawLinks() {
    push();
    stroke('black');
    strokeWeight(30);
    fill(0,0,0,0.0);
    ellipse(250, 0, 150, 200);
    ellipse(250, 125, 150, 200);
    ellipse(250, 250, 150, 200);
    ellipse(250, 375, 150, 200);
    ellipse(250, 500, 150, 200);
    pop();
}
