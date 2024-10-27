# Pseudocode for Frogfrogfrog

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
    moveArrow // set arrow's X to the archer's body's X. If arrow's state in outbound (not idle),
```
