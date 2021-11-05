var pacmanPlayer, samplePacmanPlayer;
var ghosts, walls, pellets, sampleGhosts;

//Create game map
var tilemap = [
  "wwwwwwwwwwwwwwwwwwww",
  "wppppppppwpppppppppw",
  "wpwwpwwwpwpwwwpwwwpw",
  "wpwwpwwwpwpwwwpwwwpw",
  "wppppppppppppppppppw",
  "wpwwpwpwwwwwpwpwwwpw",
  "wppppwpppwpppwpppppw",
  "wwwwpwwwpwpwwwpwwwpw",
  "wwwwpwpppppppwpwwwpw",
  "pppppppwwwwwpppppppp",
  "wwwwpwpppppppwpwwwww",
  "wwwwpwpwwwwwpwpwwwww",
  "wppppppppwpppppppppw",
  "wpwwpwwwpwpwwwpwwwpw",
  "wppwppppp pppppwpppw",
  "wwpwpwpwwwwwpwpwpwww",
  "wppppwpppwpppwpppppw",
  "wpwwwwwwpwpwwwwwwwpw",
  "wppppppppppppppppppw",
  "wwwwwwwwwwwwwwwwwwww",
];
var count;
var gameOver, gameStart, gameWin;
var aracdeFont, pacFont;
var score;
var lives;
var life1, life2, life3;
var highScore = 0;
var prevPlayerX, prevPlayerY;

//Load in fonts
function preload() {
  arcadeFont = loadFont("../assets/webfonts/arcade.ttf");
  pacFrontFont = loadFont("../assets/webfonts/pacFront.ttf");
  pacBackFont = loadFont("../assets/webfonts/pacBack.ttf");
}

function setup() {
  createCanvas(400, 400);
  angleMode(RADIANS);
  //Create player
  pacmanPlayer = new pacman(width / 2 - 10, height - 110);
  prevPlayerX = width / 2 - 10;
  prevPlayerY = height - 110;
  samplePacmanPlayer = new pacman(-0, 250);
  life1 = new pacman(310, 10);
  life2 = new pacman(330, 10);
  life3 = new pacman(350, 10);

  ghosts = [];
  //Create 4 ghosts with different colors
  ghosts[0] = new ghost(30, 30, color(255, 161, 1));
  ghosts[1] = new ghost(width - 30, 30, color(254, 38, 1));
  ghosts[2] = new ghost(width - 30, height - 30, color(254, 179, 177));
  ghosts[3] = new ghost(30, height - 30, color(3, 223, 225));

  sampleGhosts = [];
  //Create 4 sample ghosts with different colors for start screen
  sampleGhosts[0] = new sampleGhost(-100, 250, color(255, 161, 1));
  sampleGhosts[1] = new sampleGhost(-125, 250, color(254, 38, 1));
  sampleGhosts[2] = new sampleGhost(-150, 250, color(254, 179, 177));
  sampleGhosts[3] = new sampleGhost(-175, 250, color(3, 223, 225));

  walls = [];
  pellets = [];
  count = 0;
  initTilemap();
  //Get the first path for the ghosts
  for (var g = 0; g < ghosts.length; g++) {
    ghosts[g].refreshPath();
  }
  gameStart = false;
  gameOver = false;
  gameWin = false;
  score = 0;
  lives = 3;
}

//Move player using arrows and WASD
function keyPressed() {
  if (keyCode == 32 && !gameStart) {
    gameStart = true;
  }
  if (
    (keyCode === RIGHT_ARROW || keyCode == 68) &&
    !gameOver &&
    !gameWin &&
    !this.hit
  ) {
    pacmanPlayer.orientation = 0;
    pacmanPlayer.moving = true;
  }
  if (
    (keyCode === LEFT_ARROW || keyCode == 65) &&
    !gameOver &&
    !gameWin &&
    !this.hit
  ) {
    pacmanPlayer.orientation = PI;
    pacmanPlayer.moving = true;
  }
  if (
    (keyCode === UP_ARROW || keyCode == 87) &&
    !gameOver &&
    !gameWin &&
    !this.hit
  ) {
    pacmanPlayer.orientation = -PI / 2;
    pacmanPlayer.moving = true;
  }
  if (
    (keyCode === DOWN_ARROW || keyCode == 83) &&
    !gameOver &&
    !gameWin &&
    !this.hit
  ) {
    pacmanPlayer.orientation = PI / 2;
    pacmanPlayer.moving = true;
  }
}

function mouseClicked() {
  var xCor = mouseX;
  var yCor = mouseY;
  //If the user clicks on the game screen, go to the menu
  if (
    xCor >= 0 &&
    xCor <= width &&
    yCor >= 0 &&
    yCor < height &&
    (gameOver || gameWin)
  ) {
    setup();
  }
}

