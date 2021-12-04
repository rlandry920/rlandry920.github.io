var raindropTokens;
var springButtons;
var springRabbits;
var springPortal;
var springScore;
var springSlide1Button1,
  springSlide1Button2,
  springSlide2Button1,
  springSlide3Button1,
  springSlide3Button2;
var springSlide1Block1,
  springSlide1Block2,
  springSlide1Block3,
  springSlide1Block4,
  springSlide1Block5,
  springSlide1Block6,
  springSlide1Block7,
  springSlide1Block8,
  springSlide1Block9,
  springSlide1Block10,
  springSlide2Block1,
  springSlide2Block2,
  springSlide2Block3,
  springSlide3Block1,
  springSlide3Block;
var springSlide2Dir = 3;
var springPortalOpen;

//Init variables for fall level
function setupSpring() {
  //Create buttons for the level
  springButtons = [];

  //Create portal for the level in the top left hand corner
  springPortal = new portal(10, -670);
  springScore = 0;

  raindropTokens = [];

  //Create rabbits for the level
  springRabbits = [];
  springRabbits.push(new chaseRabbit(500, 620, 1.5));
  springRabbits.push(new chaseRabbit(200, -20, 1.5));
  springRabbits.push(new chaseRabbit(600, -300, 1.5));

  //Reset so that neither of the bears are in the portal
  brownBearPlayer.portal = false;
  blackBearPlayer.portal = false;

  springSlide1Block1 = new grassBlock(1160, 540);
  springSlide1Block2 = new grassBlock(1120, 540);
  springSlide1Block3 = new grassBlock(1080, 540);
  springSlide1Block4 = new grassBlock(1040, 540);
  springSlide1Block5 = new grassBlock(1000, 540);
  springSlide1Block6 = new grassBlock(960, 540);
  springSlide1Block7 = new grassBlock(920, 540);
  springSlide1Block8 = new grassBlock(880, 540);
  springSlide1Block9 = new grassBlock(840, 540);
  springSlide1Block10 = new grassBlock(800, 540);

  springSlide2Block1 = new grassBlock(400, 300);
  springSlide2Block2 = new grassBlock(440, 300);
  springSlide2Block3 = new grassBlock(480, 300);

  springSlide3Block1 = new grassBlock(440, -100);
  springSlide3Block2 = new grassBlock(480, -100);

  grassBlocks.push(springSlide1Block1);
  grassBlocks.push(springSlide1Block2);
  grassBlocks.push(springSlide1Block3);
  grassBlocks.push(springSlide1Block4);
  grassBlocks.push(springSlide1Block5);
  grassBlocks.push(springSlide1Block6);
  grassBlocks.push(springSlide1Block7);
  grassBlocks.push(springSlide1Block8);
  grassBlocks.push(springSlide1Block9);
  grassBlocks.push(springSlide1Block10);

  grassBlocks.push(springSlide2Block1);
  grassBlocks.push(springSlide2Block2);
  grassBlocks.push(springSlide2Block3);

  grassBlocks.push(springSlide3Block1);
  grassBlocks.push(springSlide3Block2);

  springSlide1Button1 = new moveButton(300, 652.5, color(255, 0, 0));
  springSlide1Button2 = new moveButton(740, 412.5, color(255, 0, 0));

  springSlide2Button1 = new moveButton(225, 212.5, color(0, 255, 0));

  springSlide3Button1 = new moveButton(760, 12.5, color(0, 0, 255));
  springSlide3Button2 = new moveButton(300, -265.5, color(0, 0, 255));

  springButtons.push(springSlide1Button1);
  springButtons.push(springSlide1Button2);
  springButtons.push(springSlide2Button1);
  springButtons.push(springSlide3Button1);
  springButtons.push(springSlide3Button2);

  springPortalOpen = false;
}

//Draw spring intro
function drawSpring() {
  drawGradient(spring1, spring2, width / 2, (3 * width) / 4, 0, height);
  for (i = 0; i < raindrops.length; i++) {
    raindrops[i].draw();
    raindrops[i].fall();
  }
}

