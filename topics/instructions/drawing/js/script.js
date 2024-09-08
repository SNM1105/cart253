/**
 * Cool record
 * Simon Medalssy
 * 
 * Displays cool record
 */

"use strict";

/**
 * Creates square canvas
*/
function setup() {
    createCanvas(640, 640);
}


/**
 * Displays the record
*/
function draw() {
    background(150);

    //Main part of record
    push();
    fill(255, 0, 0);
    stroke(255);
    ellipse(320, 320, 480, 480);
    pop();

    //Label on record
    push();
    fill('white');
    noStroke();
    ellipse(320,320,140);
    pop();

    //Hole on record
    push();
    fill('#000000');
    noStroke();
    ellipse(320,320,20)
    pop();
}