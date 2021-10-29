let fall1, fall2, winter1, winter2, spring1, spring2, summer1, summer2;
let startScreenTimer, stopTimer;
let snowflakes, raindrops, leaves, rays;
let leafImg;
let showInstructions, startGame;
let seasonX, sprintX;
let startingBrownBear, startingBlackBear;
var gravity, walkForce, backForce, jumpForce;
var sampleBrownBear, sampleBlackBear, sampleRabbit;
var wasd, arrows;
var timeLimit, lives, soundOn;

function setup() {
  frameRate(60);
  rectMode(CENTER);
  createCanvas(800, 700);
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
  showInstructions = false;
  showOptions = false;
  startGame = false;
  startingBrownBear = new brownBear(-100, 665);
  startingBlackBear = new blackBear(900, 665);
  sampleBrownBear = new brownBear(200, 400);
  sampleBlackBear = new blackBear(200, 400);
  sampleRabbit = new rabbit(80, 500);

  brownBearArrows = false;
  soundOn = true;
  timeLimit = 5;
  lives = 3;
  gravity = new p5.Vector(0, 0.1);
  walkForce = new p5.Vector(3, 0);
  backForce = new p5.Vector(-3, 0);
  jumpForce = new p5.Vector(0, -4);
}

function preload() {
  leafImg = loadImage("../images/leaf.png");
  titleFont = loadFont("../assets/webfonts/JungleAdventurer.ttf");
}

// function keyPressed() {
//   if (keyCode === RIGHT_ARROW) {
//     startingBrownBear.walkRight = 1;
//     startingBrownBear.movingRight = true;
//   }
//   if (keyCode === LEFT_ARROW) {
//     startingBrownBear.walkLeft = 1;
//     startingBrownBear.movingLeft = true;
//   }
//   if (keyCode === UP_ARROW && startingBrownBear.jump === 0) {
//     startingBrownBear.jump = 2;
//   }
// }

// function keyReleased() {
//   if (keyCode === RIGHT_ARROW || keyCode == 68) {
//     startingBrownBear.walkRight = 0;
//     startingBrownBear.movingRight = false;
//   } else if (keyCode === LEFT_ARROW || keyCode == 65) {
//     startingBrownBear.walkLeft = 0;
//     startingBrownBear.movingLeft = false;
//   }
// }

function mouseClicked() {
  var xCor = mouseX;
  var yCor = mouseY;
  //If the user clicks on the canvas while on the game screen, start the game
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
  if (xCor >= 320 && xCor <= 480 && yCor >= 155 && yCor < 205 && showOptions) {
    brownBearArrows = !brownBearArrows;
  }
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
  if (xCor >= 550 && xCor <= 610 && yCor >= 570 && yCor < 590 && showOptions) {
    soundOn = !soundOn;
  }
  if (xCor >= 330 && xCor <= 470 && yCor >= 630 && yCor < 690 && showOptions) {
    showOptions = false;
  }
  if (
    xCor >= 330 &&
    xCor <= 470 &&
    yCor >= 630 &&
    yCor < 690 &&
    showInstructions
  ) {
    showInstructions = false;
  }
}

function draw() {
  background(86, 125, 70);
  if (startGame) {
    drawGame();
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
  }
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
  if (seasonX >= 50 && sprintX <= 300) {
    strokeWeight(8);

    text("HOW TO PLAY", 290, 430);
    text("OPTIONS", 340, 500);
    text("START", 350, 570);
    strokeWeight(1);
    noFill();
  }
  startingBrownBear.draw();
  startingBrownBear.update();

  startingBlackBear.draw();
  startingBlackBear.update();
}

function drawHowToPlay() {
  textFont(titleFont);
  textSize(80);
  strokeWeight(8);
  stroke(0);
  fill(255);
  text("HOW TO PLAY", 180, 80);
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
  textSize(60);
  text("BACK", 337, 680);

  strokeWeight(1);
  fill(150);
  rect(80, 140, 35, 35);
  rect(40, 180, 35, 35);
  rect(120, 180, 35, 35);
  rect(80, 180, 35, 35);

  sampleBlackBear.position.x = 50;
  sampleBrownBear.position.x = 110;
  sampleBlackBear.position.y = 340;
  sampleBrownBear.position.y = 340;
  sampleBrownBear.draw();
  sampleBlackBear.draw();
  sampleRabbit.draw();
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
    sampleBrownBear.position.x = 150;
    sampleBlackBear.position.x = 650;
  } else {
    sampleBlackBear.position.x = 150;
    sampleBrownBear.position.x = 650;
  }
  sampleBlackBear.position.y = 180;
  sampleBrownBear.position.y = 180;
  sampleBrownBear.draw();
  sampleBlackBear.draw();
}

function drawGradient(color1, color2, x1, x2, y1, y2) {
  //Draw gradient for sunset
  noFill();
  for (let i = y1; i <= y2; i++) {
    let inter = map(i, 0, y2, 0, 1);
    let c = lerpColor(color1, color2, inter);
    stroke(c);
    line(x1, i, x2, i);
  }
}

function drawFall() {
  drawGradient(fall1, fall2, 0, width / 4, 0, height);
  for (var i = 0; i < leaves.length; i++) {
    leaves[i].draw();
    leaves[i].fall();
  }
}

function drawWinter() {
  drawGradient(winter1, winter2, width / 4, width / 2, 0, height);
  for (var i = 0; i < snowflakes.length; i++) {
    snowflakes[i].draw();
    snowflakes[i].fall();
  }
}

function drawSpring() {
  drawGradient(spring1, spring2, width / 2, (3 * width) / 4, 0, height);
  for (i = 0; i < raindrops.length; i++) {
    raindrops[i].draw();
    raindrops[i].fall();
  }
}

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
