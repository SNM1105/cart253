# Pseudocode for Retro Racing

```
car {
    x: 0 // starting at the left side of the screen
    y: 240 // halfway down the canvas
    size: 15 // small oval
}

road {
    somehow need to figure out how to randomly generate a map with all the segments connected together.
    Will use Claude.AI or ChatGPT for assistance in learning.
}

offroad {
    Everything that isn't the road will be offroad and will kill the player / game over
}

GameOver {
    Draw a game over screen when the player dies
}

setup()
    720 by 480 canvas. long map

draw()
    Background will be grassy green
    drawCar
    moveCar
    drawRoad
    drawOffroad
    drawGameOver

drawCar()
    drawCarBody
    drawCarMirrors
    drawCarWindshield
    drawCarHeadlights

drawCarBody()
    red rectangle w/ rounded corners

drawCarMirrors()
    2 red ovals on each side of the car, near the front

drawCarWindshield()
    light blue quad shape, 1 in front and 1 in back

drawCarHeadlights()
    2 yellow circles on the front of the car

moveCar ()

```
