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
        width:1400,
        height:920,
        wireframes:false,
    }
});
var rest = 0.9, 
        space = 600 / 5;
var batA = Bodies.rectangle(400,200,30,200, { isStatic: true});
var batB = Bodies.rectangle(1200,200,30,200, {isStatic: true});
var ball = Bodies.circle(580,100,40,10);
ball.restitution = 1.0
var bottomSide = Bodies.rectangle(800, 900, 1024, 10, { isStatic: true});
var topSide = Bodies.rectangle(800, 100, 1024, 10, { isStatic: true});
var leftSide = Bodies.rectangle(290, 500, 10, 810, { isStatic: true});
var rightSide = Bodies.rectangle(1310, 500, 10, 810, { isStatic: true});

var downAndRotateLeft = {"ArrowDown":false,"ArrowLeft":false}
var downAndRotateRight = {"ArrowDown":false,"ArrowRight":false}
var upAndRotateLeft = {"ArrowUp":false,"ArrowLeft":false}
var upAndRotateRight = {"ArrowUp":false,"ArrowRight":false}
var isKeyPressed = false

Event.on(batA,"")
document.onkeydown = function() {
    var keyPressed = window.event.key
    if (keyPressed in downAndRotateLeft) {
        downAndRotateLeft[keyPressed] = true
        if (downAndRotateLeft["ArrowDown"] == true && downAndRotateLeft["ArrowLeft"] == true) {
            Body.translate(batA, {x:0,y:15})
            Body.rotate(batA,-0.3)
            isKeyPressed = true
            console.log("downAndRotateLeft"+batA.position.x+batA.position.y)
        }
    } 
    if (keyPressed in downAndRotateRight) {
        downAndRotateRight[keyPressed] = true
        if (downAndRotateRight["ArrowDown"] == true && downAndRotateRight["ArrowRight"] == true) {
            Body.translate(batA, {x:0,y:15})
            Body.rotate(batA,0.3)
            isKeyPressed = true
            console.log("downAndRotateRight")
        }
    }
    if (keyPressed in upAndRotateLeft) {
        upAndRotateLeft[keyPressed] = true
        if (upAndRotateLeft["ArrowUp"] == true && upAndRotateLeft["ArrowLeft"] == true) {
            Body.translate(batA, {x:0,y:-15})
            Body.rotate(batA,-0.3)
            isKeyPressed = true
            console.log("upAndRotateLeft")
        }
    }
    if (keyPressed in upAndRotateRight) {
        upAndRotateRight[keyPressed] = true
        if (upAndRotateRight["ArrowUp"] == true && upAndRotateRight["ArrowRight"] == true) {
            Body.translate(batA, {x:0,y:-15})
            Body.rotate(batA,0.3)
            isKeyPressed = true
            console.log("upAndRotateRight")
        }
    }
    if (isKeyPressed == false) {
        switch(keyPressed) {
            case "ArrowUp":
                console.log("up")
                Body.translate(batA, {x:0,y:-15})
                break
            case "ArrowDown":
                console.log("Down")
                Body.translate(batA, {x:0,y:15})
                break
            case "ArrowLeft":
                console.log("left")
                Body.rotate(batA,-0.3)
                break
            case "ArrowRight":
                console.log("Right")
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
World.add(engine.world, [bottomSide, topSide, leftSide, rightSide]);
World.add(engine.world, batA);
World.add(engine.world, batB);
World.add(engine.world, ball);

Engine.run(engine)
Render.run(render);
