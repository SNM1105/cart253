/**
 * Pyramid Challenge by Simon M.
 */

"use strict";

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(600, 600);
}


/**
 * Displays blue background for flag
*/
function draw() {
    // Blue background
    background('rgb(70, 120, 180)');

    // Draw the Sand
    drawSand();

    // Draw the Pyramid
    drawPyramid();
}

function drawPyramid() {
    drawWalls();
}

function drawSand() {
    drawDune();
    drawDune();
}

function drawWalls() {
    push();
    noStroke();
    fill('rgb(200, 150, 50)');
    triangle(160, 410, 290, 255, 300, 470);
    noStroke();
    fill('rgb(250, 200, 100)');
    triangle(300, 470, 290, 255, 420, 410);
    pop();
}

/**
 * Draws a big yellow circle for the sand
 */
function drawDune() {
    push();
    noStroke();
    fill('yellow');
    ellipse(0, 750, 1000, 1000);
    noStroke();
    fill('yellow');
    ellipse(400, 850, 1000, 1000);
    pop();
}