/**
 * Introducing Variables
 * Simon Medalssy
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

const { Back } = require("gsap");
const { IoEllipse } = require("react-icons/io5");

/**
 * Creates a canvas
*/
function setup() {
    createCanvas(640, 480);
}


/**
 * Draws a circle
*/
function draw() {
    background(0);

    push();
    fill(mouseX,mouseX,mouseY);
    noStroke();
    ellipse(width/2, height/2, 100, 100);
}