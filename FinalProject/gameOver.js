var leftHeartA, middleHeartA, rightHeartA;
var gameOverCounter;
var gameOverBrownBear, gameOverBlackBear;
var gameOverBrownBearAngle, gameOverBlackBearAngle;
var gameOverBrownBearGhostX,
  gameOverBrownBearGhostY,
  gameOverBlackBearGhostX,
  gameOverBlackBearGhostY;
var ghostDir;
function setupGameOver() {
  leftHeartA = 0;
  rightHeartA = 0;
  middleHeartA = 0;
  gameOverCounter = 0;
  gameOverBrownBear = new brownBear(600, 500);
  gameOverBlackBear = new blackBear(200, 500);
  gameOverBrownBearAngle = 0;
  gameOverBlackBearAngle = 0;
  gameOverBrownBearGhostX = 150;
  gameOverBrownBearGhostY = 350;
  gameOverBlackBearGhostX = 450;
  gameOverBlackBearGhostY = 350;
  ghostDir = 1;
}

//Draw game over animation
function drawGameOver() {
  gameOverCounter++;
  //Make hearts fade out
  if (rightHeartA < 200) {
    rightHeartA += 10;
  }
  if (middleHeartA < 200 && rightHeartA == 200) {
    middleHeartA += 10;
  }
  if (leftHeartA < 200 && middleHeartA == 200) {
    leftHeartA += 10;
  }
  //Make bears fall over
  if (leftHeartA >= 200 && gameOverBrownBearAngle > -PI / 2) {
    gameOverBrownBearAngle -= PI / 100;
  }
  if (gameOverBrownBearAngle <= -PI / 2 && gameOverBlackBearAngle < PI / 2) {
    gameOverBlackBearAngle += PI / 100;
  }
  image(cloudBackgroundImg, 0, 0, width, height);
  textFont(titleFont);
  textSize(100);
  strokeWeight(8);
  stroke(255);
  fill(25, 37, 252);
  text("NO LIVES LEFT", 140, 150);
  fill(255);
  stroke(0);
  textSize(50);
  strokeWeight(7);
  text("RETURN TO MAIN MENU", 170, 650);
  strokeWeight(1);
  image(heartImg, 200, 250, 100, 100);
  image(heartImg, 350, 250, 100, 100);
  image(heartImg, 500, 250, 100, 100);
  noStroke();
  fill(146, 223, 243, leftHeartA);
  rect(250, 300, 100, 100);
  fill(146, 223, 243, middleHeartA);
  rect(400, 300, 100, 100);
  fill(146, 223, 243, rightHeartA);
  rect(550, 300, 100, 100);
  push();
  translate(gameOverBrownBear.position.x, gameOverBrownBear.position.y + 30);
  rotate(gameOverBrownBearAngle);
  translate(-gameOverBrownBear.position.x, -gameOverBrownBear.position.y - 30);
  gameOverBrownBear.draw();
  pop();
  push();
  translate(gameOverBlackBear.position.x, gameOverBlackBear.position.y + 30);
  rotate(gameOverBlackBearAngle);
  translate(-gameOverBlackBear.position.x, -gameOverBlackBear.position.y - 30);
  gameOverBlackBear.draw();
  pop();
  //Make ghosts appear and float upwards
  if (gameOverBlackBearAngle >= PI / 2) {
    image(ghostImg, gameOverBrownBearGhostX, gameOverBrownBearGhostY, 120, 140);
    image(ghostImg, gameOverBlackBearGhostX, gameOverBlackBearGhostY, 120, 140);

    gameOverBlackBearGhostY--;
    gameOverBrownBearGhostY--;
    gameOverBrownBearGhostX += ghostDir;
    gameOverBlackBearGhostX += ghostDir;

    if (gameOverCounter % 10 == 0) {
      ghostDir *= -1;
    }
  }
}
