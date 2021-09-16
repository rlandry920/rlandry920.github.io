var tilemap = [
  "wwwwwwwwwwwwwwwwwwww",
  "wbbbbbbbbbbbbbbbbbbw",
  "wbbbbbbbbbbbbbbbbbbw",
  "wbbbwwwwbbbbbbbbbbbw",
  "wbbbbbbbbbbbbbbbbbbw",
  "wbbbbbbbbbwbbbbbbbbw",
  "wbbbbbbbbbwbbbbbbbbw",
  "wbbbbbbbbbwbbbbbbbbw",
  "wbbbbbbbbbbbbbbbbbbw",
  "wbbbbbbbbbbbbbbbbbbw",
  "wbbbbbbbbbbbbbbbbbbw",
  "wbbbbbbbbbbbbbbbwwww",
  "wbbbbbbbbbbbbbbbbbbw",
  "wbbbbbbbbbbbbbbbbbbw",
  "wwwwwbbbbbbbwbbbbbbw",
  "wbbbbbbbbbbbwbbbbbbw",
  "wbbbbbbbbbbbwbbbbbbw",
  "wbbbbbbbbbbbwbbbbbbw",
  "wbbbbbbbbbbbwbbbbbbw",
  "wwwwwwwwwwwwwwwwwwww",
];

var cupmap = [
  "                    ",
  "      c             ",
  "  v              vc ",
  "  c         c       ",
  "        v           ",
  "     c           c  ",
  "         c      h   ",
  "  c                 ",
  "       c     c      ",
  "                c   ",
  "                    ",
  "         c          ",
  "    c            c   ",
  "                    ",
  "      c       c     ",
  "                    ",
  " c       c        h ",
  "     c            c ",
  "                    ",
  "                    ",
];
var images;
var player;
var score;
var animationCount;
var gameScreenCount;
var timer;
var gameStart;
var showIntro;
var stillPlaying;
var replay;
var tiles;
var cups;
var walls;
var players;
var fontRegular;
var bajaSize;
var blastedSize;
var startCounting;
var fullWord;
var height1;
var height2;
var height3;
var y1;
var drawLetsGo;
var enemies;
var hitEnemy;

function preload() {
  fontRegular = loadFont("http://rlandry920.github.io/assets/webfonts/air_mitalic.ttf");
}

function initTilemap() {
  for (var i = 0; i < tilemap.length; i++) {
    for (var j = 0; j < tilemap[i].length; j++) {
      switch (tilemap[i][j]) {
        case "b":
          tiles.push(new purpleTileObj(j * 20, i * 20));
          break;
        case "w":
          walls.push(new wallObj(j * 20, i * 20));
          break;
      }
      switch (cupmap[i][j]) {
        case "c":
          cups.push(new cupObj(j * 20, i * 20));
          break;
        case "h":
          enemies.push(new enemyObj(j * 20, i * 20, "h"));
          break;
        case "v":
          enemies.push(new enemyObj(j * 20, i * 20, "v"));
          break;
      }
    }
  }
}

function setup() {
  print("SETTING UP");
  images = [];
  score = 0;
  animationCount = 0;
  gameScreenCount = 0;
  timer = 0;
  gameStart = true;
  showIntro = false;
  stillPlaying = true;
  replay = false;
  tiles = [];
  cups = [];
  walls = [];
  players = [];
  enemies = [];
  bajaSize = 30;
  blastedSize = 30;
  startCounting = false;
  fullWord = "LETS GET...";
  height1 = 0;
  height2 = 0;
  height3 = 0;
  y1 = 400;
  drawLetsGo = false;
  hitEnemy = false;

  createCanvas(400, 400);
  initTilemap();
  customPrize();
  customPortrait();
  rectMode(CORNER);
  player = new Player(200, 200);
  players.push(player);
}

function mouseClicked() {
  var xCor = mouseX;
  var yCor = mouseY;
  if (showIntro) {
    gameStart = true;
  }
  if (
    xCor > width / 2 - 70 &&
    xCor < width / 2 + 70 &&
    yCor > 320 &&
    yCor < 370 &&
    !stillPlaying
  ) {
    replay = true;
  }
}

function draw() {
  if (replay) {
    setup();
    textAlign(LEFT);
  }
  timer++;
  background(255);
  if (stillPlaying) {
    movePlayer();
  }
  if (gameStart) {
    drawGame();
  } else if (timer < 490) {
    rectMode(CORNER);

    drawStartAnimation();
  } else {
    rectMode(CORNER);

    drawStartScreen();
    showIntro = true;
  }
  if (score == 20) {
    drawWin();
    stillPlaying = false;
  }
  if (hitEnemy) {
    drawGameOver();
    stillPlaying = false;
  }
}

function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) {
    player.moveLeft();
  } else if (keyIsDown(RIGHT_ARROW)) {
    player.moveRight();
  } else if (keyIsDown(UP_ARROW)) {
    player.moveUp();
  } else if (keyIsDown(DOWN_ARROW)) {
    player.moveDown();
  }
}

