var gravity, walkForce, backForce, jumpForce, player;
var redWall, purpleWall, yellowWall, blueWall, orangeWall, walls;
var mapX;
var candies, enemies;
var startGame, gameOver, gameWin, score;
var gameOverCount;
var fallingCandies;

//Setup tilemap for game
var tilemap = [
  "o                                      o",
  "b                 c           c      c b",
  "y         ce                 por       y",
  "p         bo                           p",
  "r  c                               pybor",
  "o  py          orpy        ec          o",
  "b      c                  ybo       c  b",
  "y       e              c             e y",
  "p     yborp      c    or         c  borp",
  "r              e                rb     r",
  "o            rpyb           ce         o",
  "b  c                       pybo        b",
  "yborp                c                 y",
  "p                   orpy           c   p",
  "r        c                       orpy  r",
  "o       orpy   c                       o",
  "b              bory            c       b",
  "y                            rpyb      y",
  "p    c      e           c       e      p",
  "rpyborpyborpyborpyborpyborpyborpyborpybo",
];

//Load in custom font
function preload() {
  candyCaneFont = loadFont("../assets/webfonts/Candycane.ttf");
  robotFont = loadFont("../assets/webfonts/robot.ttf")
  swirlFont = loadFont("../assets/webfonts/swirls.ttf")
}

//Create map based on array
function initTilemap() {
  for (var i = 0; i < tilemap.length; i++) {
    for (var j = 0; j < tilemap[i].length; j++) {
      switch (tilemap[i][j]) {
        case "r": //If its a blue Wall
          walls.push(new wallObj(j * 20 + 10, i * 20 + 10, redWall));
          break;
        case "p": //If its a purple wall
          walls.push(new wallObj(j * 20 + 10, i * 20 + 10, purpleWall));
          break;
        case "y": //If its a yellow wall
          walls.push(new wallObj(j * 20 + 10, i * 20 + 10, yellowWall));
          break;
        case "b": //If its a blue wall
          walls.push(new wallObj(j * 20 + 10, i * 20 + 10, blueWall));
          break;
        case "o": //If its a orange wall
          walls.push(new wallObj(j * 20 + 10, i * 20 + 10, orangeWall));
          break;
        case "c": //If its a candy
          candies.push(new candyObj(j * 20 + 10, i * 20 + 10, 0));
          break;
        case "e": //If its an enemy
          enemies.push(new enemyObj(j * 20 + 10, i * 20));
          break;
      }
    }
  }
}

//Move character with arrows ors W, A, D
function keyPressed() {
  if (keyCode === RIGHT_ARROW || keyCode == 68) {
    player.walkForward = 1;
  }
  if (keyCode === LEFT_ARROW || keyCode == 65) {
    player.walkBackward = 1;
  }
  if ((keyCode === UP_ARROW || keyCode == 87) && player.jump === 0) {
    player.jump = 2;
  }
}

function keyReleased() {
  if (keyCode === RIGHT_ARROW || keyCode == 68) {
    player.walkForward = 0;
  } else if (keyCode === LEFT_ARROW || keyCode == 65) {
    player.walkBackward = 0;
  }
}

function mouseClicked() {
  var xCor = mouseX;
  var yCor = mouseY;
  //If the user clicks on the canvas while on the game screen, start the game
  if (xCor >= 0 && xCor <= width && yCor >= 0 && yCor < height && !startGame) {
    startGame = true;
  }
  //If the user chooses to replay
  if (xCor >= 0 && xCor <= width && yCor >= 0 && yCor < height && (gameOver || gameWin)) {
    setup()
  }
}

//Assign values to variables
function setup() {
  createCanvas(400, 400);
  gravity = new p5.Vector(0, 0.1);
  walkForce = new p5.Vector(3, 0);
  backForce = new p5.Vector(-3, 0);
  jumpForce = new p5.Vector(0, -4);
  player = new playerObj(40, 300);

  redWall = color(255, 50, 68);
  purpleWall = color(203, 117, 198);
  yellowWall = color(255, 217, 69);
  blueWall = color(117, 199, 252);
  orangeWall = color(250, 146, 63);

  fallingCandies = []
  for (i = 0; i < 50; i++) {
    fallingCandies.push(new candyObj(random(5, width - 5), random(-300, 0), random(0, 2 * PI)))
  }

  walls = [];
  candies = [];
  enemies = [];
  mapX = player.position.x;
  score = 0;
  startGame = false;
  gameOver = false;
  gameWin = false;
  gameOverCount = 0;
  initTilemap();


}

function draw() {
  background(252, 186, 219);
  if (startGame) {
    drawGame();
  } else {
    drawStartScreen();
  }
  if (gameOver) {
    drawGameOver();
  }
  if (gameWin) {
    drawGameWin();
  }
}

function drawStartScreen() {
  fill(255)
  rect(30, 250, 20, 200)
  rect(364, 340, 14, 60)
  fill(255, 0, 0)

  noStroke();
  textFont(candyCaneFont);
  textSize(100);
  text("Candy", 20, 80);
  text("Land", 120, 150);
  textSize(16);
  textFont("Helvetica")
  text("Use arrows or W, A, D to move character", 95, 200)
  text("Avoid all robots or you die", 95, 230);
  text("You can kill a robot if you jump on its head", 95, 260)
  text("But be careful the robots can also jump", 95, 290)

  text("Collect all the candies to win!", 95, 320)
  textSize(20)
  text("Click mouse to start game", 80, 380);
  circle(40, 250, 100)
  circle(370, 330, 45)

}

