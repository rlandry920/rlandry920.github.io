var sunTokens;
var summerButtons;
var summerRabbits;
var summerPortal;
var summerScore;
var summerSlide1Block1, summerSlide1Block2, summerSlide1Block3;
var summerSlide1Button1,summerSlide1Button2, summerSlide2Button1, summerSlide2Button2;
var summerPortalOpen;

//Init variables for fall level
function setupSummer() {
  //Create buttons for the level
  summerButtons = [];

  //Create portal for the level in the top left hand corner
  summerPortal = new portal(10, 30);
  summerScore = 0;

  sunTokens = [];

  //Create rabbits for the level
  summerRabbits = [];
  summerRabbits.push(new chaseRabbit(500, 620, 1.5));

  //Reset so that neither of the bears are in the portal
  brownBearPlayer.portal = false;
  blackBearPlayer.portal = false;

  summerSlide1Block1 = new sandBlock(200, 540);
  summerSlide1Block2 = new sandBlock(200, 580);
  summerSlide1Block3 = new sandBlock(200, 620);
  summerSlide1Block4 = new sandBlock(520, 540);
  summerSlide1Block5 = new sandBlock(520, 580);
  summerSlide1Block6 = new sandBlock(520, 620);

  summerSlide2Block1 = new sandBlock(320, 420);
  summerSlide2Block2 = new sandBlock(360, 420);
  summerSlide2Block3 = new sandBlock(400, 420);

  sandBlocks.push(summerSlide1Block1);
  sandBlocks.push(summerSlide1Block2);
  sandBlocks.push(summerSlide1Block3);
  sandBlocks.push(summerSlide1Block4);
  sandBlocks.push(summerSlide1Block5);
  sandBlocks.push(summerSlide1Block6);

  sandBlocks.push(summerSlide2Block1);
  sandBlocks.push(summerSlide2Block2);
  sandBlocks.push(summerSlide2Block3);

  summerSlide1Button1 = new moveButton(380, 532.5, color(255, 0, 0));
    summerSlide1Button2 = new moveButton(80, 292.5, color(255, 0, 0));

    summerSlide2Button1 = new moveButton(380, 652.5, color(0, 255, 0));
    summerSlide2Button2 = new moveButton(720, 292.5, color(0, 255, 0));

  summerButtons.push(summerSlide1Button1);
    summerButtons.push(summerSlide1Button2);
    summerButtons.push(summerSlide2Button1);
    summerButtons.push(summerSlide2Button2);
  
  summerPortalOpen = false;

}

//Draw summer intro
function drawSummer() {
  drawGradient(summer1, summer2, (3 * width) / 4, width, 0, height);
  fill(254, 177, 37);
  stroke(255);
  arc(width, 0, 300, 250, PI / 2, PI, PIE);
  for (i = 0; i < rays.length; i++) {
    rays[i].draw();
    rays[i].fall();
  }
}
function drawSummerLevel() {

  background(247, 246, 183);
  //Draw level screen first
  if (summerLevelCount < 100) {
    summerLevelCount++;
    textFont(titleFont);
    textSize(80);
    strokeWeight(8);
    stroke(0);
    fill(255);
    text("LEVEL 4 - SUMMER", 110, 350);
    strokeWeight(1);
  } else {
        if (!waveNoise.isPlaying() && soundOn) {
    waveNoise.play();
  }
    //Draw level after
    summerLevelCount++;
    //Decrease timer for the game
    if (summerLevelCount % 60 == 0) {
      gameTimer--;
      //checkTime();
    }
    //Draw sand blocks
    for (i = 0; i < sandBlocks.length; i++) {
      sandBlocks[i].draw();
    }
    //Draw leaves
    for (i = 0; i < sunTokens.length; i++) {
      if (!sunTokens[i].hit) {
        sunTokens[i].draw();
        sunTokens[i].checkHit();
      }
    }

    //Move blocks based on buttons
    if (summerSlide1Button1.pressed || summerSlide1Button2.pressed) {
      if (summerSlide1Block3.y > 540) {
        summerSlide1Block1.y -= 2;
        summerSlide1Block2.y -= 2;
        summerSlide1Block3.y -= 2;
        summerSlide1Block4.y -= 2;
        summerSlide1Block5.y -= 2;
        summerSlide1Block6.y -= 2;
      }
    } else {
      if (summerSlide1Block3.y < 620) {
        summerSlide1Block1.y += 2;
        summerSlide1Block2.y += 2;
        summerSlide1Block3.y += 2;
        summerSlide1Block4.y += 2;
        summerSlide1Block5.y += 2;
        summerSlide1Block6.y += 2;
      }
    }
    
     //Move blocks based on buttons
    if (summerSlide2Button1.pressed || summerSlide2Button2.pressed) {
      if (summerSlide2Block3.y > 380) {
        summerSlide2Block1.y -= 2;
        summerSlide2Block2.y -= 2;
        summerSlide2Block3.y -= 2;
      }
    } else {
      if (summerSlide2Block3.y < 420) {
        summerSlide2Block1.y += 2;
        summerSlide2Block2.y += 2;
        summerSlide2Block3.y += 2;
      }
    }

    //Draw buttons
    for (i = 0; i < summerButtons.length; i++) {
      summerButtons[i].draw();
      summerButtons[i].checkHit();
    }

    //Draw rabbits
    for (i = 0; i < summerRabbits.length; i++) {
      summerRabbits[i].draw();
      summerRabbits[i].state[summerRabbits[i].currState].execute(summerRabbits[i]);
      summerRabbits[i].checkHit();
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
    if (summerScore == sunTokens.length) {
      summerPortal.draw();
      summerPortal.checkHit();
      if(!summerPortalOpen){
                if(soundOn){
        portalOpenNoise.play();
        }
        summerPortalOpen = true;
      }
    }

    //Go to next level after both bears have entered the portal
    if (brownBearPlayer.portal && blackBearPlayer.portal) {
      gameWon = true;
      blackBearPlayer.portal = false;
      brownBearPlayer.portal = false;
      if(soundOn){
        applauseNoise.play();
      }
    }
    drawTimer();
    drawLives();
        checkTime();
    checkLives();
  }
}
