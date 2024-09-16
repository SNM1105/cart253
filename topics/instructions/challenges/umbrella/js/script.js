/**
 * Umbrella Challenge by Simon M.
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
 * Displays a blue umbrella with a black stick and gold handle on a red background
*/
function draw() {
    // red background
    background('red');

    // Draw the umbrella
    drawUmbrella();
}

function drawUmbrella() {
    drawShade();
    drawCutout();
    drawStick();
    drawHandle();
}

    //Draws the blue shade of the umbrella
function drawShade() {
    push();
    noStroke();
    fill('blue');
    arc(250, 225, 400, 350, 180, 0);
    pop();
}

    //draws the red circled over the shade
function drawCutout() {
    push();
    noStroke();
    fill('red');
    ellipse(117.5, 225, 133.3);
    ellipse(250, 225, 133.3);
    ellipse(382.5, 225, 133.3);
    pop();
}

/**
 * Draws the stick of the umbrella
 */
function drawStick() {
    push();
    stroke(0);
    strokeWeight(20);
    line(250, 165, 250, 375);
    pop();
}

/**
 * Draws the Handle of the umbrella
 */
function drawHandle(){
push();
stroke('gold');
strokeWeight(20);
fill(0,0,0,0);
arc(280, 375, 60, 80, 0, 180);
pop();
}