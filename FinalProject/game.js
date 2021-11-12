let fall1, fall2, winter1, winter2, spring1, spring2, summer1, summer2;
let startScreenTimer, stopTimer;
let snowflakes, raindrops, leaves, rays;
let leafImg;
let showInstructions, startGame;
let seasonX, sprintX;
let startingBrownBear, startingBlackBear;
var gravity, walkForce, backForce, jumpForce;
var sampleBrownBear, sampleBlackBear, sampleRabbit, sampleButton, samplePortal;
var wasd, arrows;
var timeLimit, lives, soundOn;
var instructionsCount, fallLevelCount;
var howToPlayPage;
var currLevel = 0;

var woodBlocks;

var blocks;
var brownBearPlayer, blackBearPlayer, wasdPlayer, arrowPlayer;
var gameTimerStarted, gameTimer;
var livesLeft;

function setup() {
  frameRate(60);
  rectMode(CENTER);
  createCanvas(800, 700);
  //Gradient colors for each season
  fall1 = color(156, 39, 6);
  fall2 = color(242, 188, 46);
  winter1 = color(35, 119, 164);
  winter2 = color(217, 236, 243);
  spring1 = color(245, 128, 143);
  spring2 = color(147, 198, 78);
  summer1 = color(255, 202, 39);
  summer2 = color(243, 246, 167);
  snowflakes = [];
  raindrops = [];
  leaves = [];
  rays = [];
  //Create falling objects for each season
  for (var i = 0; i < 10; i++) {
    leaves.push(new leaf(random(0, width / 4 - 30), (height / 10) * -i));
    snowflakes.push(
      new snowflake(random(width / 4 + 10, width / 2 - 10), (height / 10) * -i)
    );
    raindrops.push(
      new raindrop(
        random(width / 2 + 10, (3 * width) / 4 - 10),
        (height / 10) * -i
      )
    );
    rays.push(
      new ray(random((3 * width) / 4 + 10, width - 10), (height / 10) * -i)
    );
  }
  startScreenTimer = 0;
  stopTimer = 0;
  seasonX = -200;
  sprintX = 1200;

  //Game screen variables
  showInstructions = false;
  showOptions = false;
  startGame = false;

  //Start with page 1 of how to play
  howToPlayPage = 1;

  startingBrownBear = new brownBear(-100, 665);
  startingBlackBear = new blackBear(900, 665);
  sampleBrownBear = new brownBear(200, 400);
  sampleBlackBear = new blackBear(200, 400);
  sampleRabbit = new rabbit(80, 500);
  samplePortal = new portal(60, 350);
  sampleButton = new moveButton(100, 160, color(255, 0, 0));
  instructionsCount = 0;
  fallLevelCount = 0;

  //Options variables
  brownBearArrows = true;
  soundOn = true;
  timeLimit = 5;
  lives = 3;

  gravity = new p5.Vector(0, 0.15);
  walkForce = new p5.Vector(3, 0);
  backForce = new p5.Vector(-3, 0);
  jumpForce = new p5.Vector(0, -6);

  //Game variables
  woodBlocks = [];
  blocks = [woodBlocks];
  brownBearPlayer = new brownBear(80, height - 75);
  arrowPlayer = brownBearPlayer;
  blackBearPlayer = new blackBear(30, height - 75);
  wasdPlayer = blackBearPlayer;
  gameTimerStarted = false;
  gameTimer = 0;

  setupFall();
  initTilemap();
}

//Load in all images and fonts
function preload() {
  leafImg = loadImage("../images/leaf.png");
  woodBlockImg = loadImage("../images/log.png");
  heartImg = loadImage("../images/heart.png");
  portalImg = loadImage("../images/portal.png");
  titleFont = loadFont("../assets/webfonts/JungleAdventurer.ttf");
}

