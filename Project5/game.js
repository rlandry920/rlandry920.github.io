var tilemap = [
  "wwwwwwwwwwwwwwwwwwww",
  "w                  w",
  "w  e               w",
  "w                d w",
  "w                  w",
  "w     h          e w",
  "w                  w",
  "w                  w",
  "w                  w",
  "w  e               w",
  "w                  w",
  "w                  w",
  "w                e w",
  "w                  w",
  "w                  w",
  "w                  w",
  "w    s             w",
  "w         e        w",
  "w                  w",
  "wwwwwwwwwwwwwwwwwwww",
];

var player;
var enemies, powerups, walls;
var angle179;
var twoDegrees;
var oneDegree;
var score;
var startGame, showInstructions, gameOver, gameWin;
var wood;
var particles;
var leftTankX, rightTankX;
var crownY, crownDir;

//This represents the walls
class wallObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    noStroke();
    fill(90, 73, 45);
    rect(this.x, this.y, 20, 20);
  }
}

class fireParticle {
  constructor(x, y, xSpeed, ySpeed, life) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.life = life;
  }
}

//Create tile map based on array
function initTilemap() {
  for (var i = 0; i < tilemap.length; i++) {
    for (var j = 0; j < tilemap[i].length; j++) {
      rectMode(CENTER);
      switch (tilemap[i][j]) {
        case "w": //If its a wall
          walls.push(new wallObj(j * 20 + 10, i * 20 + 10));
          break;
        case "s": //If its a wall
          powerups.push(new scopePowerUp(j * 20 + 10, i * 20 + 10));
          break;
        case "d": //If its a wall
          powerups.push(new rapidFirePowerUp(j * 20 + 10, i * 20 + 10));
          break;
        case "h": //If its a wall
          powerups.push(new shieldPowerUp(j * 20 + 10, i * 20 + 10));
          break;
        case "e": //If its a wall
          enemies.push(new Enemy(j * 20 + 10, i * 20 + 10));
          break;
      }
    }
  }
}

//Load in custom font
function preload() {
  tankFont = loadFont("../assets/webfonts/tank.ttf");
  wood = loadImage("../images/wood.jpg");
}

function setup() {
  createCanvas(400, 400);
  twoDegrees = PI / 90;
  oneDegree = PI / 180;
  angle179 = PI - oneDegree;
  player = new Player(200, 200);
  enemies = [];
  powerups = [];
  walls = [];
  startGame = false;
  showInstructions = false;
  gameOver = false;
  gameWin = false;
  score = 0;
  particles = [];
  leftTankX = -100;
  rightTankX = 500;
  crownY = 280
  crownDir = 3;
  initTilemap();
}

function mouseClicked() {
  var xCor = mouseX;
  var yCor = mouseY;
  //If the user clicks on the canvas while on the game screen, start the game
  if (xCor >= 155 && xCor <= 245 && yCor >= 265 && yCor < 295 && !startGame) {
    startGame = true;
  }
  //If the user chooses to replay
  if (
    xCor >= 85 &&
    xCor <= 315 &&
    yCor >= 315 &&
    yCor < 345 &&
    !showInstructions
  ) {
    showInstructions = true;
  }
  if (
    xCor >= 155 &&
    xCor <= 245 &&
    yCor >= 335 &&
    yCor < 365 &&
    showInstructions
  ) {
    showInstructions = false;
  }
  if (
    xCor >= 100 &&
    xCor <= 300 &&
    yCor >= 335 &&
    yCor < 365 &&
    (gameOver || gameWin)
  ) {
    setup();
  }
}

//Move player based on arrow keys
function movePlayer() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    player.rotateCounterClockwise();
  } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    player.rotateClockwise();
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    player.moveForward();
  } else if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    player.moveBackward();
  }
  if (keyIsDown(32)) {
    player.fire();
  }
}

function updateAndDrawParticle(part) {
  if (part.life < 0) {
    return; // skip the rest of this function
  }
  part.x += part.xSpeed;
  part.y += part.ySpeed;
  fill(255, part.life * 4, 0, 100);
  if (part.life < 10) {
    fill(255, 10);
  }
  ellipse(part.x, part.y, 20, 20);
  part.life--;
}

function draw() {
  if (gameOver) {
    drawGameOver();
  } else if (gameWin) {
    drawGameWin();
  } else if (startGame) {
    drawGame();
  } else if (showInstructions) {
    drawInstructions();
  } else {
    drawStartScreen();
  }
}

function drawGameOver() {
  background(255);
  fill(0);
  image(wood, 0, 10);
  textSize(60);
  textFont(tankFont);
  textStyle(NORMAL);
  text("GAME", 25, 80);
  text("OVER", 150, 150);
  stroke(0);

  fill(255);
  rect(200, 350, 200, 30);
  fill(0);
  textFont(tankFont);

  textSize(25);
  text("MAIN MENU", 105, 360);

  fill(200);
  rect(200, 270, 70, 70);
  rect(240, 270, 60, 10);
  stroke(0);
  strokeWeight(3);
  line(165, 235, 190, 270);
  line(210, 245, 190, 270);
  line(180, 280, 190, 270);
  line(180, 280, 200, 290);
  line(200, 290, 220, 280);
  line(220, 280, 235, 305);
  strokeWeight(1);

  var index = 0;
  noStroke();
  while (index < particles.length) {
    updateAndDrawParticle(particles[index]);
    index++;
  }
  for (var i = 0; i < 20; i++) {
    particles.push(
      new fireParticle(random(155, 245), 245, 0, -2, random(30, 40))
    );
  }
}