function drawSpringLevel() {
  background(255, 189, 213);
  //Draw level screen first
  if (springLevelCount < 100) {
    springLevelCount++;
    textFont(titleFont);
    textSize(80);
    strokeWeight(8);
    stroke(0);
    fill(255);
    text("LEVEL 3 - Spring", 130, 350);
    strokeWeight(1);
  } else {
    if (!rainNoise.isPlaying() && soundOn) {
      rainNoise.play();
    }
    push();
    if (min(blackBearPlayer.position.y, brownBearPlayer.position.y) < -350) {
      translate(0, 700);
    } else if (
      min(blackBearPlayer.position.y, brownBearPlayer.position.y) < 350
    ) {
      translate(
        0,
        -min(blackBearPlayer.position.y, brownBearPlayer.position.y) + 350
      );
    }
    //Draw level after
    springLevelCount++;
    //Decrease timer for the game
    if (springLevelCount % 60 == 0) {
      gameTimer--;
      //checkTime();
    }
    //Draw grass blocks
    for (i = 0; i < grassBlocks.length; i++) {
      grassBlocks[i].draw();
    }

    //Draw leaves
    for (i = 0; i < raindropTokens.length; i++) {
      if (!raindropTokens[i].hit) {
        raindropTokens[i].draw();
        raindropTokens[i].checkHit();
      }
    }

    //Move blocks based on buttons
    if (springSlide1Button1.pressed || springSlide1Button2.pressed) {
      if (springSlide1Block10.x > 400) {
        springSlide1Block1.x -= 2;
        springSlide1Block2.x -= 2;
        springSlide1Block3.x -= 2;
        springSlide1Block4.x -= 2;
        springSlide1Block5.x -= 2;
        springSlide1Block6.x -= 2;
        springSlide1Block7.x -= 2;
        springSlide1Block8.x -= 2;
        springSlide1Block9.x -= 2;
        springSlide1Block10.x -= 2;
      }
    } else {
      if (springSlide1Block10.x < 800) {
        springSlide1Block1.x += 2;
        springSlide1Block2.x += 2;
        springSlide1Block3.x += 2;
        springSlide1Block4.x += 2;
        springSlide1Block5.x += 2;
        springSlide1Block6.x += 2;
        springSlide1Block7.x += 2;
        springSlide1Block8.x += 2;
        springSlide1Block9.x += 2;
        springSlide1Block10.x += 2;
      }
    }

    if (springSlide2Block1.x < 300 || springSlide2Block3.x > 640) {
      springSlide2Dir *= -1;
    }

    if (!springSlide2Button1.pressed) {
      springSlide2Block1.x += springSlide2Dir;
      springSlide2Block2.x += springSlide2Dir;
      springSlide2Block3.x += springSlide2Dir;
    }

    if (springSlide3Button1.pressed || springSlide3Button2.pressed) {
      if (springSlide3Block1.y > -260) {
        springSlide3Block1.y -= 2;
        springSlide3Block2.y -= 2;
      }
    } else {
      if (springSlide3Block1.y < -60) {
        springSlide3Block1.y += 2;
        springSlide3Block2.y += 2;
      }
    }

    //Draw buttons
    for (i = 0; i < springButtons.length; i++) {
      springButtons[i].draw();
      springButtons[i].checkHit();
    }

    //Draw rabbits
    for (i = 0; i < springRabbits.length; i++) {
      springRabbits[i].draw();
      springRabbits[i].state[springRabbits[i].currState].execute(
        springRabbits[i]
      );
      springRabbits[i].checkHit();
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
    if (springScore == raindropTokens.length) {
      springPortal.draw();
      springPortal.checkHit();
      if (!springPortalOpen) {
        if (soundOn) {
          portalOpenNoise.play();
        }
        springPortalOpen = true;
      }
    }

    //Go to next level after both bears have entered the portal
    if (brownBearPlayer.portal && blackBearPlayer.portal) {
      currLevel++;
      blackBearPlayer.position.x = 30;
      blackBearPlayer.position.y = height - 75;
      brownBearPlayer.position.x = 80;
      brownBearPlayer.position.y = height - 75;
      blackBearPlayer.hitTimer = 0;
      brownBearPlayer.hitTimer = 0;
      blackBearPlayer.portal = false;
      brownBearPlayer.portal = false;
    }
    pop();
    drawTimer();
    drawLives();
    checkTime();
    checkLives();
  }
}