//Create tilemaps for each level
function initTilemap() {
  for (var i = 0; i < fallTilemap.length; i++) {
    for (var j = 0; j < fallTilemap[i].length; j++) {
      switch (fallTilemap[i][j]) {
        case "w": //If its a blue Wall
          woodBlocks.push(new woodBlock(j * 40 - 5, i * 40 + 20));
          break;
        case "l":
          leafTokens.push(new leaf(j * 40, i * 40 + 15));
          break;
      }
    }
  }
}

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
  }
  //Change time limit
  if (
    xCor >= 380 &&
    xCor <= 420 &&
    yCor >= 370 &&
    yCor < 390 &&
    showOptions &&
    timeLimit > 0
  ) {
    timeLimit--;
  } else if (
    xCor >= 380 &&
    xCor <= 420 &&
    yCor >= 375 &&
    yCor < 385 &&
    showOptions &&
    timeLimit == 0
  ) {
    timeLimit = 10;
  } else if (
    xCor >= 730 &&
    xCor <= 770 &&
    yCor >= 360 &&
    yCor < 400 &&
    showOptions &&
    timeLimit < 10
  ) {
    timeLimit++;
  } else if (
    xCor >= 730 &&
    xCor <= 770 &&
    yCor >= 360 &&
    yCor < 400 &&
    showOptions &&
    timeLimit == 10
  ) {
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
    lives--;
  } else if (
    xCor >= 380 &&
    xCor <= 420 &&
    yCor >= 475 &&
    yCor < 485 &&
    showOptions &&
    lives == 1
  ) {
    lives = 5;
  } else if (
    xCor >= 730 &&
    xCor <= 770 &&
    yCor >= 460 &&
    yCor < 500 &&
    showOptions &&
    lives < 5
  ) {
    lives++;
  } else if (
    xCor >= 730 &&
    xCor <= 770 &&
    yCor >= 460 &&
    yCor < 500 &&
    showOptions &&
    lives == 5
  ) {
    lives = 1;
  }
  //Change sound
  if (xCor >= 550 && xCor <= 610 && yCor >= 570 && yCor < 590 && showOptions) {
    soundOn = !soundOn;
  }
  if (xCor >= 330 && xCor <= 470 && yCor >= 630 && yCor < 690 && showOptions) {
    showOptions = false;
  }
  //Go back to main menu
  if (
    xCor >= 330 &&
    xCor <= 470 &&
    yCor >= 630 &&
    yCor < 690 &&
    showInstructions
  ) {
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
    howToPlayPage = 1;
  }
}

function draw() {
  background(86, 125, 70);
  //Draw game based on level
  if (startGame) {
    if (currLevel == 0) {
      drawFallLevel();
    }
  } else if (showInstructions) {
    drawHowToPlay();
  } else if (showOptions) {
    drawOptions();
  } else {
    drawStartScreen();
  }
}