function drawGameWin() {
  background(255);
  fill(0);
  image(wood, 0, 10);
  textSize(60);
  textFont(tankFont);
  textStyle(NORMAL);
  text("YOU", 40, 80);
  text("WIN", 150, 150);
  stroke(0);

  fill(255);
  rect(200, 350, 200, 30);
  fill(0);
  textFont(tankFont);

  textSize(25);
  text("MAIN MENU", 105, 360);
  fill(251, 196, 60)
  stroke(255)
  rect(200, crownY, 120, 20);
  triangle(140, crownY - 10, 180, crownY - 10, 120, crownY - 80)
  triangle(220, crownY - 10, 260, crownY - 10, 280, crownY - 80)
  triangle(170, crownY - 10, 230, crownY - 10, 200, crownY - 80)
  ellipse(120, crownY - 80, 15, 15)
  ellipse(280, crownY - 80, 15, 15)
  ellipse(200, crownY - 80, 15, 15)

  if (crownY < 260 || crownY > 300) {
    crownDir = -crownDir;
  }
  crownY += crownDir;
}

function drawInstructions() {
  fill(0);
  image(wood, 0, 10);
  textSize(40);
  textFont(tankFont);
  textStyle(NORMAL);
  text("INSTRUCTIONS", 25, 60);
  textSize(20);
  textFont("Helvetica");
  textStyle(BOLD);

  text("Use arrow keys or W,A,S,D to move your tank", 250, 80, 300);
  text("Push spacebar to shoot missle", 100, 160);
  text("Makes you shoot twice as fast", 100, 200);
  text("Provides better aim", 100, 240);
  text("Blocks enemy bullets", 100, 280);
  text("Destroy all enemy tanks to win!", 50, 320);
  fill(200);
  rect(40, 90, 15, 15);
  rect(40, 110, 15, 15);
  rect(20, 110, 15, 15);
  rect(60, 110, 15, 15);
  rect(40, 155, 50, 15);

  let rapidFire = new rapidFirePowerUp(40, 200);
  let scope = new scopePowerUp(40, 235);
  let shield = new shieldPowerUp(40, 270);
  rapidFire.draw();
  scope.draw();
  shield.draw();
  fill(255);
  rect(200, 350, 90, 30);
  fill(0);
  textFont(tankFont);

  textSize(25);

  text("BACK", 160, 360);
}

function drawStartScreen() {
  stroke(0);
  image(wood, 0, 10);
  textFont(tankFont);
  textSize(45);
  fill(0);
  text("TANK BATTLE", 10, 100);
  fill(255);
  rect(200, 280, 90, 30);
  rect(200, 330, 230, 30);
  textSize(25);
  fill(0);
  text("PLAY", 160, 290);
  text("INSTRUCTIONS", 95, 340);

  if (leftTankX != 120) {
    leftTankX += 5;
  }
  if (rightTankX != 280) {
    rightTankX -= 5;
  }

  fill(255, 0, 0);
  rect(leftTankX, 200, 70, 70);
  rect(leftTankX + 40, 200, 60, 10);
  fill(0, 0, 255);
  rect(rightTankX, 200, 70, 70);
  rect(rightTankX - 40, 200, 60, 10);
}
function drawGame() {
  image(wood, 0, 10);
  stroke(0);

  for (i = 0; i < powerups.length; i++) {
    if (!powerups[i].hit) {
      powerups[i].draw();
      powerups[i].checkHit();
    }
  }
  for (i = 0; i < enemies.length; i++) {
    enemies[i].draw();
    if (!enemies[i].hit) {
      enemies[i].state[enemies[i].currState].execute(enemies[i]);
      enemies[i].checkHit();
    }
  }

  player.draw();
  movePlayer();
  player.checkHit();
  for (i = 0; i < walls.length; i++) {
    walls[i].draw();
  }
  fill(255, 0, 0);
  stroke(0);
  rect(280, 13, 10, 10);
  rect(280, 8, 4, 10);
  rect(300, 13, 10, 10);
  rect(300, 8, 4, 10);
  rect(320, 13, 10, 10);
  rect(320, 8, 4, 10);
  rect(340, 13, 10, 10);
  rect(340, 8, 4, 10);
  rect(360, 13, 10, 10);
  rect(360, 8, 4, 10);
  var scoreText = "";
  for (i = 0; i < score; i++) {
    scoreText += "X ";
  }
  textFont("Helvetica");
  textSize(21);
  fill(0);
  text(scoreText, 274, 18);
}
