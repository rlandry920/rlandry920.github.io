var slideLog1, slideLog2;
var slideOpenButton1;
var fallButtons;
var leafTokens;
var fallRabbits;
var fallPortal;
var fallScore;
var fallPortalOpen;

//Init variables for fall level
function setupFall() {
  //Logs that move side to side
  slideLog1 = new woodBlock(635, 540);
  slideLog2 = new woodBlock(715, 540);

  //Logs that move up and down
  upLog1 = new woodBlock(315, 380);
  upLog2 = new woodBlock(395, 380);

  woodBlocks.push(slideLog1);
  woodBlocks.push(slideLog2);
  woodBlocks.push(upLog1);
  woodBlocks.push(upLog2);

  //Create buttons for the level
  fallButtons = [];
  slideOpenButton1 = new moveButton(350, 652.5, color(255, 0, 0));
  slideOpenButton2 = new moveButton(100, 532.5, color(255, 0, 0));

  upButton1 = new moveButton(750, 172.5, color(0, 255, 0));
  upButton2 = new moveButton(200, 412.5, color(0, 255, 0));

  fallButtons.push(slideOpenButton1);
  fallButtons.push(slideOpenButton2);
  fallButtons.push(upButton1);
  fallButtons.push(upButton2);

  //Create portal for the level in the top left hand corner
  fallPortal = new portal(10, 30);
  fallScore = 0;

  leafTokens = [];

  //The player's x can not be greater than 800
  maxPlayerX = 800;

  //Create rabbits for the level
  fallRabbits = [];
  fallRabbits.push(new rabbit(100, 382, 1, 15, 220));
  fallRabbits.push(new rabbit(600, 382, -1, 490, width - 15));

  fallPortalOpen = false;
}

function drawFall() {
  drawGradient(fall1, fall2, 0, width / 4, 0, height);
  for (var i = 0; i < leaves.length; i++) {
    leaves[i].draw();
    leaves[i].fall();
  }
}

function drawFallLevel() {
  background(31, 61, 12);
  //Draw level screen first
  if (fallLevelCount < 100) {
    fallLevelCount++;
    textFont(titleFont);
    textSize(80);
    strokeWeight(8);
    stroke(0);
    fill(255);
    text("LEVEL 1 - FALL", 180, 350);
    strokeWeight(1);
  } else {
    //Play jungle music
    if (!jungleNoise.isPlaying() && soundOn) {
      jungleNoise.play();
    }
    //Draw level after
    fallLevelCount++;
    if (!gameTimerStarted) {
      livesLeft = lives;
      gameTimer = timeLimit * 60;
      gameTimerStarted = true;
    }
    //Decrease timer for the game
    if (fallLevelCount % 60 == 0) {
      gameTimer--;
      checkTime();
    }
    //Draw logs
    for (i = 0; i < woodBlocks.length; i++) {
      woodBlocks[i].draw();
    }
    //Draw leaves
    for (i = 0; i < leafTokens.length; i++) {
      if (!leafTokens[i].hit) {
        leafTokens[i].draw();
        leafTokens[i].checkHit();
      }
    }
    //Draw buttons
    for (i = 0; i < fallButtons.length; i++) {
      fallButtons[i].draw();
      fallButtons[i].checkHit();
    }

    //Draw rabbits
    for (i = 0; i < fallRabbits.length; i++) {
      fallRabbits[i].draw();
      fallRabbits[i].move();
      fallRabbits[i].checkHit();
    }

    //Draw brown bear if it hasn't already gone through the portal
    if (!brownBearPlayer.portal) {
      if (brownBearPlayer.hitTimer == 0 || brownBearPlayer.shouldDraw) {
        brownBearPlayer.draw();
      }
      brownBearPlayer.update();
    }

    //Draw black bear if it hasn't already gone through the portal
    if (!blackBearPlayer.portal) {
      if (blackBearPlayer.hitTimer == 0 || blackBearPlayer.shouldDraw) {
        blackBearPlayer.draw();
      }
      blackBearPlayer.update();
    }

    drawTimer();
    drawLives();
    checkTime();
    checkLives();

    //Move logs
    if (
      slideLog1.x < width + 40 &&
      (slideOpenButton1.pressed || slideOpenButton2.pressed)
    ) {
      slideLog1.x += 3;
      slideLog2.x += 3;
    } else if (
      slideLog1.x != 635 &&
      !(slideOpenButton1.pressed || slideOpenButton2.pressed)
    ) {
      slideLog1.x -= 3;
      slideLog2.x -= 3;
    }

    if (upLog1.y != 380 && !(upButton1.pressed || upButton2.pressed)) {
      upLog1.y += 1;
      upLog2.y += 1;
    } else if (upLog1.y != 180 && (upButton1.pressed || upButton2.pressed)) {
      upLog1.y -= 1;
      upLog2.y -= 1;
    }

    //Open portal after all leaves have been collected
    if (fallScore == leafTokens.length) {
      fallPortal.draw();
      fallPortal.checkHit();
      if (!fallPortalOpen) {
        if (soundOn) {
          portalOpenNoise.play();
        }
        fallPortalOpen = true;
      }
    }

    //Go to next level after both bears have entered the portal
    //Reset everything before next level
    if (brownBearPlayer.portal && blackBearPlayer.portal) {
      currLevel++;
      maxPlayerX = 1200;
      blackBearPlayer.position.x = 30;
      blackBearPlayer.position.y = height - 75;
      brownBearPlayer.position.x = 80;
      brownBearPlayer.position.y = height - 75;
      blackBearPlayer.hitTimer = 0;
      brownBearPlayer.hitTimer = 0;
      blackBearPlayer.portal = false;
      brownBearPlayer.portal = false;
      jungleNoise.stop();
    }
  }
}
