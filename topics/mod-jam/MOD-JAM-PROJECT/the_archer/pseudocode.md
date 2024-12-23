# Pseudocode for The Archer

```
Archer
    body
        x: 320 // Halfway across a 640x480 canvas
        y: 400 // Bottom of a 640x480 canvas
        size: 50 // Size of the archer
    Arrow
        x: undefined // Will always match the body
        y: 400 // At the bottom
        width: 5 // width of the arrow
        length: 20// length of the arrow
        speed: 20 // speed of the arrow
        state: idle // The arrow starts by not moving

enemies
    Regular Enemies
        x: 0 // The left
        y: between 50 & 300 // This will be a random position...
        size: 30 //
        speed: 2.5 // How fast it moves across the screen
        type: "normal"

    Strong Enemies
        x: 0// Left
        y: between 50 & 300// random
        size: 50 //bigger than weaker enemies
        speed: 2 // Slower than regular enemies
        type: strong // takes 2 hits to kill

setup()
    Create a 640x480 canvas

draw()
    Draw the background // grassy field with patches of dirt
    drawVillage // draws the village with a fence going across the screen vertically, and a building behind the fence
    drawEnemies // draws the regular enemies as red circles, and the strong enemies as darker red circles
    moveEnemies // make enemies move via their speed. When the enemy reaches the fence, reset the enemy's X to zero, picks a random Y, and
                   decreases lives by 1
    drawArcher // draw archer's body as a yellow circle. If arrow's state is no longer idle, draw a brown rectangle and silver triangle at the
                  tip at the current arrow's X and Y position.
    moveArcher // set archer's X to the mouse's x position.
    moveArrow // set arrow's X to the archer's body's X. If arrow's state in outbound (not idle), decrease the arrow's Y by the arrow's speed.
                 Once it's less than or equal to 0, set the state back to idle.
    arrowOverlap // Calculate distance between each enemy and the arrow. If there is an overlap between the arrow and the enemy, reset the
                    enemy's X to 0, randomize the Y between 50 and 300, set the arrow back to idle, increase the score by one.
    drawScore // Draw the text "Score", followed by the current score (position 500,30)
    CheckGameOver // If the lives are less than or equal to 0, stop the game loop, draw "Game Over" text at the center of the canvas, and draw
                     "Press R to Restart" below the "Game Over" text.

Event Handlers:
    If r is pressed, restart game
    if game is reset, set lives from 0 to 5, recreate enemy array, reset arrow back to the archer's body, set arrow's state back to idle,
    restart the game loop

```
