//Variable representing the map of tiles and walls
var tilemap = [
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
  "wbbbbwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwbbbbbbbbbbbbbbbbbbw",
  "wbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwbbbbbbbbwbbbw",
  "wbbbbbbbbbbwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbw",
  "wbbbbbbbbbbbbbbbbbbbbbwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbw",
  "wbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbw",
  "wbbbbwbbbbbbbbbbbbbbbbbbbbwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbw",
  "wbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwbbbbbbbbbbbbbbbbbbbbbbw",
  "wbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwbbbbbbw",
  "wwbbbbbbbbbbbbbbbbwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbw",
  "wbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbw",
  "wbbbbbbbwbbbbbbbbbbbbbbbbbwbbbbbbbbbbbwbbbbbbbbbbbwbbbbbbbbw",
  "wbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbw",
  "wbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbw",
  "wbbbbbbwbbbbbbbbbbbbbbbbbbbwbbbbbbbbbbbbbbbbbbbbwbbbbbbbbbbw",
  "wbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbwbbbbbbbbbbbbbbbbbbbbbbbbbbw",
  "wbbbbbbbbbbbbbbwbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbw",
  "wbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbw",
  "wbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbw",
  "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
];

//Variable representing the map of prizes and enemies
var tilemap2 = [
  "                                                            ",
  "                                                            ",
  "         e       c                  c            e          ",
  "                             e                              ",
  "    c                                       c         e     ",
  "                     e            c    e                    ",
  "                                                  c         ",
  "            c                c             e                ",
  "                         e                           c      ",
  "   e                                    c                 e ",
  "                      c                             e       ",
  "   c                        e                               ",
  "           c                      e   c                     ",
  "                                             e              ",
  "         c            e                             c       ",
  "                              c         e                   ",
  "     c           e                                          ",
  "                      c         e             c       e     ",
  "   e                                                        ",
  "                                                            "
];

//Declar variables
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
var fireCounter;
var dieCounter;
var mapX;

//Load in custom font
function preload() {
  fontRegular = loadFont("../assets/webfonts/air_mitalic.ttf");
}

//Create tile map based on array
function initTilemap() {
  for (var i = 0; i < tilemap.length; i++) {
    for (var j = 0; j < tilemap[i].length; j++) {
      switch (tilemap[i][j]) {
        case "b"://If its a blue tile
          tiles.push(new purpleTileObj(j * 20, i * 20));
          break;
        case "w"://If its a wall
          walls.push(new wallObj(j * 20, i * 20));
          break;
      }
      switch (tilemap2[i][j]) {
        case "c"://If its a cup
          cups.push(new cupObj(j * 20, i * 20));
          break;
        case "e":
          enemies.push(new enemyObj(j * 20, i * 20));
          break;
      }
    }
  }
}

//Set up all variables 
function setup() {
  images = [];
  score = 0;
  animationCount = 0;
  gameScreenCount = 0;
  timer = 0;
  gameStart = false;
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
  dieCounter = 0;
  fireCounter = 0;
  activeBullets = [];
  bulletBank = [];
  for (var i = 0; i <20; i++){
    bulletBank.push(new JellybeanObj(0,0,0));
  }
  

  createCanvas(400, 400);
  initTilemap();
  //Get the images for the prize and portrait
  customPrize();
  customPortrait();
  rectMode(CORNER);
  //Make the player
  player = new Player(200, 200);
  players.push(player);
  mapX = player.x;
}

function mouseClicked() {
  var xCor = mouseX;
  var yCor = mouseY;
  //If the user clicks on the canvas while on the game screen, start the game
  if (showIntro && xCor >= 0 &&
    xCor <= width &&
    yCor >= 0 &&
    yCor < height) {
    gameStart = true;
  }
  //If the user clicks replay, start it all over
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
  //Restart game
  if (replay) {
    setup();
    textAlign(LEFT);
  }
  timer++;
  background(255);
  //Move player
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
  //The player wins once they collect 20 cups
  if (score == 20) {
    drawWin();
    stillPlaying = false;
  }
  //End game if user hits enemy
  if (player.dead) {
    dieCounter++
    if(dieCounter < 60){
      player.angle += PI/20;
    }
    else if(player.y < height +50 ){
      player.y +=10
    }
    else{
      drawGameOver();
    }
    stillPlaying = false;
  }
}

//Move player based on arrow keys
function movePlayer() {
  fireCounter--;
  if (keyIsDown(LEFT_ARROW)) {
    player.rotateCounterClockwise();
  } else if (keyIsDown(RIGHT_ARROW)) {
    player.rotateClockwise();
  } if (keyIsDown(UP_ARROW)) {
    player.moveForward();
  } else if (keyIsDown(DOWN_ARROW)) {
    player.moveBackward();
  }
  if(keyIsDown(32) && fireCounter < 0){
      var newBullet = findFreeBullet();
      newBullet.fire(player.x, player.y, player.angle);
      fireCounter = 20
  }
}

function findFreeBullet(){
  for (var i = 0; i < bulletBank.length; i++){
    if(!bulletBank[i].active){
      return bulletBank[i];
    }
  }
  return null;
}

//Draw win screen
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

//Draw game over
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
  //Show score
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
  //Draw letters one at time
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

  //Move the rectangles down to animate drinking the liquid
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

  //Add instructions for the user
  textFont(fontRegular);
  textSize(bajaSize);
  fill(120, 222, 191);
  textStyle(BOLD);
  text("BAJA", 20, 80);
  textSize(blastedSize);
  text("BLASTED", 50, 150);
  textSize(30);
  text("Collect all 20       to win", 50, 200);
  text("Avoid all enemies", 50, 250);
  text("Press spacebar to shoot", 50, 300)
  text("Press mouse to begin game", 50, 370);
  let enemy = new enemyObj(270, 235);
  enemy.draw();
  let bullet = new JellybeanObj(340, 290, 0);
  bullet.draw();
  image(images[0], 230, 150, 100, 80);
}

//Draw games
function drawGame() {
  push();
  rectMode(CORNER);
  if(mapX > 1000){
    translate(-800, 0);
  }
  else if(mapX>200){
  translate(200-mapX, 0);
  }

  //Draw tiles
  for (var i = 0; i < tiles.length; i++) {
    tiles[i].draw();
  }
  //Draw walls
  for (i = 0; i < walls.length; i++) {
    walls[i].draw();
  }
  //Draw prize cups if they haven't been hit
  for (i = 0; i < cups.length; i++) {
    if (!cups[i].hit) {
      cups[i].draw();
      cups[i].checkHit();
    }
  }
  //Draw enemies and move them
  for (i = 0; i < enemies.length; i++) {
    if(!enemies[i].hit){
    if (stillPlaying) {
      enemies[i].move();
      enemies[i].checkHit();
    }
    enemies[i].draw();
    }
  }
  for (i = 0; i < bulletBank.length; i++) {
    if(bulletBank[i].active){
      bulletBank[i].draw();
      bulletBank[i].move();
    }

  }
  player.draw();
  pop();
  stroke(0);
  noFill();
  rect(280, 5, 108, 10);
  fill(120, 222, 191);
  stroke(120, 222, 191);
  //Draw bar to show score progress
  if (score != 0) {
    rect(284, 8, score * 5, 4);
  }
}
