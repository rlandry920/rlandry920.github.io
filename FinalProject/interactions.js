//Move bears based on the keys
function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    arrowPlayer.walkRight = 1;
    arrowPlayer.movingRight = true;
  }
  if (keyCode === LEFT_ARROW) {
    arrowPlayer.walkLeft = 1;
    arrowPlayer.movingLeft = true;
  }
  if (keyCode === UP_ARROW && arrowPlayer.jump === 0) {
    if (soundOn) {
      jumpNoise.play();
    }
    arrowPlayer.jump = 2;
  }

  if (keyCode === 68) {
    wasdPlayer.walkRight = 1;
    wasdPlayer.movingRight = true;
  }
  if (keyCode === 65) {
    wasdPlayer.walkLeft = 1;
    wasdPlayer.movingLeft = true;
  }
  if (keyCode === 87 && wasdPlayer.jump === 0) {
    if (soundOn) {
      jumpNoise.play();
    }
    wasdPlayer.jump = 2;
  }
}

//Stop moving bears based on keys
function keyReleased() {
  if (keyCode === RIGHT_ARROW) {
    arrowPlayer.walkRight = 0;
    arrowPlayer.movingRight = false;
  } else if (keyCode === LEFT_ARROW) {
    arrowPlayer.walkLeft = 0;
    arrowPlayer.movingLeft = false;
  }

  if (keyCode === 68) {
    wasdPlayer.walkRight = 0;
    wasdPlayer.movingRight = false;
  } else if (keyCode === 65) {
    wasdPlayer.walkLeft = 0;
    wasdPlayer.movingLeft = false;
  }
}

function mouseClicked() {
  var xCor = mouseX;
  var yCor = mouseY;
  //If the user clicks on start on the game screen, start the game
  if (
    xCor >= 345 &&
    xCor <= 455 &&
    yCor >= 535 &&
    yCor < 575 &&
    !startGame &&
    !showOptions &&
    !showInstructions
  ) {
    if (soundOn) {
      buttonPressNoise.play();
    }
    startGame = true;
  }
  //If the user chooses to look at options
  if (
    xCor >= 330 &&
    xCor <= 470 &&
    yCor >= 465 &&
    yCor < 505 &&
    !startGame &&
    !showOptions &&
    !showInstructions
  ) {
    if (soundOn) {
      if (soundOn) {
        buttonPressNoise.play();
      }
    }
    showOptions = true;
  }
  //If the user chooses to look at instructions
  if (
    xCor >= 290 &&
    xCor <= 510 &&
    yCor >= 395 &&
    yCor < 435 &&
    !startGame &&
    !showOptions &&
    !showInstructions
  ) {
    if (soundOn) {
      buttonPressNoise.play();
    }
    showInstructions = true;
  }
  //Swap bears
  if (xCor >= 320 && xCor <= 480 && yCor >= 155 && yCor < 205 && showOptions) {
    brownBearArrows = !brownBearArrows;
    if (brownBearArrows) {
      arrowPlayer = brownBearPlayer;
      wasdPlayer = blackBearPlayer;
    } else {
      wasdPlayer = brownBearPlayer;
      arrowPlayer = blackBearPlayer;
    }
    if (soundOn) {
      buttonPressNoise.play();
    }
  }
  //Change time limit
  if (
    xCor >= 380 &&
    xCor <= 420 &&
    yCor >= 370 &&
    yCor < 390 &&
    showOptions &&
    timeLimit > 1
  ) {
    if (soundOn) {
      buttonPressNoise.play();
    }
    timeLimit--;
  } else if (
    xCor >= 380 &&
    xCor <= 420 &&
    yCor >= 375 &&
    yCor < 385 &&
    showOptions &&
    timeLimit == 1
  ) {
    if (soundOn) {
      buttonPressNoise.play();
    }
    timeLimit = 10;
  } else if (
    xCor >= 730 &&
    xCor <= 770 &&
    yCor >= 360 &&
    yCor < 400 &&
    showOptions &&
    timeLimit < 10
  ) {
    if (soundOn) {
      buttonPressNoise.play();
    }
    timeLimit++;
  } else if (
    xCor >= 730 &&
    xCor <= 770 &&
    yCor >= 360 &&
    yCor < 400 &&
    showOptions &&
    timeLimit == 10
  ) {
    if (soundOn) {
      buttonPressNoise.play();
    }
    timeLimit = 0;
  }
  //Change lives
  if (
    xCor >= 380 &&
    xCor <= 420 &&
    yCor >= 470 &&
    yCor < 490 &&
    showOptions &&
    lives > 1
  ) {
    if (soundOn) {
      buttonPressNoise.play();
    }
    lives--;
    print("A");
  } else if (
    xCor >= 380 &&
    xCor <= 420 &&
    yCor >= 475 &&
    yCor < 485 &&
    showOptions &&
    lives == 1
  ) {
    if (soundOn) {
      buttonPressNoise.play();
    }
    lives = 5;
  } else if (
    xCor >= 730 &&
    xCor <= 770 &&
    yCor >= 460 &&
    yCor < 500 &&
    showOptions &&
    lives < 5
  ) {
    if (soundOn) {
      buttonPressNoise.play();
    }
    lives++;
  } else if (
    xCor >= 730 &&
    xCor <= 770 &&
    yCor >= 460 &&
    yCor < 500 &&
    showOptions &&
    lives == 5
  ) {
    if (soundOn) {
      buttonPressNoise.play();
    }
    lives = 1;
  }
  //Change sound
  if (xCor >= 550 && xCor <= 610 && yCor >= 570 && yCor < 590 && showOptions) {
    soundOn = !soundOn;
    if (soundOn) {
      buttonPressNoise.play();
    }
  }
  if (xCor >= 330 && xCor <= 470 && yCor >= 630 && yCor < 690 && showOptions) {
    showOptions = false;
    if (soundOn) {
      if (soundOn) {
        buttonPressNoise.play();
      }
    }
  }
  //Go back to main menu
  if (
    xCor >= 330 &&
    xCor <= 470 &&
    yCor >= 630 &&
    yCor < 690 &&
    showInstructions
  ) {
    if (soundOn) {
      buttonPressNoise.play();
    }
    showInstructions = false;
  }
  //Go to second page of instructions
  if (
    xCor >= 420 &&
    xCor <= 450 &&
    yCor >= 580 &&
    yCor < 620 &&
    showInstructions
  ) {
    if (soundOn) {
      buttonPressNoise.play();
    }
    howToPlayPage = 2;
  }
  //Go to first page of instructions
  if (
    xCor >= 350 &&
    xCor <= 380 &&
    yCor >= 580 &&
    yCor < 620 &&
    showInstructions
  ) {
    if (soundOn) {
      buttonPressNoise.play();
    }
    howToPlayPage = 1;
  }
  rect(400, 630, 460, 70);
  //If the user hits the back button
  if (
    (gameWon || gameOver || timesUp) &&
    xCor >= 140 &&
    xCor <= 660 &&
    yCor >= 595 &&
    yCor < 665
  ) {
    if (soundOn) {
      buttonPressNoise.play();
      alarmNoise.stop();
      applauseNoise.stop();
      dieNoise.stop();
    }
    reset();
  }
}
