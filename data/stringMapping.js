var stringMapping = {
    "{title}": "出門溜Go",
    "{rule}": "遊玩方法",
    "{ruleDesc}": "用左右控制你的飛盤，按下讓狗狗跑出去，<br>引誘一樣的狗狗去玩在一起，<br>吸引更大隻的狗狗吧！<br>小心別讓狗狗玩太瘋跑出草地區，遊戲就會結束囉！",
    "{score}": "分數",
    "{bestScore}": "最高分數",
    "{retryBtn}": "重新開始",
    "{mergeCircle}": "狗狗輪",
    "{next}": "Next",
    "{menu}": "選單",
    "{todayTop3}": "今日前 3 名",
    "{monthlyTop3}": "本月前 3 名",
    "{overallTop3}": "歷史前 3 名",
}

//Don't edit this part except you know what are you doing
function updateCustomizeStrings() {
    Object.keys(stringMapping).forEach(key => {
        document.documentElement.innerHTML = document.documentElement.innerHTML.replaceAll(key, stringMapping[key]);
        //window.document.body.outerHTML = window.document.body.outerHTML.replaceAll(key, stringMapping[key]);
    });
    //window.document.head.outerHTML = window.document.head.outerHTML.replace("{title}", stringMapping["{title}"]);
}