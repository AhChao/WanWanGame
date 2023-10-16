// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    BodyM = Matter.Body,
    Composite = Matter.Composite,
    Events = Matter.Events,
    Plugins = Matter.Plugins;

var engine;
var render;
var runner;
const canvasWidth = screen.width < 600 ? screen.width : 600;
const canvasHeight = screen.width < 600 ? screen.width : 600;
const wallThickness = 30;
var score = 0;
var bestScore = localStorage.getItem('bestScore') ? localStorage.getItem('bestScore') : 0;
var holdingBall;
var holdingDropping = false;

function runTheRunner() {
    Runner.run(runner, engine);
}

function stopTheRunner() {
    Runner.stop(runner, engine);
}

function updateScore(addAmount) {
    score += addAmount;
    document.getElementById("scoreDisplay").innerHTML = score;
}

function updateBestScore(newBestScore) {
    bestScore = newBestScore;
    localStorage.setItem('bestScore', bestScore);
    document.getElementById("bestScoreDisplay").innerHTML = bestScore;
}

function init() {
    score = 0;
    updateScore(0);
    // create an engine
    engine = Engine.create();
    // create a renderer
    render = Render.create({
        element: document.getElementById("canvasPlace"),
        engine: engine,
        options: {
            width: canvasWidth,
            height: canvasHeight,
            background: setting_usingBackgroundImage ? '../img/background/background.png' : '#FEFAE0',
            hasBounds: true,
            showBounds: false,
            enabled: true,
            wireframes: false,
            showSleeping: false,
            showStats: false,
            showVelocity: false,
            showCollisions: false,
            showSeparations: false,
            showPositions: false,
            showAngleIndicator: false,
            showIds: false,
        }
    });
    // create two boxes and a ground
    //var wallA = Bodies.rectangle(canvasWidth / 4, canvasHeight / 4, canvasWidth, wallThickness, { isStatic: true, render: { fillStyle: "#BC6C25" }, slop: 0 });
    var wallRender =
        setting_usingBoundaryImage ?
            {
                sprite: {
                    texture: "../img/background/boundary.png",
                    xScale: setting_textureScaleBoundary[0],
                    yScale: setting_textureScaleBoundary[1]
                }
            } :
            {
                fillStyle: "#CCCCCC"
            }
    var wallLeft = Bodies.rectangle(0, canvasHeight * 1, wallThickness, canvasHeight * 1.5, { isStatic: true, render: wallRender, slop: 0 });
    var wallRight = Bodies.rectangle(canvasWidth, canvasHeight * 1, wallThickness, canvasHeight * 1.5, { isStatic: true, render: wallRender, slop: 0 });
    var wallBottom = Bodies.rectangle(canvasHeight * 0.75, canvasHeight * 1, wallThickness, canvasHeight * 1.5, { isStatic: true, render: wallRender, angle: getRadiusByDegree(90), slop: 0 });
    wallBottom.frictionStatic = 0;
    wallBottom.friction = 0;

    // add all of the bodies to the world
    Composite.add(engine.world, [wallLeft, wallRight, wallBottom]);
    holdingBall = createBall("top", getRandomNumber(1, 5));

    // run the renderer
    Render.run(render);
    // create runner
    runner = Runner.create();
    engine.gravity.scale = 0.001;
    Events.on(engine, "collisionStart", collisionTriggered);
    if (!setting_usingBallImage) {
        Events.on(engine, "afterUpdate", renderText);
    }
    document.addEventListener('keydown', function (event) {
        switch (event.key) {
            case "ArrowLeft":
                moveTheHolding("left");
                break;
            case "ArrowRight":
                moveTheHolding("right");
                break;
            case "ArrowDown":
                dropTheHolding();
                break;
        }
    });
    runTheRunner();
}

function moveTheHolding(side) {
    var offset = 10;
    var rightBound = canvasWidth - wallThickness - holdingBall.circleRadius + offset;
    var leftBound = 0 + wallThickness + holdingBall.circleRadius - offset;
    if (!holdingDropping) {
        switch (side) {
            case "left":
                BodyM.translate(holdingBall,
                    { x: (holdingBall.position.x > leftBound ? - setting_movingScale : 0), y: 0 });
                break;
            case "right":
                BodyM.translate(holdingBall,
                    { x: (holdingBall.position.x < rightBound ? setting_movingScale : 0), y: 0 });
                break;
        }
    }
}

function dropTheHolding() {
    if (!holdingDropping) {
        holdingBall.isSleeping = false;
        holdingDropping = true;
    }
}

function retry() {
    event.preventDefault();
    Engine.clear(engine);
    Render.stop(render);
    Runner.stop(runner);
    render.canvas.remove();
    render.canvas = null;
    render.context = null;
    render.textures = {};
    init();
}
init();
updateBestScore(bestScore);