/**
 * The Archer
 * Simon Medalssy
 * 
 * A game of shooting down enemies with a bow before their pillage your village!
 * 
 * Instructions:
 * - Move the Archer with your mouse
 * - Click to shoot your bow
 * - Eliminate as many enemies as possible
 * - Don't run out of your 5 lives
 * - Get the highest score possible before you die!
 * - This is real life. There is no winning. You WILL die.
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// Our Archer
const archer = {
    body: {
        x: 320,
        y: 420,
        size: 50
    },
    //The arrow
    arrow: {
        x: 320,
        y: 400,
        width: 5,
        length: 20,
        speed: 20,
        state: "idle"
    }
};

let enemies = [];
//score starts at 0
let score = 0;
//player gets 5 lives
let lives = 5;
let gameRunning = true;

function setup() {
    createCanvas(700, 480);
    createEnemies();
}

function draw() {
    if (gameRunning) {
        drawBackground();
        drawVillage();
        drawEnemies();
        moveEnemies();
        drawArcher();
        moveArcher();
        moveArrow();
        arrowOverlap();
        drawScore();
        checkGameOver();
    }
}

function createEnemies() {
    //draws the enemies
    enemies = [];
    //3 regular enemies
    for (let i = 0; i < 3; i++) {
        enemies.push({
            x: 0,
            y: random(50, 300),
            size: 30,
            speed: 1.5,
            type: 'normal'
        });
    }
    //2 strong enemies
    for (let i = 0; i < 2; i++) {
        enemies.push({
            x: 0,
            y: random(50, 300),
            size: 50,
            speed: 1.2,
            type: 'strong',
            hits: 0
        });
    }
}

function drawBackground() {
    //draws a grassy green background
    background('#188720');
}

function drawVillage() {
    //draws the village fence
    let fenceX = 570;

    //fence posts
    strokeWeight(12);
    //dark brown
    stroke('#6B4423');
    for (let y = 0; y < height; y += 60) {
        line(fenceX, y, fenceX, y + 60);
    }
    //fence planks
    strokeWeight(6);
    //light brown
    stroke('#8B6B4F');
    for (let y = 15; y < height; y += 60) {
        line(fenceX - 20, y, fenceX + 20, y);
        line(fenceX - 20, y + 30, fenceX + 20, y + 30);
    }
    //Draws multiple huts
    drawHut(615, -40, 60);
    drawHut(620, 20, 60);
    drawHut(630, 80, 60);
    drawHut(615, 140, 60);
    drawHut(620, 200, 60);
    drawHut(630, 260, 60);
    drawHut(615, 320, 60);
    drawHut(620, 380, 60);
    drawHut(630, 440, 60);
    drawHut(615, 500, 60);
}

function drawHut(x, y, size) {
    noStroke();
    //body
    fill('#D2691E');
    rect(x, y, size, size * 0.8);

    //roof
    fill('#8B4513');
    triangle(x - 10, y, x + size / 2, y - 30, x + size + 10, y);

    //window
    fill('#87CEEB');
    rect(x + size * 0.3, y + size * 0.2, size * 0.4, size * 0.3);
}

function drawEnemies() {
    enemies.forEach(enemy => {
        if (enemy.type === 'normal') {
            fill('red');
        } else {
            fill('#8B0000');
        }
        noStroke();
        ellipse(enemy.x, enemy.y, enemy.size);
    });
}

function moveEnemies() {
    enemies.forEach(enemy => {
        enemy.x += enemy.speed;
        //if an enemy makes it to the fence
        if (enemy.x >= 570) {
            //their position resets to a new location
            enemy.x = 0;
            enemy.y = random(50, 300);
            //and the player loses a life
            lives--;
        }
    });
}

function drawArcher() {
    fill('yellow');
    ellipse(archer.body.x, archer.body.y, archer.body.size);

    //draw arrow if not idle
    if (archer.arrow.state !== 'idle') {
        fill('#8B4513');
        rect(archer.arrow.x - archer.arrow.width / 2,
            archer.arrow.y - archer.arrow.length,
            archer.arrow.width,
            archer.arrow.length);
        //draw arrow tip
        fill('silver');
        triangle(archer.arrow.x - 8, archer.arrow.y - archer.arrow.length,
            archer.arrow.x + 8, archer.arrow.y - archer.arrow.length,
            archer.arrow.x, archer.arrow.y - archer.arrow.length - 15);
    }
}

function moveArcher() {
    //archer's x is tied to the mouse
    archer.body.x = constrain(mouseX, 25, width - 25);
}

function moveArrow() {
    if (archer.arrow.state === 'idle') {
        archer.arrow.x = archer.body.x;
        archer.arrow.y = archer.body.y;
    } else {
        archer.arrow.y -= archer.arrow.speed;
        if (archer.arrow.y <= 0) {
            archer.arrow.state = 'idle';
        }
    }
}

function arrowOverlap() {
    enemies.forEach(enemy => {
        let d = dist(archer.arrow.x, archer.arrow.y, enemy.x, enemy.y);
        if (d < (enemy.size / 2 + 5) && archer.arrow.state !== 'idle') {
            if (enemy.type === 'strong') {
                enemy.hits++;
                if (enemy.hits >= 2) {
                    enemy.x = 0;
                    enemy.y = random(50, 300);
                    enemy.hits = 0;
                    score++;
                }
            } else {
                enemy.x = 0;
                enemy.y = random(50, 300);
                score++;
            }
            archer.arrow.state = 'idle';
        }
    });
}

function drawScore() {
    fill(0);
    textSize(24);
    textStyle(BOLD);
    text(`Score: ${score}`, 500, 30);
    text(`Lives: ${lives}`, 500, 60);
    textStyle(NORMAL);
}

function checkGameOver() {
    if (lives <= 0) {
        gameRunning = false;
        textAlign(CENTER);
        textSize(48);
        fill(0);
        textStyle(BOLD);
        text('Game Over', width / 2, height / 2);
        textSize(24);
        text('Press R to Restart', width / 2, height / 2 + 40);
        textStyle(NORMAL);
        noLoop();
    }
}

function keyPressed() {
    if (key === 'r' || key === 'R') {
        lives = 5;
        score = 0;
        createEnemies();
        archer.arrow.state = 'idle';
        gameRunning = true;
        loop();
    }
}

function mousePressed() {
    if (archer.arrow.state === 'idle' && gameRunning) {
        archer.arrow.state = 'outbound';
    }
}