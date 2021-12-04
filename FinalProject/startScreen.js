function drawStartScreen() {
  startScreenTimer++;

  //Show creator
  if (startScreenTimer >= 40 && startScreenTimer < 150) {
    if (soundOn && !introNoise.isPlaying()) {
      introNoise.play();
    }
    textFont(titleFont);
    textSize(100);
    strokeWeight(8);
    stroke(0);
    fill(255);
    text("CREATED BY", 165, 300);
  }
  if (startScreenTimer >= 70 && startScreenTimer < 150) {
    text("RYAN LANDRY", 130, 400);
    strokeWeight(1);
  }
  //Make bears walk across the screen
  if (startScreenTimer >= 150) {
    if (abs(startingBrownBear.position.x - width / 8) < 2 && stopTimer < 10) {
      stopTimer++;
      startingBrownBear.walkRight = 0;
      startingBrownBear.movingRight = false;
    } else if (
      abs(startingBrownBear.position.x - (3 * width) / 8) < 2 &&
      stopTimer < 10
    ) {
      stopTimer++;
      startingBrownBear.walkRight = 0;
      startingBrownBear.movingRight = false;
    } else if (abs(startingBrownBear.position.x - (4 * width) / 9) < 2) {
      startingBrownBear.walkRight = 0;
      startingBrownBear.movingRight = false;
    } else {
      stopTimer = 0;
      startingBrownBear.walkRight = 1;
      startingBrownBear.movingRight = true;
    }
    if (abs(startingBrownBear.position.x - (4 * width) / 9) < 2) {
      if (
        abs(startingBlackBear.position.x - (7 * width) / 8) < 2 &&
        stopTimer < 10
      ) {
        stopTimer++;
        startingBlackBear.walkLeft = 0;
        startingBlackBear.movingLeft = false;
      } else if (
        abs(startingBlackBear.position.x - (5 * width) / 8) < 2 &&
        stopTimer < 10
      ) {
        stopTimer++;
        startingBlackBear.walkLeft = 0;
        startingBlackBear.movingLeft = false;
      } else if (abs(startingBlackBear.position.x - (5 * width) / 9) < 2) {
        stopTimer++;
        startingBlackBear.walkLeft = 0;
        startingBlackBear.movingLeft = false;
      } else {
        stopTimer = 0;
        startingBlackBear.walkLeft = 1;
        startingBlackBear.movingLeft = true;
      }
    }
    startingBrownBear.update();
    startingBlackBear.update();
  }
  //Draw each season
  if (startingBrownBear.position.x > width / 8 - 2) {
    drawFall();
  }
  if (startingBrownBear.position.x > (3 * width) / 8 - 2) {
    drawWinter();
  }
  if (startingBlackBear.position.x < (5 * width) / 8 + 2) {
    drawSpring();
  }
  if (startingBlackBear.position.x < (7 * width) / 8 + 2) {
    drawSummer();
  }
  if (
    abs(startingBrownBear.position.x - (4 * width) / 9) < 2 &&
    abs(startingBlackBear.position.x - (5 * width) / 9) < 2
  ) {
    textFont(titleFont);
    textSize(150);
    strokeWeight(8);
    stroke(0);
    fill(255);
    if (seasonX < 50) {
      seasonX += 30;
    }
    if (sprintX > 300) {
      sprintX -= 30;
    }
    text("SEASON", seasonX, 150);
    text("SPRINT", sprintX, 300);
    textSize(40);
    strokeWeight(1);
  }
  //Draw text buttons
  if (seasonX >= 50 && sprintX <= 300) {
    introNoise.stop();
    strokeWeight(8);

    text("HOW TO PLAY", 290, 430);
    text("OPTIONS", 340, 500);
    text("START", 350, 570);
    strokeWeight(1);
    noFill();
  }
  startingBrownBear.draw();
  startingBlackBear.draw();
}