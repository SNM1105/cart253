/**
 * Italian Flag Challenge by Simon M.
 */

"use strict";

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(500, 500);
}


/**
 * Displays blue background for flag
*/
function draw() {
    // Blue background
    background('rgb(70, 120, 180)');

    // Draw the Flag
    drawFlag();
}

function drawFlag() {
    drawGreen();
    drawWhite();
    drawRed();
}

/**
 * Draws the Green part of the flag
 */
function drawGreen() {
    push();
    noStroke();
    fill('green');
    rect(100, 150, 100, 200);
    pop();
}

/**
 * Draws the WHire part of the flag
 */
function drawWhite() {
    push();
    noStroke();
    fill('white');
    rect(200, 150, 100, 200);
    pop();
}

/**
 * Draws the Red part of the flag
 */
function drawRed(){
push();
noStroke();
fill('red');
rect(300, 150, 100, 200);
pop();
}