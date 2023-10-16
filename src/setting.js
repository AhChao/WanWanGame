//Will use the image as the background or not, path is img/ background/background.png
var setting_usingBackgroundImage = true;
//Will use the image as the boundary or not, path is img/ background/boundary.png
//Default size is almost 30 * 600, the boundary.png is for left and right version, code will handle bottom one for you(rotate 90)
var setting_usingBoundaryImage = true;
var setting_textureScaleBoundary = [1, 1.55];

//Will use the image as the ball or not, path is img/balls/1 ~ 11.png(ex. img/balls/1.png)
var setting_usingBallImage = true;
//If ball use the image, image too big or too small can use this value to change(Ball radius in game is fixed, wont be affected by this)
//-1 is the no use slot, please edit after that
//ball radius ratio for reference [-1, 0.08, 0.1, 0.14, 0.16, 0.18, 0.24, 0.32, 0.40, 0.48, 0.56, 0.64];
var setting_textureScale = [-1, 0.04, 0.055, 0.08, 0.11, 0.107, 0.142, 0.21, 0.24, 0.3, 0.3, 0.435];

//Will display claw or not, path is img/ background/claw.png
var setting_displayClaw = true;
//Where to place claw, base is the center of the ball [x,y], left -> right, top -> bottom
var setting_clawRelativePosition = [-70, 0];
//Scale for the claw x,y
var setting_textureScaleClaw = [0.1, 0.1];

//Game reltaed parameter - only edit when you know what will be modifed, may cause game error if with wrong error
//The holding ball move distance by press <- and ->
var setting_movingScale = 15;
//
var setting_gridBase = 600;
var setting_globalSizeCoef = 1;