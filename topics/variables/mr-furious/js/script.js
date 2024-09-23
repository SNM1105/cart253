/**
 * Mr. Furious
 * Simon M.
 *
 * A guy who becomes visibly furious!
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
  // Position and size
  x: 200,
  y: 200,
  size: 100,
  // Colour
  fill: {
    r: 255,
    g: 225,
    b: 225
  },
  shakeAmount: 0
};

let sky = {
    fill: {
        r: 160,
        g: 180,
        b: 200
    }
}

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
    //make the sky darker
  sky.fill.r = constrain(sky.fill.r - 1, 0, 255);
  sky.fill.g = constrain(sky.fill.g - 1, 0, 255);
  sky.fill.b = constrain(sky.fill.b - 1, 0, 255);

  //draw the sky
  background(sky.fill.r, sky.fill.g, sky.fill.b);

  //make mr. furious' face redder
  mrFurious.fill.g = constrain(mrFurious.fill.g - 0.7, 0, 255)
  mrFurious.fill.b = constrain(mrFurious.fill.b - 0.7, 0, 255)

//   mrFurious.fill.g -= .5;
//   mrFurious.fill.b -= .5;
//   mrFurious.fill.g = constrain(mrFurious.fill.g, 0, 255);
//   mrFurious.fill.b = constrain(mrFurious.fill.b, 0, 255);

  //make mr. furious shake
  // mrFurious.shakeAmount += 0.05;
  // mrFurious.shakeAmount = constrain(mrFurious.shakeAmount -0.05);
    mrFurious.shakeAmount = constrain(mrFurious.shakeAmount + 0.05, 0, 5);
    const x = mrFurious.x + random(-mrFurious.shakeAmount, mrFurious.shakeAmount);
    const y = mrFurious.y + random(-mrFurious.shakeAmount, mrFurious.shakeAmount);
  
  // Draw Mr. Furious as a coloured circle
  push();
  noStroke();
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(x,y, mrFurious.size);
  pop();
}