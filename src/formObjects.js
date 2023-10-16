var massMapping = [-1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
function createBall(side, level) {
    if (level == null) level = 1;
    var offset = 70;
    var x = canvasWidth / 2;
    var y = wallThickness + offset;
    if (setting_displayClaw) {
        x = claw.position.x - setting_clawRelativePosition[0];
        y = claw.position.y - setting_clawRelativePosition[1];
    }
    var ballInfo = getBallInfo(level);
    var renderObj = setting_usingBallImage ?
        {
            sprite: {
                texture: ballInfo.color,
                xScale: setting_textureScale[level],
                yScale: setting_textureScale[level]
            }
        } :
        {
            fillStyle: ballInfo.color
        }
    var ball = Bodies.circle(x, y, ballInfo.size, options = { label: level, render: renderObj, isSleeping: true, slop: 0.01 }, 80);
    ball.render.text = Math.pow(2, level);
    ball.mass = massMapping[level];
    ball.frictionStatic = 0;
    Composite.add(engine.world, [ball]);
    return ball;
}

function getBallInfo(level) {
    level = parseInt(level);
    const ballColor = ["#D8F3DC", "#B7E4C7", "#95D5B2", "#74C69D", "#52B788", "#40916C", "#2D6A4F", "#1B4332", "#1B4332", "#081C15"];
    var ballSize = Math.sqrt((canvasWidth / 300) * level * Math.sqrt(Math.sqrt(level))) * 10;
    var baseUnit = canvasWidth / 2.5;
    var ballSizeRatioMapping = [-1, 0.08, 0.1, 0.14, 0.16, 0.18, 0.24, 0.32, 0.40, 0.48, 0.56, 0.64];
    return {
        color: setting_usingBallImage ? "./img/balls/" + level + ".png" : ballColor[level - 1],
        size: baseUnit * ballSizeRatioMapping[level]
    }
}

function generateBallAfterSwiped(side) {
    switch (side) {
        case "top":
            createBall("down");
            return;
        case "down":
            createBall("top");
            return;
        case "left":
            createBall("right");
            return;
        case "right":
            createBall("left");
            return;
    }
}

function ballCollision(collisionLevel, bodyAId, bodyBId) {
    var newLevel = parseInt(collisionLevel) + 1;
    updateScore(Math.pow(2, newLevel));
    var newBallInfo = getBallInfo(newLevel);
    var bodyA = engine.world.bodies.filter(x => x.id == bodyAId)[0];
    var bodyB = engine.world.bodies.filter(x => x.id == bodyBId)[0];
    if (bodyA == null || bodyB == null) {
        return;
    }
    var newForce = forceAdding(bodyA, bodyB);
    var newPosition = getMiddlePlace(bodyA.position, bodyB.position);
    var renderObj = setting_usingBallImage ?
        {
            sprite: {
                texture: newBallInfo.color,
                xScale: setting_textureScale[newLevel],
                yScale: setting_textureScale[newLevel]
            }
        } :
        {
            fillStyle: newBallInfo.color
        }
    var ball = Bodies.circle(newPosition.x, newPosition.y, newBallInfo.size, options = { label: newLevel, render: renderObj, slop: 0.01 }, 80);
    ball.render.text = Math.pow(2, newLevel);
    ball.force.x = newForce[0];
    ball.force.y = newForce[1];
    ball.torque = newForce[2];
    ball.mass = massMapping[newLevel];
    ball.frictionStatic = 0;
    Composite.add(engine.world, [ball]);
    if ((bodyA.id == holdingBall.id || bodyB.id == holdingBall.id) && holdingDropping) {
        holdingBall = createBall("top", getRandomNumber(1, 5));
        holdingDropping = false;
    }
    Composite.remove(engine.world, [bodyA, bodyB]);
    for (var i in engine.world.bodies) {
        if (ball.label != engine.world.bodies[i].label) continue;
        if (ball.id == engine.world.bodies[i].id) continue;
        var collision = Matter.SAT.collides(ball, engine.world.bodies[i]);
        if (collision.collided) {
            ballCollision(ball.label, ball.id, engine.world.bodies[i].id)
        }
    }
}