function drawStartScreen() {
  startScreenTimer++;

  //Show creator
  if (startScreenTimer >= 40 && startScreenTimer < 150) {
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

//Draw instructions
function drawHowToPlay() {
  instructionsCount++;
  if (instructionsCount > 100) {
    instructionsCount = 0;
    sampleButton.pressed = !sampleButton.pressed;
  }

  textFont(titleFont);
  textSize(80);
  strokeWeight(8);
  stroke(0);
  fill(255);
  text("HOW TO PLAY", 180, 80);
  if (howToPlayPage == 1) {
    textSize(40);
    text("Use arrow keys and W,A,S,D to move the 2 players", 500, 150, 600);
    text(
      "The bears must work together to get to the end and complete each level before time runs out",
      500,
      300,
      600
    );
    text(
      "Watch out for the evil bunnies! If they hit you, you lose a life",
      500,
      500,
      600
    );
    strokeWeight(1);
    fill(150);
    rect(80, 140, 35, 35);
    rect(40, 180, 35, 35);
    rect(120, 180, 35, 35);
    rect(80, 180, 35, 35);
    fill(100);

    //Hightlight different keys
    if (instructionsCount >= 0 && instructionsCount < 25) {
      rect(80, 140, 35, 35);
    } else if (instructionsCount >= 25 && instructionsCount < 50) {
      rect(40, 180, 35, 35);
    } else if (instructionsCount >= 50 && instructionsCount < 75) {
      rect(120, 180, 35, 35);
    } else if (instructionsCount >= 75 && instructionsCount < 100) {
      rect(80, 180, 35, 35);
    }

    stroke(255);
    fill(255);
    line(80, 150, 80, 140);
    line(50, 180, 40, 180);
    line(110, 180, 120, 180);
    line(80, 180, 80, 170);
    noStroke();
    triangle(75, 180, 85, 180, 80, 185);
    triangle(75, 140, 85, 140, 80, 135);
    triangle(120, 175, 120, 185, 125, 180);
    triangle(40, 175, 40, 185, 35, 180);

    //Draw sample characters
    sampleBlackBear.position.x = 50;
    sampleBrownBear.position.x = 110;
    sampleBlackBear.position.y = 340;
    sampleBrownBear.position.y = 340;
    sampleBrownBear.draw();
    sampleBlackBear.draw();
    sampleRabbit.draw();
  }
  //Draw second page of instructions
  else if (howToPlayPage == 2) {
    textSize(40);
    text(
      "Stand on buttons that will help you navigate through the map",
      500,
      150,
      600
    );
    text(
      "Once you have collected all of the tokens for that season, a portal will open up and both bears have to walk through to get to the next level",
      500,
      300,
      600
    );
    samplePortal.draw();
    sampleButton.draw();
  }

  stroke(0);
  strokeWeight(4);
  fill(255, 255, 0);
  triangle(420, 580, 420, 620, 450, 600);
  triangle(380, 580, 380, 620, 350, 600);
  strokeWeight(8);
  stroke(0);
  fill(255);
  textSize(60);
  text("BACK", 337, 680);
  strokeWeight(1);
}

function drawOptions() {
  textFont(titleFont);
  textSize(80);
  strokeWeight(8);
  stroke(0);
  fill(255);
  text("OPTIONS", 270, 80);
  textSize(60);
  text("SWAP", 330, 200);
  text("TIME LIMIT", 50, 400);
  text("LIVES", 50, 500);
  text("SOUND", 50, 600);
  text("ON", 450, 600);
  text("OFF", 650, 600);

  text("BACK", 337, 680);

  textAlign(CENTER);

  //Allow user to change time limit
  let timeText = "";
  if (timeLimit == 0) {
    timeText = "NONE";
  } else if (timeLimit == 1) {
    timeText = timeLimit + " MINUTE";
  } else {
    timeText = timeLimit + " MINUTES";
  }
  text(timeText, 590, 400, 400);
  text(lives, 590, 500, 400);
  textAlign(LEFT);
  textSize(40);
  text("WASD", 100, 280);
  text("ARROWS", 580, 280);

  noStroke();
  fill(255, 255, 0);
  rect(400, 380, 40, 10, 5);
  rect(750, 380, 40, 10, 5);
  rect(750, 380, 10, 40, 5);
  rect(400, 480, 40, 10, 5);
  rect(750, 480, 40, 10, 5);
  rect(750, 480, 10, 40, 5);
  rect(580, 580, 40, 10, 5);

  //Allow user to turn sound on and off
  fill(255);
  if (soundOn) {
    circle(560, 580, 20);
  } else {
    circle(600, 580, 20);
  }

  stroke(0);

  strokeWeight(8);
  line(310, 180, 280, 180);
  line(280, 180, 290, 165);
  line(280, 180, 290, 195);
  line(490, 180, 520, 180);
  line(520, 180, 510, 165);
  line(520, 180, 510, 195);

  strokeWeight(1);
  noFill();
  if (brownBearArrows) {
    sampleBlackBear.position.x = 150;
    sampleBrownBear.position.x = 650;
  } else {
    sampleBrownBear.position.x = 150;
    sampleBlackBear.position.x = 650;
  }
  sampleBlackBear.position.y = 180;
  sampleBrownBear.position.y = 180;
  sampleBrownBear.draw();
  sampleBlackBear.draw();
}

function drawGradient(color1, color2, x1, x2, y1, y2) {
  noFill();
  for (let i = y1; i <= y2; i++) {
    let inter = map(i, 0, y2, 0, 1);
    let c = lerpColor(color1, color2, inter);
    stroke(c);
    line(x1, i, x2, i);
  }
}

//Draw winter intro
function drawWinter() {
  drawGradient(winter1, winter2, width / 4, width / 2, 0, height);
  for (var i = 0; i < snowflakes.length; i++) {
    snowflakes[i].draw();
    snowflakes[i].fall();
  }
}

//Draw spring intro
function drawSpring() {
  drawGradient(spring1, spring2, width / 2, (3 * width) / 4, 0, height);
  for (i = 0; i < raindrops.length; i++) {
    raindrops[i].draw();
    raindrops[i].fall();
  }
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

//Draw game timer at the top of the screen
//It shows the time left in minutes and seconds
function drawTimer() {
  textFont(titleFont);
  textSize(30);
  strokeWeight(8);
  stroke(0);
  fill(255);
  var time = "";
  var min = int(gameTimer / 60);
  var sec = gameTimer % 60;
  if (sec < 10) {
    time = min + ":0" + sec;
  } else {
    time = min + ":" + sec;
  }
  if (min == 0) {
    fill(255, 0, 0);
  }
  text("Time left: " + time, 330, 40);
  strokeWeight(1);
}

//Draw hearts that represent how many lives are left
function drawLives() {
  if (livesLeft > 0) {
    image(heartImg, 680, 10, 30, 30);
  }
  if (livesLeft > 1) {
    image(heartImg, 720, 10, 30, 30);
  }
  if (livesLeft > 2) {
    image(heartImg, 760, 10, 30, 30);
  }
}