//Create tile map based on array
function initTilemap() {
  for (var i = 0; i < tilemap.length; i++) {
    for (var j = 0; j < tilemap[i].length; j++) {
      switch (tilemap[i][j]) {
        case "w": //If its a wall
          walls.push(new wall(j * 20 + 10, i * 20 + 10));
          break;
        case "p": //If its a wall
          pellets.push(new pellet(j * 20 + 10, i * 20 + 10));
          break;
      }
    }
  }
}

function draw() {
  count++;
  if (gameStart) {
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

function drawGame() {
  background(0);

  if (!gameOver && !gameWin) {
    //Refresh ghosts path every 30 frames
    //Dont refresh all the ghosts at once
    if (
      count % 30 == 0 &&
      ghosts[0].currState == 0 &&
      (prevPlayerX != pacmanPlayer.x ||
        prevPlayerY != pacmanPlayer.y)
    ) {
      ghosts[0].refreshPath();
      prevPlayerX = pacmanPlayer.x;
      prevPlayerY = pacmanPlayer.y;
    } else if (
      (count - 5) % 30 == 0 &&
      (prevPlayerX != pacmanPlayer.x ||
        prevPlayerY != pacmanPlayer.y)
    ) {
      ghosts[1].refreshPath();
      prevPlayerX = pacmanPlayer.x;
      prevPlayerY = pacmanPlayer.y;
    } else if (
      (count - 10) % 30 == 0 &&
      (prevPlayerX != pacmanPlayer.x ||
        prevPlayerY != pacmanPlayer.y)
    ) {
      ghosts[2].refreshPath();
      prevPlayerX = pacmanPlayer.x;
      prevPlayerY = pacmanPlayer.y;
    } else if (
      (count - 15) % 30 == 0 &&
      (prevPlayerX != pacmanPlayer.x ||
        prevPlayerY != pacmanPlayer.y)
    ) {
      ghosts[3].refreshPath();
      prevPlayerX = pacmanPlayer.x;
      prevPlayerY = pacmanPlayer.y;
    }
  }

  //Move ghosts
  for (var i = 0; i < ghosts.length; i++) {
    ghosts[i].draw();
    if (!gameOver && !gameWin) {
      ghosts[i].state[ghosts[i].currState].execute(ghosts[i]);
      ghosts[i].checkHit();
    }
  }

  //Draw walls
  for (i = 0; i < walls.length; i++) {
    walls[i].draw();
  }

  //Draw pellets
  for (i = 0; i < pellets.length; i++) {
    if (!pellets[i].eaten) {
      pellets[i].draw();
      if (!gameOver && !gameWin) {
        pellets[i].checkHit();
      }
    }
  }

  //Draw player
  pacmanPlayer.draw();
  if (!gameOver && !gameWin) {
    pacmanPlayer.move();
  }
  textFont(arcadeFont);
  textSize(20);
  fill(255);
  //Show score in left corner
  text("Score " + score, 10, 15);
  //Show lives in right hand corner
  if (lives > 0) {
    life1.draw();
  }
  if (lives > 1) {
    life2.draw();
  }
  if (lives > 2) {
    life3.draw();
  }
  //User wins if they collect all the pellers
  if (score == 1920) {
    gameWin = true;
    highScore = 1920;
  }
}

function drawGameOver() {
  fill(255, 0, 0);
  textFont(arcadeFont);
  textSize(20);
  if (count % 50 != 0) {
    text("GAME OVER", 145, 197);
  }
  textSize(20);
  fill(255);

  text("Click screen to go back to main menu", 30, 395);
}

function drawGameWin() {
  fill(255, 0, 0);
  textFont(arcadeFont);
  textSize(20);
  if (count % 50 != 0) {
    text("YOU WIN", 155, 197);
  }
  textSize(20);
  fill(255);

  text("Click screen to go back to main menu", 30, 395);
}

function drawStartScreen() {
  rectMode(CORNER);
  background(0);
  fill(170, 0, 0);
  rect(15, 70, 370, 120, 10);
  fill(255, 191, 0);
  rect(25, 80, 350, 100, 10);

  fill(0);
  textFont(pacBackFont);
  textSize(70);
  text("PAC-MAN", 30, 150);
  fill(255, 255, 0);
  textFont(pacFrontFont);
  text("PAC-MAN", 30, 150);
  textFont(arcadeFont);
  textSize(20);
  text("Press space key to start", 80, 335);
  text("Use arrow keys or WASD to move", 60, 370);
  text("High score", 150, 30);
  textAlign(CENTER);
  text(highScore, 150, 50, 100);
  textAlign(LEFT);
  rectMode(CENTER);

  //Move ghosts and pacman across screen
  for (i = 0; i < sampleGhosts.length; i++) {
    sampleGhosts[i].draw();
    sampleGhosts[i].move();
  }
  samplePacmanPlayer.draw();
  samplePacmanPlayer.sampleMove();
}
