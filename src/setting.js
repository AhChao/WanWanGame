//Will use the image as the background or not, path is img/ background/background.png
var setting_usingBackgroundImage = true;
//Will use the image as the ball or not, path is img/balls/1 ~ 11.png(ex. img/balls/1.png)
var setting_usingBallImage = true;
//If ball use the image, image too big or too small can use this value to change(Ball radius in game is fixed, wont be affected by this)
//-1 is the no use slot, please edit after that
//ball radius ratio for reference [-1, 0.08, 0.1, 0.14, 0.16, 0.18, 0.24, 0.32, 0.40, 0.48, 0.56, 0.64];
var setting_textureScale = [-1, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75];