function drawGame() {
  push();
  if (player.position.x > 600) {
    translate(-400, 0);
  } else if (player.position.x > 200) {
    translate(200 - player.position.x, 0);
  }
  fill(255, 0, 0);
  fill(255, 255, 255);
  if (!gameOver && !gameWin) {
    player.update();
    player.checkHit();
  }
  player.draw();

  //Draw walls
  rectMode(CENTER)
  for (i = 0; i < walls.length; i++) {
    walls[i].draw();
  }
  rectMode(CORNER)
  //Draw candies
  for (i = 0; i < candies.length; i++) {
    if (!candies[i].hit) {
      candies[i].draw();
      if (!gameOver && !gameWin) {
        candies[i].checkHit();
      }
    }
  }
  //Draw enemies
  for (i = 0; i < enemies.length; i++) {
    if (!enemies[i].hit) {
      enemies[i].draw();
      if (!gameOver && !gameWin) {
        enemies[i].state[enemies[i].currState].execute(enemies[i]);
      }
    } else if (enemies[i].count != 0) {
      enemies[i].drawHit();
    }
  }
  pop();
  rectMode(CORNER)
  stroke(1);
  noFill();
  rect(280, 5, 102, 10);
  fill(212, 175, 55);
  stroke(212, 175, 55);
  //Draw bar to show score progress
  if (score != 0) {
    rect(281, 6, score * 5, 8);
  }
}

function drawGameOver() {
  fill(111, 111, 111, 220);
  rect(0, 0, 400, 400);

  if (gameOverCount < 100) {
    gameOverCount++;
  }
  //Gingerbread man
  noStroke();
  fill(213, 126, 36);
  rect(70, 185, 60, 100);
  quad(
    70,
    210,
    100,
    220,
    90,
    300,
    60,
    300
  );
  quad(
    130,
    210,
    100,
    220,
    110,
    300,
    140,
    300
  );
  quad(
    125,
    210,
    150,
    250,
    165,
    240,
    130,
    190
  );
  circle(158, 245, 18);
  quad(
    75,
    210,
    50,
    250,
    35,
    240,
    70,
    190
  );
  circle(42, 245, 18);
  ellipse(65, 300, 50, 15);
  ellipse(135, 300, 50, 15);

  if (gameOverCount < 100) {
    circle(100, 160, 80); // head
    fill(255);
    circle(85, 150, 15);
    circle(115, 150, 15);
    strokeWeight(2);
    stroke(255);
    noFill();
    bezier(
      80,
      180,
      90,
      165,
      110,
      165,
      120,
      180);
  }
  else {
    circle(200, 270, 80); // head
    fill(0)
    textFont('Helvetica')
    text("x", 180, 260)
    text("x", 210, 260)
    stroke(0);
    strokeWeight(2)
    noFill();
    bezier(
      180,
      290,
      190,
      270,
      210,
      270,
      220,
      290);
  }


  noStroke()
  fill(255, 0, 0);
  circle(100, 210, 15);
  circle(100, 230, 15);


  //Enemy
  noStroke();

  fill(12, 24, 130);
  rect(260, 160, 80, 120);
  ellipse(255, 210, 30, 80);
  ellipse(345, 210, 30, 80);
  ellipse(280, 280, 25, 60);
  ellipse(320, 280, 25, 60);
  circle(300, 140, 100); // head

  fill(255, 0, 0);
  circle(282, 130, 20);
  circle(318, 130, 20);
  strokeWeight(4);
  stroke(255, 0, 0);
  line(
    280,
    160,
    320,
    160
  );
  line(
    275,
    108,
    290,
    115
  );
  line(
    325,
    108,
    310,
    115
  );
  if (gameOverCount < 100) {
    line(282, 130, 150 - gameOverCount, 190)
    line(318, 130, 150 - gameOverCount, 190)
  }

  strokeWeight(1)
  textSize(40)
  fill(0)
  textFont(robotFont)
  text("YOU LOST", 80, 50);
  textSize(20)
  text("Click anywhere to replay...", 30, 370);
}

function drawGameWin() {
  noStroke();
  fill(111, 111, 111, 220);
  rect(0, 0, 400, 400);

  fill(252, 186, 219)
  rect(80, 250, 220, 80)
  rect(60, 150, 40, 180)
  triangle(50, 150, 110, 150, 80, 120)
  triangle(270, 150, 330, 150, 300, 120)

  rect(280, 150, 40, 180)
  rect(160, 200, 50, 50)
  triangle(160, 200, 210, 200, 185, 160)
  ellipse(130, 250, 80, 60)
  ellipse(245, 250, 80, 60)

  fill(212, 175, 55)
  rect(160, 270, 50, 60, 20, 20, 0, 0)
  ellipse(70, 165, 8, 16)
  ellipse(90, 165, 8, 16)
  ellipse(290, 165, 8, 16)
  ellipse(310, 165, 8, 16)
  ellipse(185, 230, 15, 30)

  strokeWeight(1)
  textSize(60)
  fill(252, 186, 219)
  textFont(swirlFont)
  text("WINNER", 50, 60);
  textFont(swirlFont)

  textSize(40)
  text("Click anywhere to replay...", 40, 375);

  for (i = 0; i < fallingCandies.length; i++) {
    fallingCandies[i].draw();
    fallingCandies[i].fall();
  }
}
