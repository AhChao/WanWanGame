var massMapping = [-1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
function createBall(side, level) {
    if (level == null) level = 1;
    var offset = 70 * setting_globalSizeCoef;
    var x = canvasWidth / 2;
    var y = wallThickness;
    if (setting_displayClaw) {
        x = claw.position.x - setting_clawRelativePosition[0] * setting_globalSizeCoef;
        y = claw.position.y - setting_clawRelativePosition[1] * setting_globalSizeCoef;
    }
    var ballInfo = getBallInfo(level);
    var renderObj = setting_usingBallImage ?
        {
            sprite: {
                texture: ballInfo.color,
                xScale: setting_textureScale[level] * setting_globalSizeCoef * setting_ballRadiusMultiplier,
                yScale: setting_textureScale[level] * setting_globalSizeCoef * setting_ballRadiusMultiplier
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
    var ballSizeRatioMapping = [-1, 0.08, 0.1, 0.14, 0.16, 0.18, 0.24, 0.32, 0.40, 0.48, 0.56, 0.64];
    return {
        color: setting_usingBallImage ? "./img/balls/" + level + ".png" : ballColor[level - 1],
        size: setting_gridBase / 2.5 * setting_globalSizeCoef * ballSizeRatioMapping[level] * setting_ballRadiusMultiplier
    }
}

function ballCollision(collisionLevel, bodyAId, bodyBId) {
    var newLevel = parseInt(collisionLevel) + 1;
    updateScore(Math.pow(2, newLevel));
    var newBallInfo = getBallInfo(newLevel);
    var bodyA = engine.world.bodies.filter(x => x.id == bodyAId)[0];
    var bodyB = engine.world.bodies.filter(x => x.id == bodyBId)[0];
    if (newLevel > 11) {
        Composite.remove(engine.world, [bodyA, bodyB]);
        return;
    }
    if (bodyA == null || bodyB == null) {
        return;
    }
    var newForce = forceAdding(bodyA, bodyB);
    var newPosition = getMiddlePlace(bodyA.position, bodyB.position);
    var renderObj = setting_usingBallImage ?
        {
            sprite: {
                texture: newBallInfo.color,
                xScale: setting_textureScale[newLevel] * setting_globalSizeCoef * setting_ballRadiusMultiplier,
                yScale: setting_textureScale[newLevel] * setting_globalSizeCoef * setting_ballRadiusMultiplier
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
    Composite.remove(engine.world, [bodyA, bodyB]);
}