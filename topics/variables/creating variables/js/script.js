/**
 * Creating Variables
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

let cheeseRed = 255;
let cheeseGreen = 255;
let cheeseBlue = 0;

let holeSize = 120;
let holeShade = 0;
let holeX = 140;
let holeY = 175;

const { Back } = require("gsap");

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(480,480)
}


/**
 * Draws a hole in a piece of cheese
*/
function draw() {
    // The cheese
    background(cheeseRed, cheeseGreen, cheeseBlue);

    //The hole
    push();
    noStroke();
    fill(0);
    ellipse(holeX, holeY, holeSize);
    pop();
}