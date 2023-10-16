function collisionTriggered(e) {
    if (e.name == 'collisionStart' && e.pairs.length > 0) {
        //Any collision for the dropping ball make the new ball generated
        if ((e.pairs[0].bodyA.id == holdingBall.id || e.pairs[0].bodyB.id == holdingBall.id) && holdingDropping) {
            holdingDropping = false;
            holdingBall = createBall("top", getRandomNumber(1, 5));
        }
        //Deal ball bigger only when the same ball collision
        if (e.pairs[0].bodyA.label != e.pairs[0].bodyB.label) return;
        ballCollision(e.pairs[0].bodyA.label, e.pairs[0].bodyA.id, e.pairs[0].bodyB.id);
    }
}