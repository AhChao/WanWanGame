var collidedList = new Set();
var collisionLock = false;
var detectingList = [];
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
                if (detectingList.indexOf(nonSensorObj.id) == -1) {
                    detectingList.push(nonSensorObj.id);
                    setTimeout(() => { checkIsStillInsideSensor(nonSensorObj) }, 1500);
                }
            }
            else {
                collidedList.add(e.pairs[i].bodyA.id);
                collidedList.add(e.pairs[i].bodyB.id);
                if (holdingDropping) {
                    if ((e.pairs[i].bodyA.id == holdingBall.id || e.pairs[i].bodyB.id == holdingBall.id || collidedList.has(holdingBall.id)) && holdingDropping) {
                        holdingBall = createBall("top", nextBall);
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
    detectingList.splice(detectingList.indexOf(nonSensorObj.id), 1);
    console.log(detectingList);
    if (engine.world.bodies.filter(x => x.id == nonSensorObj.id).length == 0) {
        return;
    }
    var collision = Matter.SAT.collides(sensor, nonSensorObj);
    if (collision.collided || sensor.position.x > nonSensorObj.position.x) {
        alert("GG!", collision.collided, sensor.position.x, nonSensorObj.position.x);//Ending Message For Debug
        triggerEnding();
    }
}