function getRadiusByDegree(degree) {
    return Math.PI / 180 * degree;
}

function getMiddlePlace(pointA, pointB) {
    return { x: (pointA.x + pointB.x) / 2, y: (pointA.y + pointB.y) / 2 };
}

function getTotalAreaOfBalls() {
    var sum = 0;
    engine.world.bodies.filter(x => Number(x.label)).forEach(x => sum += x.area);
    return sum;
}

function isAreaMeetFillGate() {
    var totalArea = Math.pow(canvasWidth - wallThickness * 2, 2);
    var fillGateRate = 0.4;
    return totalArea * fillGateRate < getTotalAreaOfBalls();
}

function getRandomNumber(from, to) {
    return Math.floor(Math.random() * (to - from)) + from;
}

function forceAdding(bodyA, bodyB) {
    var newForceX = (bodyA.force.x + bodyB.force.x) / 2;
    var newForceY = (bodyA.force.y + bodyB.force.y) / 2;
    var newTorque = (bodyA.torque + bodyB.torque) / 2;
    return [newForceX,
        newForceY,
        newTorque];
}