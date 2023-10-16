var collidedList = new Set();
var collisionLock = false;
async function collisionTriggered(e) {
    while (collisionLock) {
        await new Promise((resolve) => setTimeout(resolve, 10));
    }
    collisionLock = true;
    if (e.name == 'collisionStart' && e.pairs.length > 0) {
        //Deal ball bigger only when the same ball collision
        for (var i in e.pairs) {
            if (e.pairs[i].bodyA.isSensor || e.pairs[i].bodyB.isSensor) {
                var nonSensorObj = e.pairs[i].bodyA.isSensor ? e.pairs[i].bodyB : e.pairs[i].bodyA;
                setTimeout(() => { checkIsStillInsideSensor(nonSensorObj) }, 500);
            }
            else {
                collidedList.add(e.pairs[i].bodyA.id);
                collidedList.add(e.pairs[i].bodyB.id);
                if (holdingDropping) {
                    if ((e.pairs[i].bodyA.id == holdingBall.id || e.pairs[i].bodyB.id == holdingBall.id || collidedList.has(holdingBall.id)) && holdingDropping) {
                        holdingBall = createBall("top", getRandomNumber(1, 5));
                        holdingDropping = false;
                    }
                }
                if (e.pairs[i].bodyA.label != e.pairs[i].bodyB.label) continue;
                ballCollision(e.pairs[i].bodyA.label, e.pairs[i].bodyA.id, e.pairs[i].bodyB.id);
            }
        }
    }
    collisionLock = false;
}

function checkIsStillInsideSensor(nonSensorObj) {
    var collision = Matter.SAT.collides(sensor, nonSensorObj);
    if (collision.collided) {
        alert("GG!");
    }
}