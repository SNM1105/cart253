/**
 * Movement
 * Simon M
 * 
 * Experimenting with Movement
 */

"use strict";

let bird = {
    x: 120,
    y: 480,
    size: 50,
    velocity: {
        x: 1,
        y: -2
    },
    minVelocity: {
        x: -3,
        y: -2
    },
    maxVelocity: {
        x: 3,
        y: 2
    },
    acceleration: {
        x: 0.025,
        y: -0.05
    }
}

/**
 * Creates a canvas
*/
function setup() {
    createCanvas(640,480);
}


/**
 * Moce the bird and display it
*/
function draw() {
    background(0);

    //move the bird
    bird.velocity.x += bird.acceleration.x;
    bird.velocity.y += bird.acceleration.y;

    bird.velocity.x = constrain(bird.velocity.x, bird.minVelocity.x, bird.maxVelocity.x);
    bird.velocity.y = constrain(bird.velocity.y, bird.minVelocity.y, bird.maxVelocity.y);

    bird.x += bird.velocity.x;
    bird.y += bird.velocity.y;

    //draw the bird
    push();
    fill(255,0,0);
    noStroke();
    ellipse(bird.x, bird.y, bird.size);
    pop();
}