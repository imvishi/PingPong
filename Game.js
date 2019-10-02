/**
 * This class is used to add walls to the world.
 * The constructor of this class takes margin as the arguments which is used to set the
 * margin of the walls.
 *
 * How to use:
 *
 * const wall = new Wall(100)
 * wall.addWalls()
 */
class Wall {
    constructor(margin) {
        this.strokeSize = 10
        this.walls = []
        //Top and bottom walls
        this.verticalWallsPositionX = window.innerWidth/2
        this.topSidePostionY = this.strokeSize + margin
        this.bottomSidePostionY = window.innerHeight - this.strokeSize - margin
        this.width = window.innerWidth - this.strokeSize - margin*2;

        //Left and Right walls
        this.horizontalWallsPositionY = window.innerHeight/2
        this.rightSidePositionX = window.innerWidth - this.strokeSize - margin
        this.leftSidePositionX = this.strokeSize + margin
        this.height = window.innerHeight - this.strokeSize - margin*2
    }

    addWalls() {
        const bottomSide = Bodies.rectangle(
            this.verticalWallsPositionX,
            this.bottomSidePostionY,
            this.width,
            this.strokeSize,
            { isStatic: true});
        const topSide = Bodies.rectangle(
            this.verticalWallsPositionX,
            this.topSidePostionY,
            this.width,
            this.strokeSize,
            { isStatic: true});
        const leftSide = Bodies.rectangle(
            this.leftSidePositionX,
            this.horizontalWallsPositionY,
            this.strokeSize,
            this.height,
            { isStatic: true});
        const rightSide = Bodies.rectangle(
            this.rightSidePositionX,
            this.horizontalWallsPositionY,
            this.strokeSize,
            this.height,
            { isStatic: true});

        this.walls.push(bottomSide)
        this.walls.push(topSide)
        this.walls.push(leftSide)
        this.walls.push(rightSide)
        World.add(engine.world, this.walls);
    }
}
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Event = Matter.Events;
var engine = Engine.create();

var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width:window.innerWidth,
        height:window.innerHeight,
        wireframes:false,
    }
});
var batA = Bodies.rectangle(400,200,30,200, { isStatic: true});
var batB = Bodies.rectangle(1200,200,30,200, {isStatic: true});
var ball = Bodies.circle(580,100,40,10);
ball.restitution = 1.0

var downAndRotateLeft = {"ArrowDown":false,"ArrowLeft":false}
var downAndRotateRight = {"ArrowDown":false,"ArrowRight":false}
var upAndRotateLeft = {"ArrowUp":false,"ArrowLeft":false}
var upAndRotateRight = {"ArrowUp":false,"ArrowRight":false}
var isKeyPressed = false

document.onkeydown = function() {
    var keyPressed = window.event.key
    if (keyPressed in downAndRotateLeft) {
        downAndRotateLeft[keyPressed] = true
        if (downAndRotateLeft["ArrowDown"] == true && downAndRotateLeft["ArrowLeft"] == true) {
            Body.translate(batA, {x:0,y:15})
            Body.rotate(batA,-0.3)
            isKeyPressed = true
        }
    } 
    if (keyPressed in downAndRotateRight) {
        downAndRotateRight[keyPressed] = true
        if (downAndRotateRight["ArrowDown"] == true && downAndRotateRight["ArrowRight"] == true) {
            Body.translate(batA, {x:0,y:15})
            Body.rotate(batA,0.3)
            isKeyPressed = true
        }
    }
    if (keyPressed in upAndRotateLeft) {
        upAndRotateLeft[keyPressed] = true
        if (upAndRotateLeft["ArrowUp"] == true && upAndRotateLeft["ArrowLeft"] == true) {
            Body.translate(batA, {x:0,y:-15})
            Body.rotate(batA,-0.3)
            isKeyPressed = true
        }
    }
    if (keyPressed in upAndRotateRight) {
        upAndRotateRight[keyPressed] = true
        if (upAndRotateRight["ArrowUp"] == true && upAndRotateRight["ArrowRight"] == true) {
            Body.translate(batA, {x:0,y:-15})
            Body.rotate(batA,0.3)
            isKeyPressed = true
        }
    }
    if (isKeyPressed == false) {
        switch(keyPressed) {
            case "ArrowUp":
                Body.translate(batA, {x:0,y:-15})
                break
            case "ArrowDown":
                Body.translate(batA, {x:0,y:15})
                break
            case "ArrowLeft":
                Body.rotate(batA,-0.3)
                break
            case "ArrowRight":
                Body.rotate(batA,0.3)
                break;
        }
    }
}
document.onkeyup = function() {
    isKeyPressed = false
    downAndRotateRight["ArrowDown"] = false
    downAndRotateRight["ArrowRight"] = false
    downAndRotateLeft["ArrowDown"] = false
    downAndRotateLeft["ArrowLeft"] = false
    upAndRotateRight["ArrowRight"] = false
    upAndRotateRight["ArrowUp"] = false
    upAndRotateLeft["ArrowUp"] = false
    upAndRotateLeft["ArrowLeft"] = false
}
//Add walls to the world
const walls = new Wall(200)
walls.addWalls()

World.add(engine.world, batA);
World.add(engine.world, batB);
World.add(engine.world, ball);

Engine.run(engine)
Render.run(render);
