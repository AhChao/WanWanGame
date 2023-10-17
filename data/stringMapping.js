var stringMapping = {
    "{title}": "出門溜Go",
    "{rule}": "遊玩方法",
    "{ruleDesc}": "用左右控制你的飛盤，按下讓狗狗跑出去，<br>引誘一樣的狗狗去玩在一起，<br>吸引更大隻的狗狗吧！<br>小心別讓狗狗玩太瘋跑出草地區，遊戲就會結束囉！",
    "{score}": "分數",
    "{bestScore}": "最高分數",
    "{retryBtn}": "重來一次",
    "{mergeCircle}": "狗狗輪"
}

//Don't edit this part except you know what are you doing
function updateCustomizeStrings() {
    Object.keys(stringMapping).forEach(key => {
        window.document.body.outerHTML = window.document.body.outerHTML.replace(key, stringMapping[key]);
    });
    window.document.head.outerHTML = window.document.head.outerHTML.replace("{title}", stringMapping["{title}"]);
}