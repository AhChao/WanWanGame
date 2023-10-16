function collisionTriggered(e) {
    if (e.name == 'collisionStart' && e.pairs.length > 0) {
        //Any collision for the dropping ball make the new ball generated
        if (holdingDropping) {
            for (var i in e.pairs) {
                if ((e.pairs[i].bodyA.id == holdingBall.id || e.pairs[i].bodyB.id == holdingBall.id) && holdingDropping) {
                    holdingBall = createBall("top", getRandomNumber(1, 5));
                    holdingDropping = false;
                    break;
                }
            }
        }

        //Deal ball bigger only when the same ball collision
        for (var i in e.pairs) {
            if (e.pairs[i].bodyA.label != e.pairs[i].bodyB.label) continue;
            ballCollision(e.pairs[i].bodyA.label, e.pairs[i].bodyA.id, e.pairs[i].bodyB.id);
        }
    }
}