/**
 * Keyboard Events
 * Simon Medalssy
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
const ball = {
    //position
    x:200,
    y:200,
    //size
    size:50,
    //fill
    fill:"#ffffff",
    //fills
    fills:{
        white:"#ffffff",
        red:"#ff0000",
        blue:"#0000ff"
    },
    //kets to control the color
    keys:{
        redKey:82,
        blueKey:66
    }
}

/**
 * creates canvas
*/
function setup() {
    createCanvas(400,400); 
}

/**
 * Draws the ball
 */
function draw() {
    background(0);
    //draw the ball
    push();
    noStroke();
    fill(ball.fill);
    ellipse(ball.x,ball.y,ball.size);
    pop();
}

function keyPressed() {
    if (event.keyCode === ball.keys.redKey) {
        ball.fill = ball.fills.red;
    }
    else if (event.keyCode === ball.keys.blueKey) {
        ball.fill = ball.fills.blue;
    }
}

function keyReleased() {
    if (event.keyCode === ball.keys.redKey || event.keyCode === ball.keys.blueKey) {
        ball.fill = ball.fills.white;
    }
}