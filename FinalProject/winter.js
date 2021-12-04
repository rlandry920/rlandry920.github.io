var snowflakeTokens;
var winterButtons;
var winterRabbits;
var winterPortal;
var winterScore;
var slideIce1Block1, slideIce1Block2, slideIceBlock3;
var slideOpen1Button1, slideOpen2Button1, slideOpen2Button2;
var slideIce2Dir, slideIce4Dir;
var winterPortalOpen;

//Init variables for fall level
function setupWinter() {
  //Create buttons for the level
  winterButtons = [];

  //Create portal for the level in the top left hand corner
  winterPortal = new portal(10, 30);
  winterScore = 0;

  snowflakeTokens = [];

  //Create rabbits for the level
  winterRabbits = [];

  //Reset so that neither of the bears are in the portal
  brownBearPlayer.portal = false;
  blackBearPlayer.portal = false;

  slideIce1Block1 = new iceBlock(280, 540);
  slideIce1Block2 = new iceBlock(280, 580);
  slideIce1Block3 = new iceBlock(280, 620);

  slideIce2Block1 = new iceBlock(400, 540);
  slideIce2Block2 = new iceBlock(440, 540);
  slideIce2Block3 = new iceBlock(480, 540);

  slideIce3Block1 = new iceBlock(760, 500);
  slideIce3Block2 = new iceBlock(760, 540);
  slideIce3Block3 = new iceBlock(760, 580);
  slideIce3Block4 = new iceBlock(760, 620);

  slideIce4Block1 = new iceBlock(960, 460);
  slideIce4Block2 = new iceBlock(1000, 460);
  slideIce4Block3 = new iceBlock(1040, 460);

  iceBlocks.push(slideIce1Block1);
  iceBlocks.push(slideIce1Block2);
  iceBlocks.push(slideIce1Block3);

  iceBlocks.push(slideIce2Block1);
  iceBlocks.push(slideIce2Block2);
  iceBlocks.push(slideIce2Block3);

  iceBlocks.push(slideIce3Block1);
  iceBlocks.push(slideIce3Block2);
  iceBlocks.push(slideIce3Block3);
  iceBlocks.push(slideIce3Block4);

  iceBlocks.push(slideIce4Block1);
  iceBlocks.push(slideIce4Block2);
  iceBlocks.push(slideIce4Block3);

  slideIce2Dir = 1;
  slideIce4Dir = 1;

  slideOpen1Button1 = new moveButton(60, 412.5, color(0, 255, 0));
  slideOpen2Button1 = new moveButton(580, 332.5, color(255, 0, 0));
  slideOpen2Button2 = new moveButton(780, 332.5, color(255, 0, 0));

  winterButtons.push(slideOpen1Button1);
  winterButtons.push(slideOpen2Button1);
  winterButtons.push(slideOpen2Button2);

  winterRabbits = [];
  winterRabbits.push(new chaseRabbit(500, 620, 1.5));
  winterRabbits.push(new chaseRabbit(1000, 620, 1.5));

  winterPortalOpen = false;
}

//Draw winter intro
function drawWinter() {
  drawGradient(winter1, winter2, width / 4, width / 2, 0, height);
  for (var i = 0; i < snowflakes.length; i++) {
    snowflakes[i].draw();
    snowflakes[i].fall();
  }
}

