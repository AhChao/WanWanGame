function triggerEnding() {
    stopTheRunner();
    updateHistoryScore(score);
    if (score == getBestScore()) {

        alert("You got " + score + " points and it is NEW HIGH SCORE!\nWell done!");
    }
    else {
        alert("You got " + score + " points!");
    }
    if (!setting_usingBallImage) {
        renderText();
    }
}