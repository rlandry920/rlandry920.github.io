let fall1, fall2, winter1, winter2, spring1, spring2, summer1, summer2;
let startScreenTimer, stopTimer;
let snowflakes, raindrops, leaves, rays;
let leafImg;
let showInstructions, startGame, timesUp, gameOver, gameWon;
let seasonX, sprintX;
let startingBrownBear, startingBlackBear;
var gravity, walkForce, backForce, jumpForce;
var sampleBrownBear, sampleBlackBear, sampleRabbit, sampleButton, samplePortal;
var wasd, arrows;
var timeLimit, lives, soundOn;
var instructionsCount,
  fallLevelCount,
  winterLevelCount,
  springLevelCount,
  winterLevelCount;
var howToPlayPage;
var currLevel;
var maxPlayerX;
var woodBlocks, iceBlocks, grassBlocks, sandBlocks;
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

  currLevel = 0;

  //Start with page 1 of how to play
  howToPlayPage = 1;

  //Start screen variables
  startingBrownBear = new brownBear(-100, 665);
  startingBlackBear = new blackBear(900, 665);
  sampleBrownBear = new brownBear(200, 400);
  sampleBlackBear = new blackBear(200, 400);
  sampleRabbit = new rabbit(80, 500);
  samplePortal = new portal(60, 350);
  sampleButton = new moveButton(100, 160, color(255, 0, 0));
  instructionsCount = 0;
  fallLevelCount = 0;
  winterLevelCount = 0;
  springLevelCount = 0;
  summerLevelCount = 0;

  //Options variables
  brownBearArrows = true;
  soundOn = true;
  timeLimit = 5;
  lives = 3;

  //Kinematics variables
  gravity = new p5.Vector(0, 0.15);
  walkForce = new p5.Vector(3, 0);
  backForce = new p5.Vector(-3, 0);
  jumpForce = new p5.Vector(0, -6);

  //Game variables
  woodBlocks = [];
  iceBlocks = [];
  grassBlocks = [];
  sandBlocks = [];
  blocks = [woodBlocks, iceBlocks, grassBlocks, sandBlocks];
  brownBearPlayer = new brownBear(80, height - 75);
  arrowPlayer = brownBearPlayer;
  blackBearPlayer = new blackBear(30, height - 75);
  wasdPlayer = blackBearPlayer;
  gameTimerStarted = false;
  gameTimer = 0;
  maxPlayerX = width;
  timesUp = false;
  gameOver = false;
  gameWon = false;

  setupFall();
  setupWinter();
  setupSpring();
  setupSummer();
  setupGameOver();
  setupGameWon();
  setupTimesUp();
  initTilemap();
}

//Load in all images and fonts
function preload() {
  leafImg = loadImage("../images/leaf.png");
  woodBlockImg = loadImage("../images/log.png");
  iceBlockImg = loadImage("../images/icecube.png");
  grassBlockImg = loadImage("../images/grass.png");
  sandBlockImg = loadImage("../images/sand.png");
  heartImg = loadImage("../images/heart.png");
  clockImg = loadImage("../images/clock.png");
  portalImg = loadImage("../images/portal.png");
  ghostImg = loadImage("../images/ghost.png");
  cloudBackgroundImg = loadImage("../images/clouds.jpg");
  titleFont = loadFont("../assets/webfonts/JungleAdventurer.ttf");
  jungleNoise = loadSound("../sounds/jungle.mp3");
  jungleNoise.setVolume(0.7);
  leafCrunchNoise = loadSound("../sounds/leaf_crunch.mp3");
  buttonClickNoise = loadSound("../sounds/button_click.mp3");
  dieNoise = loadSound("../sounds/die.mp3");
  dieNoise.setVolume(0.3);
  raindropNoise = loadSound("../sounds/raindrop.mp3");
  iceNoise = loadSound("../sounds/ice.mp3");
  sizzleNoise = loadSound("../sounds/sizzle.mp3");
  sizzleNoise.setVolume(0.3);
  jumpNoise = loadSound("../sounds/jump.mp3");
  applauseNoise = loadSound("../sounds/applause.mp3");
  alarmNoise = loadSound("../sounds/alarm.mp3");
  bellsNoise = loadSound("../sounds/bells.mp3");
  rainNoise = loadSound("../sounds/rain.mp3");
  waveNoise = loadSound("../sounds/waves.mp3");
  waveNoise.setVolume(0.6);
  buttonPressNoise = loadSound("../sounds/button_press.mp3");
  introNoise = loadSound("../sounds/intro.mp3");
  portalOpenNoise = loadSound("../sounds/portal_open.mp3");
  whooshNoise = loadSound("../sounds/whoosh.mp3");
  gruntNoise = loadSound("../sounds/grunt.mp3");
}

function draw() {
  background(86, 125, 70);
  if (timesUp) {
    drawTimesUp();
  } else if (gameWon) {
    drawGameWon();
  } else if (gameOver) {
    drawGameOver();
    //Draw game based on level
  } else if (startGame) {
    if (currLevel == 0) {
      drawFallLevel();
    } else if (currLevel == 1) {
      drawWinterLevel();
    } else if (currLevel == 2) {
      drawSpringLevel();
    } else if (currLevel == 3) {
      drawSummerLevel();
    }
  } else if (showInstructions) {
    drawHowToPlay();
  } else if (showOptions) {
    drawOptions();
  } else {
    drawStartScreen();
  }
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
    image(heartImg, 760, 10, 30, 30);
  }
  if (livesLeft > 1) {
    image(heartImg, 720, 10, 30, 30);
  }
  if (livesLeft > 2) {
    image(heartImg, 680, 10, 30, 30);
  }
  if (livesLeft > 3) {
    image(heartImg, 640, 10, 30, 30);
  }
  if (livesLeft > 4) {
    image(heartImg, 600, 10, 30, 30);
  }
}

//Check to see if time has run out, if it has, show times up screen
function checkTime() {
  if (gameTimer <= 0) {
    timesUp = true;
    bellsNoise.stop();
    jungleNoise.stop();
    rainNoise.stop();
    waveNoise.stop();
  }
}

//Check to see if the user has used all their lives, if they have, show the game over screen
function checkLives() {
  if (livesLeft == 0) {
    gameOver = true;
    if (soundOn) {
      bellsNoise.stop();
      jungleNoise.stop();
      rainNoise.stop();
      waveNoise.stop();
      dieNoise.play();
    }
  }
}

//Reset game play
function reset() {
  startGame = false;
  currLevel = 0;
  fallLevelCount = 0;
  winterLevelCount = 0;
  springLevelCount = 0;
  summerLevelCount = 0;

  gameTimerStarted = false;
  gameTimer = 0;
  maxPlayerX = width;
  timesUp = false;
  gameOver = false;
  gameWon = false;

  woodBlocks = [];
  iceBlocks = [];
  grassBlocks = [];
  sandBlocks = [];
  setupFall();
  setupWinter();
  setupSpring();
  setupSummer();
  initTilemap();

  blackBearPlayer.position.x = 30;
  blackBearPlayer.position.y = height - 75;
  brownBearPlayer.position.x = 80;
  brownBearPlayer.position.y = height - 75;
  blackBearPlayer.hitTimer = 0;
  brownBearPlayer.hitTimer = 0;
  blackBearPlayer.portal = false;
  brownBearPlayer.portal = false;
}