function drawWinterLevel() {
  background(2, 129, 214);
  //Draw level screen first
  if (winterLevelCount < 100) {
    winterLevelCount++;
    textFont(titleFont);
    textSize(80);
    strokeWeight(8);
    stroke(0);
    fill(255);
    text("LEVEL 2 - WINTER", 130, 350);
    strokeWeight(1);
  } else {
    if (!bellsNoise.isPlaying() && soundOn) {
      bellsNoise.play();
    }
    push();
    if (max(blackBearPlayer.position.x, brownBearPlayer.position.x) > 800) {
      translate(-400, 0);
    } else if (
      max(blackBearPlayer.position.x, brownBearPlayer.position.x) > 400
    ) {
      translate(
        400 - max(blackBearPlayer.position.x, brownBearPlayer.position.x),
        0
      );
    }
    //Draw level after
    winterLevelCount++;
    //Decrease timer for the game
    if (winterLevelCount % 60 == 0) {
      gameTimer--;
      //checkTime();
    }
    //Draw ice blocks
    for (i = 0; i < iceBlocks.length; i++) {
      iceBlocks[i].draw();
    }
    //Draw leaves
    for (i = 0; i < snowflakeTokens.length; i++) {
      if (!snowflakeTokens[i].hit) {
        snowflakeTokens[i].draw();
        snowflakeTokens[i].checkHit();
      }
    }

    //Move blocks based on buttons
    if (slideIce1Block1.y > 460 && slideOpen1Button1.pressed) {
      slideIce1Block1.y -= 2;
      slideIce1Block2.y -= 2;
      slideIce1Block3.y -= 2;
    } else if (slideIce1Block3.y != 620 && !slideOpen1Button1.pressed) {
      slideIce1Block1.y += 2;
      slideIce1Block2.y += 2;
      slideIce1Block3.y += 2;
    }

    if (slideIce2Block1.y < 340 || slideIce2Block1.y > 540) {
      slideIce2Dir *= -1;
    }
    slideIce2Block1.y += slideIce2Dir * 3;
    slideIce2Block2.y += slideIce2Dir * 3;
    slideIce2Block3.y += slideIce2Dir * 3;

    if (slideOpen2Button1.pressed) {
      if (slideIce3Block2.x > 720) {
        slideIce3Block2.x -= 2;
      }
      if (slideIce3Block3.x > 680) {
        slideIce3Block3.x -= 2;
      }
      if (slideIce3Block4.x > 640) {
        slideIce3Block4.x -= 2;
      }
    } else {
      if (slideIce3Block2.x < 760) {
        slideIce3Block2.x += 2;
      }
      if (slideIce3Block3.x < 760) {
        slideIce3Block3.x += 2;
      }
      if (slideIce3Block4.x < 760) {
        slideIce3Block4.x += 2;
      }
    }

    if (slideOpen2Button2.pressed) {
      if (slideIce3Block2.x < 800) {
        slideIce3Block2.x += 2;
      }
      if (slideIce3Block3.x < 840) {
        slideIce3Block3.x += 2;
      }
      if (slideIce3Block4.x < 880) {
        slideIce3Block4.x += 2;
      }
    } else {
      if (slideIce3Block2.x > 760) {
        slideIce3Block2.x -= 2;
      }
      if (slideIce3Block3.x > 760) {
        slideIce3Block3.x -= 2;
      }
      if (slideIce3Block4.x > 760) {
        slideIce3Block4.x -= 2;
      }
    }

    if (slideIce4Block1.y < 260 || slideIce4Block1.y > 540) {
      slideIce4Dir *= -1;
    }
    slideIce4Block1.y += slideIce4Dir * 3;
    slideIce4Block2.y += slideIce4Dir * 3;
    slideIce4Block3.y += slideIce4Dir * 3;

    //Draw buttons
    for (i = 0; i < winterButtons.length; i++) {
      winterButtons[i].draw();
      winterButtons[i].checkHit();
    }

    //Draw rabbits
    for (i = 0; i < winterRabbits.length; i++) {
      winterRabbits[i].draw();
      winterRabbits[i].state[winterRabbits[i].currState].execute(
        winterRabbits[i]
      );
      winterRabbits[i].checkHit();
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

    //Open portal after all leaves have been collected
    if (winterScore == snowflakeTokens.length) {
      winterPortal.draw();
      winterPortal.checkHit();
      if (!winterPortalOpen) {
        if (soundOn) {
          portalOpenNoise.play();
        }
        winterPortalOpen = true;
      }
    }

    //Go to next level after both bears have entered the portal
    if (brownBearPlayer.portal && blackBearPlayer.portal) {
      currLevel++;
      maxPlayerX = 800;
      blackBearPlayer.position.x = 30;
      blackBearPlayer.position.y = height - 75;
      brownBearPlayer.position.x = 80;
      brownBearPlayer.position.y = height - 75;
      blackBearPlayer.hitTimer = 0;
      brownBearPlayer.hitTimer = 0;
      blackBearPlayer.portal = false;
      brownBearPlayer.portal = false;
      bellsNoise.stop();
    }
    pop();
    drawTimer();
    drawLives();
    checkTime();
    checkLives();
  }
}
