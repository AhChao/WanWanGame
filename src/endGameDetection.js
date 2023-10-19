function triggerEnding() {
    stopTheRunner();
    if (score > bestScore) {
        updateBestScore(score);
        alert("You got " + score + " points and it is NEW HIGH SCORE!\nWell done!");
    }
    else {
        alert("You got " + score + " points!");
    }
    if (!setting_usingBallImage) {
        renderText();
    }
}