function drawWin() {
  noStroke();
  fill(111, 111, 111, 200);
  rect(0, 0, 400, 400);
  textSize(50);
  fill(0);
  text("CONGRATS!", 200, 80);
  textFont("Helvetica");
  strokeWeight(1);
  fill(255, 223, 0);
  rect(150, 240, 100, 50, 5);
  rect(170, 220, 60, 30, 5);
  rect(180, 210, 40, 10, 3);
  bezier(140, 110, 150, 260, 250, 260, 260, 110);
  noFill();
  stroke(255, 223, 0);
  strokeWeight(10);
  bezier(170, 200, 140, 200, 100, 140, 100, 130);
  line(100, 130, 140, 130);
  bezier(230, 200, 260, 200, 300, 140, 300, 130);
  line(300, 130, 260, 130);
  strokeWeight(1);
  fill(0);
  stroke(0);
  textSize(25);
  textAlign(CENTER);
  text("Winner", 154, 255, 100, 300);
  stroke(255);
  strokeWeight(4);
  line(180, 190, 200, 130);
  line(220, 190, 200, 130);
  line(220, 190, 170, 150);
  line(180, 190, 230, 150);
  line(170, 150, 230, 150);
  noStroke();
  fill(255, 112, 52);
  rect(width / 2 - 70, 320, 140, 50, 10);
  fill(255);
  //Show text with score
  textAlign(CENTER);
  textStyle(NORMAL);
  textSize(30);
  text("REPLAY", width / 2, 355);
}

function drawGameOver() {
  textFont("Helvetica");
  noStroke();
  fill(111, 111, 111, 220);
  rect(0, 0, 400, 400);
  textSize(50);
  fill(0);
  text("GAME OVER!", 200, 80);
  noStroke();
  fill(120, 222, 191);
  ellipse(100, 230, 150, 80);
  ellipse(200, 180, 200, 100);
  ellipse(300, 200, 150, 40);
  ellipse(280, 290, 100, 40);
  ellipse(320, 250, 20, 10);
  textSize(25);
  textAlign(CENTER);
  fill(0);
  text("SCORE:", 100, 155, 200, 300);
  text(score, 200, 200);
  fill(255, 112, 52);
  rect(width / 2 - 70, 320, 140, 50, 10);
  fill(255);
  textAlign(CENTER);
  textStyle(NORMAL);
  textSize(30);
  text("REPLAY", width / 2, 355);
  rectMode(CORNER);

}

function drawStartAnimation() {
  rectMode(CORNER);

  background(100);
  animationCount++;
  noStroke();
  if (drawLetsGo) {
    fill(120, 222, 191);
    textFont(fontRegular);
    textSize(50);
    textStyle(BOLD);
    text(fullWord.substring(0, animationCount / 15), 20, 80);
    if (animationCount > 200 && y1 > 0) {
      y1 -= 20;
    }
  }

  image(images[1], 40, 50, 300, 300);
  image(images[0], 145, 230, 200, 200);
  fill(255);
  rect(170, 295, 50, height1);
  rect(174, 320, 42, height2);
  rect(178, 330, 35, height3);

  if (animationCount % 3 == 0) {
    if (height1 < 26) {
      height1++;
    } else if (height2 < 10 && height1 == 26) {
      height2++;
    } else if (height3 < 50 && height2 == 10) {
      height3++;
    } else if (!drawLetsGo) {
      drawLetsGo = true;
      animationCount = 0;
    }
  }
  fill(100);
  noStroke();
  rect(0, y1, 400, 400);
}

function drawStartScreen() {
  rectMode(CORNER);

  background(100);
  noStroke();
  if (bajaSize < 55 && blastedSize != 55) {
    bajaSize++;
  }
  if (bajaSize == 55 && blastedSize < 55) {
    blastedSize++;
  }
  if (blastedSize == 55) {
    startCounting = true;
  }
  if (startCounting) {
    gameScreenCount++;
  }
  if (gameScreenCount > 0 && gameScreenCount < 10) {
    bajaSize++;
  }
  if (gameScreenCount >= 10 && gameScreenCount < 20) {
    bajaSize--;
  }
  if (gameScreenCount >= 20 && gameScreenCount < 30) {
    blastedSize++;
  }
  if (gameScreenCount >= 30 && gameScreenCount < 40) {
    blastedSize--;
  }
  if (gameScreenCount == 100) {
    gameScreenCount = 0;
  }

  textFont(fontRegular);
  textSize(bajaSize);
  fill(120, 222, 191);
  textStyle(BOLD);
  text("BAJA", 20, 80);
  textSize(blastedSize);
  text("BLASTED", 50, 150);
  textSize(30);
  text("Collect all 20       to win", 50, 250);
  text("Avoid all enemies", 50, 300);

  text("Press mouse to begin game", 50, 370);
  let enemy = new enemyObj(270, 285);
  enemy.draw();
  push();
  rotate(PI / 6);
  image(images[0], 314, 40, 100, 80);
  pop();
}

function drawGame() {
  rectMode(CORNER);

  for (var i = 0; i < tiles.length; i++) {
    tiles[i].draw();
  }
  for (i = 0; i < walls.length; i++) {
    walls[i].draw();
  }
  for (i = 0; i < cups.length; i++) {
    if (!cups[i].hit) {
      cups[i].draw();
      cups[i].checkHit();
    }
  }
  for (i = 0; i < enemies.length; i++) {
    if (stillPlaying) {
      enemies[i].move();
      enemies[i].checkHit();
    }
    enemies[i].draw();
  }
  player.draw();
  stroke(0);
  rect(290, 5, 100, 10);
  fill(120, 222, 191);
  stroke(120, 222, 191);
  if (score != 0) {
    rect(291, 6, score * 5, 8);
  }
}
