/**
 * Art Jam - Ride the Rocket
 * Simon Medalssy
 * 
 * Hover a quarter over the slot to activate the rocket and go for a fun ride!
 */

"use strict";

//Const for Quarter over the mouse
const quarter = {
    x: undefined,
    y: undefined,
    size: 27,
    fill: "#b5b5b5"
};

//Const for base of the rocket
const base = {
    x: 350,
    y: 350,
    size: 100,
    fill: "#292929"
};

//Const for rocket
const rocket = {
    x:270,
    y:300,
    fill: "#ff0000",
};

let rBody = {
    x:270,
    y:300,
    fill: "#ff0000",
};

//const for the quarter slot
const slot = {
    x:530,
    y:410,
    size:65,
    fill: "#202020"
};

const light = {
    x: 515,
    y: 380,
    size: 15,
    fill: "#ff0000",
    fills: {
        overlap: "#00ff00",
        noOverlap: "#ff0000"
    }
};

//Makes the rocket shake
let isShaking = false;

//Makes the rocket bob up and down
let bobAngle = 0;
const bobSpeed = 6;
const bobAmplitude = 15;


//Creates the canvas that the project will be on
function setup() {
    createCanvas(600,600);
    angleMode(DEGREES);
}


/**
 * Draws all the components for my artwork!
*/
function draw() {
    //draws the background
    background ("#d9c898")
    //draws the base of the rocket
    drawBase()
    //draws the rocket
    drawRocket()
    //draws the quarter slot
    drawSlot()
    //draws the quarter
    drawQuarter()
    moveQuarter()
    insertQuarter()
}

//Draws the Base of the rocket
function drawBase () {
    push();
    strokeWeight(2);
    stroke("#000000");
    fill("#999999");
    rect(250,250,40,300);
    rect(150,500,270,100);

    fill("#ffffff");
    textSize(33);
    textAlign(CENTER,CENTER);
    text("Ride the Rocket!", 285, 550);
    pop();
}

//Draws every component of the Rocket
function drawRocket () {
    push();
    //draws the rocket shaking and bobbing
    if (isShaking) {
        //apply shaking
        translate(random(-2,2),random(-2,2));
        //apply bobbing
        let bobOffset = sin(bobAngle) * bobAmplitude;
        translate(0, bobOffset);
        bobAngle += bobSpeed * (frameRate() > 0 ? 1 : 0);
    }
    drawRWings();
    drawRFire();
    drawRFire2();
    drawRBody();
    drawRCockpit();
    drawRFlap();
    drawRExhaust();
    drawRWindow();
    pop();
}

//Draws the Wings of the Rocket
function drawRWings () {
    push();
    strokeWeight(2);
    stroke("#000000");
    fill("#0000ff");
    arc(400, 300, 150, 200, 90, 270);
    pop();
}

//Draws the Body of the Rocket
function drawRBody () {
    push();
    strokeWeight(2);
    stroke("#000000");
    fill(rBody.fill);
    ellipse(rBody.x,rBody.y,300,140);
    pop();
}

function drawRCockpit () {
    push();
    strokeWeight(2);
    stroke("#000000");
    fill("#0000ff");
    ellipse(270, 235, 120, 20);
    pop();
    push();
    strokeWeight(2);
    stroke("#000000");
    fill("#000000");
    ellipse(270, 230, 95, 10);
    pop();

}

//Draws the flap of the rocket
function drawRFlap () {
    push();
    strokeWeight(2);
    stroke("#000000");
    fill("#0000ff");
    ellipse(370, 300, 60, 20);
    pop();
}

//Draws the orange Fire behind the Rocket
function drawRFire () {
    push();
    strokeWeight(2);
    stroke("#000000");
    fill("#ffa200");
    ellipse(470, rocket.y, 170, 80);
    pop();
}

//Draws the yellow fire
function drawRFire2 () {
    push();
    strokeWeight(2);
    stroke("#000000");
    fill("#ffe600");
    ellipse(450, rocket.y, 170, 70);
    pop();
}

//Draws the Exhaust of the Rocket
function drawRExhaust () {
    push();
    strokeWeight(2);
    stroke("#000000");
    fill(rocket.fill);
    quad(400,264,400,336,470,350,470,250);
    pop();
}

//Draws the window of the rocket
function drawRWindow () {
    push();
    strokeWeight(2);
    stroke("#000000");
    fill("#d2faf6");
    ellipse(200,rocket.y,55,55);
    pop();
}

/**
 * Time to draw the coin slot!
 */

//Draws the components for the slot
function drawSlot () {
    drawSBase(),
    drawSHole(),
    drawSLight()
}

//Draws the Base of the slot thing
function drawSBase() {
    push();
    strokeWeight(2);
    stroke("#000000");
    fill("#999999");
    rect(500,360,70,100);
    rect(525,460,20,70);
    rect(475,530,120,70);

    fill("#ffffff");
    textSize(20);
    textAlign(CENTER,CENTER);
    text("Insert Coin!", 535, 570);
    pop();
}

//Draws the hole where the quarter goes in
function drawSHole() {
    push();
    noStroke();
    fill("#060606");
    rect(530,415,10,30);
    pop();
}

//Draws the red light that turns green when the machine is active
function drawSLight() {
    push();
    strokeWeight(2);
    stroke("#000000");
    fill(light.fill)
    ellipse(light.x,light.y,light.size);
    pop();
}

//Draws the quarter that will be the mouse
function drawQuarter () {
  push();
  strokeWeight(1);
  stroke("#575757");
  fill(quarter.fill);
  ellipse(quarter.x, quarter.y, quarter.size);
  pop();
}

//makes it so the quarter follows the mouse movement
function moveQuarter () {
    quarter.x = mouseX;
    quarter.y = mouseY;
}


//Calculates the distance between the quarter and the slot to see if they overlap
function insertQuarter () {
     const d = dist(quarter.x, quarter.y, slot.x, slot.y);
     const overlap = (d < quarter.size/2 + slot.size/2);
     if (overlap) {
        light.fill = light.fills.overlap;
        isShaking = true
    }
    else {
        light.fill = light.fills.noOverlap;
        isShaking = false;
        bobAngle = 0;
    }
}
