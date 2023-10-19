function triggerEnding() {
    for (var i = 0; i < runningTimer.length; i++) {
        clearTimeout(runningTimer[i]);
    }
    stopTheRunner();
    updateHistoryScore(score);
    if (score == getBestScore()) {

        alert("你獲得了 " + score + " 分，是歷史新高分!\n恭喜你!");
    }
    else {
        var top3Today = getTop3HighScoreInRange("today");
        var wording = top3Today[0] == score ? "🥇第一名" : top3Today[1] == score ? "🥈第二名" : top3Today[2] == score ? "🥉第三名" : "";
        if (wording == "") {
            alert("你獲得了 " + score + " 分!\n和今日的第三名只差 " + (top3Today[2] - score) + " 分！再接再厲！");
        }
        else {
            alert("你獲得了 " + score + " 分!\n這是今天" + wording + "的成績！做的好！");
        }
    }
    if (!setting_usingBallImage) {
        renderText();
    }
}

function openCircleInModal() {
    document.getElementById("menuCloseBtn").click();
    document.getElementById("highScoreTexts").style.display = "none";
    document.getElementById("circleImgInModal").style.display = "block";
    document.getElementById("highScoreTitle").innerHTML = stringMapping["{mergeCircle}"];
    document.getElementById("highScoreModalBtn").click();
}

function openHighScoreModal(range) {
    var top3Scores = getTop3HighScoreInRange(range);
    document.getElementById("menuCloseBtn").click();
    document.getElementById("circleImgInModal").style.display = "none";
    document.getElementById("highScoreTexts").style.display = "block";
    document.getElementById("highScoreTitle").innerHTML = stringMapping["{" + range + "Top3}"];
    document.getElementById("highScoreFirst").innerHTML = top3Scores[0];
    document.getElementById("highScoreSecond").innerHTML = top3Scores[1];
    document.getElementById("highScoreThird").innerHTML = top3Scores[2];
    document.getElementById("highScoreModalBtn").click();
}

function getTop3HighScoreInRange(range) {
    var scoresInRange = [];
    switch (range) {
        case "today":
            var today = new Date().toISOString().slice(0, 10);
            for (var i = 0; i < scoreHistory.length; i++) {
                if (scoreHistory[i][0] == today) {
                    scoresInRange.push(scoreHistory[i][1]);
                }
            }
            break;
        case "monthly":
            var thisMonth = new Date().toISOString().slice(0, 7);
            for (var i = 0; i < scoreHistory.length; i++) {
                if (scoreHistory[i][0].indexOf(thisMonth) != -1) {
                    scoresInRange.push(scoreHistory[i][1]);
                }
            }
            break;
        case "overall":
            for (var i = 0; i < scoreHistory.length; i++) {
                scoresInRange.push(scoreHistory[i][1]);
            }
            break;
    }
    scoresInRange.sort();
    scoresInRange.reverse();
    while (scoresInRange.length < 3) {
        scoresInRange.push("-");
    }
    return scoresInRange.slice(0, 3);
}