/*
Name: Ryan Landry
This program plays a simple game of pong using the 2 letters "R" and "y".
First my logo animation is run, once it is run the user can click on my logo to start the game. 
Once the game is started, the letters will move in a random direction at a random speed.
If the letter hits the top or the sides, it will bounce.
The user must use the left and right arrow keys to move the paddle at the bottom of the screen to prevent the letters from touching the bottom.
If a letter touches the bottom, the game is over.
If the user gets 20 points, they win.
Once the game ends, the user can choose to replay.
*/

//Create variables
let sunset1,
  sunset2,
  grass,
  name,
  truck,
  nameXCoords,
  nameYCoords,
  startingNameXCoords,
  startingNameYCoord,
  dog;
var count, letters, doneFloating, bar, gameStart, gameOver, score, won, replay;

function setup() {
  createCanvas(600, 500);
  count = 0;

  // Define colors
  sunset1 = color(46, 91, 132);
  sunset2 = color(196, 56, 20);
  grass = color(0, 90, 0);
  babyBlue = color(137, 207, 240);

  //Define objects
  truck = new Truck(0, 340);
  dog = new Dog(-40, 350);
  bar = new Bar(width / 2 - 50, height - 20);

  //Define game states
  gameStart = false;
  gameOver = false;
  won = false;
  replay = false;
  score = 0;

  //Set coordinates for circles for initials
  rXCoords = [
    -26,
    -27,
    -26,
    -27,
    -26,
    -27,
    -18,
    -12,
    -8,
    -8,
    -12,
    -20,
    -18,
    -14,
    -10,
    -6,
  ];
  yXCoords = [6, 10, 14, 18, 30, 28, 24, 20, 16, 14, 10, 8, 6];
  rYCoords = [
    0,
    -8,
    -16,
    -24,
    -32,
    -40,
    -40,
    -38,
    -32,
    -24,
    -20,
    -20,
    -12,
    -8,
    -4,
    0,
  ];
  yYCoords = [-12, -8, -4, 0, -12, -8, -4, 0, 4, 8, 12, 16, 20];

  startingXCoords = [width / 2 - 30, width / 2, width / 2 + 30];
  startingYCoord = height - height / 3.5;

  doneFloating = false;

  //Make each letter
  letters = [];
  letters.push(new Letter(rXCoords, rYCoords));
  letters.push(new Letter(yXCoords, yYCoords));
}

//This class represets a letter which is composed of many Name Circles
//Each letter will move as one
class Letter {
  constructor(xCoords, yCoords) {
    this.nameCircles = [];
    //Pick a random speed between 1-4 pixels per frame
    let speed = random(1, 5);
    //Pick random direction
    angleMode(DEGREES);
    let angle = random(0, 360);
    //Determine x and y speed
    this.xDir = speed * cos(angle);
    this.yDir = speed * sin(angle);

    //Make all of the name circles
    for (var i = 0; i < xCoords.length; i++) {
      this.nameCircles.push(
        new NameCircle(
          startingXCoords[i % 3],
          startingYCoord,
          xCoords[i] + width / 2,
          yCoords[i] + height / 3
        )
      );
    }
  }

  draw() {
    //Draw each name circle
    for (var i = 0; i < this.nameCircles.length; i++) {
      this.nameCircles[i].draw();
    }
  }

  float() {
    //Make each name circle float to final position
    for (var i = 0; i < this.nameCircles.length; i++) {
      this.nameCircles[i].float();
    }
  }

  checkDone() {
    //Check to see if all of the name circles are at their final position
    var done = true;
    for (var i = 0; i < this.nameCircles.length; i++) {
      if (!this.nameCircles[i].checkDone()) {
        done = false;
      }
    }
    return done;
  }

  bounce() {
    //Bounce letters off of top, left, and right border and paddle
    let horizontal = false;
    let top = false;
    let paddle = false;
    for (var i = 0; i < this.nameCircles.length; i++) {
      //Move letter in random direction
      this.nameCircles[i].x += this.xDir;
      this.nameCircles[i].y += this.yDir;
      //If it hits the paddle
      if (
        this.nameCircles[i].y > bar.y - 5 &&
        this.nameCircles[i].x > bar.x - 5 &&
        this.nameCircles[i].x < bar.x + 105
      ) {
        paddle = true;
      } else if (this.nameCircles[i].y > bar.y - 5) {
        //If it hits the bottom, end game
        gameOver = true;
        count = 0;
      }
      //If it hits one of the sides
      if (this.nameCircles[i].x < -5 || this.nameCircles[i].x > width + 5) {
        horizontal = true;
      }
      if (this.nameCircles[i].y < -5) {
        top = true;
      }
    }
    //Reverse directions
    if (horizontal) {
      this.xDir = this.xDir * -1;
    }
    if (top) {
      this.yDir = this.yDir * -1;
    } else if (paddle) {
      this.yDir = this.yDir * -1;
      //Add a point to the score for each paddle hit
      score++;
      //User wins game if they reach 20 points
      if (score == 20) {
        gameOver = true;
        won = true;
      }
    }
  }
}

//This class represents the truck that drives across the screen
class Truck {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    noStroke();
    //Draw outer wheels
    fill(100);
    circle(this.x - 50, this.y + 20, 40);
    circle(this.x + 50, this.y + 20, 40);
    //Draw inner wheels and tailpipe
    fill(194, 197, 204);
    rect(this.x - 110, this.y + 15, 20, 5, 5);
    circle(this.x - 50, this.y + 20, 20);
    circle(this.x + 50, this.y + 20, 20);
    //Draw truck body
    fill(babyBlue);
    rect(this.x - 100, this.y - 10, 190, 30, 5);
    rect(this.x - 10, this.y - 40, 40, 35, 3);
    triangle(
      this.x + 29,
      this.y - 10,
      this.x + 29,
      this.y - 40,
      this.x + 50,
      this.y - 10
    );
    //Draw window
    fill(255);
    rect(this.x - 5, this.y - 35, 30, 20, 5, 5, 0, 0);
    triangle(
      this.x + 22,
      this.y - 15,
      this.x + 22,
      this.y - 35,
      this.x + 35,
      this.y - 15
    );
    rect(this.x - 5, this.y, 15, 5, 5);
  }

  //Move truck to the right
  drive(speed) {
    this.x += speed;
  }
}

//This class represents the circles that make up my name on the screen
class NameCircle {
  constructor(startingX, startingY, finalX, finalY) {
    this.x = startingX;
    this.y = startingY;
    this.finalX = finalX;
    this.finalY = finalY;
  }

  draw() {
    fill(175, 212, 219);
    noStroke();
    ellipse(this.x, this.y, 10, 10);
  }

  //Move the circle closer in the direction of it final coordinate
  //Uses random values for visual effect of "floating"
  float() {
    if (this.x - this.finalX > 1) {
      this.x -= random(1, 50);
    }
    if (this.finalX - this.x > 1) {
      this.x += random(1, 50);
    }
    if (this.y - this.finalY > 1) {
      this.y -= random(1, 50);
    }
    if (this.finalY - this.y > 1) {
      this.y += random(1, 50);
    }
  }

  checkDone() {
    if (abs(this.x - this.finalX) <= 1 && abs(this.y - this.finalY) <= 1) {
      return true;
    }
    return false;
  }
}

//This class represents the dog that appears in the back of the truck
class Dog {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    //Draw head
    ellipse(this.x, this.y, 30, 35);
    fill(0);
    //Draw eyes
    ellipse(this.x - 5, this.y - 5, 5, 8);
    ellipse(this.x + 5, this.y - 5, 5, 8);
    //Draw ears
    ellipse(this.x - 14, this.y - 3, 10, 20);
    ellipse(this.x + 14, this.y - 3, 10, 20);
    //Draw nose
    ellipse(this.x, this.y + 5, 6, 4);
    //Draw tongue
    fill(255, 0, 0);
    ellipse(this.x, this.y + 11, 5, 7);
    //Draw snout
    noFill();
    stroke(0);
    arc(this.x - 5, this.y + 5, 6, 6, 0, PI);
    arc(this.x + 5, this.y + 5, 6, 6, 0, PI);
  }

  //Move dog upwards
  popup() {
    this.y--;
  }

  //Move dog to the right
  drive(speed) {
    this.x += speed;
  }
}

class Bar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    rect(this.x, this.y, 100, 20);
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= 5;
    }
  }

  moveRight() {
    if (this.x < width - 100) {
      this.x += 5;
    }
  }
}

function mouseClicked() {
  var xCor = mouseX;
  var yCor = mouseY;
  //if clicked the logo once it was created
  if (
    xCor > width / 2 - 27 &&
    xCor < width / 2 + 30 &&
    yCor > height / 3 - 40 &&
    yCor < height / 3 + 20 &&
    doneFloating
  ) {
    gameStart = true;
  }
  //If clicked replay button while on the end screen
  if (
    xCor > width / 2 - 70 &&
    xCor < width / 2 + 70 &&
    yCor > height / 3 + 80 &&
    yCor < height / 3 + 130 &&
    gameOver
  ) {
    replay = true;
  }
}

//Creates the road for the truck to drive on
function drawRoad() {
  //Draw black part of road
  fill(0);
  rect(0, height - height / 4 - 30, width, 60);
  //Draw stripes on road
  fill(255);
  let count = 10;
  while (count < width) {
    rect(count, height - height / 4 - 2.5, 20, 10);
    count += 50;
  }
}

//Uses gradient to draw sunset background
function drawSunset() {
  //Draw gradient for sunset
  noFill();
  for (let i = 0; i <= height / 2; i++) {
    let inter = map(i, 0, height / 2, 0, 1);
    let c = lerpColor(sunset1, sunset2, inter);
    stroke(c);
    line(0, i, width, i);
  }
}

//Checks to see if all letters have all of their name circles in their final positions
function checkAllLettersDoneFloating() {
  var allDone = true;
  for (var i = 0; i < letters.length; i++) {
    if (!letters[i].checkDone()) {
      allDone = false;
    }
  }
  return allDone;
}
function draw() {
  if (!gameOver) {
    // Background
    drawSunset();
    noStroke();
    //Draw moon
    fill(194, 197, 204);
    circle(width - 120, 60, 80);
    fill(0);
    //Draw mountains
    triangle(20, height / 2, 100, height / 2, 60, height / 4);
    triangle(70, height / 2, 160, height / 2, 115, height / 3);
    triangle(
      width - 10,
      height / 2,
      width - 100,
      height / 2,
      width - 55,
      height / 4
    );
    triangle(
      width - 70,
      height / 2,
      width - 160,
      height / 2,
      width - 115,
      height / 3
    );
    //Draw grass
    fill(grass);
    rect(0, height - height / 2, width, height / 2);
    drawRoad();
    //Move dog and truck to middle of screen
    if (truck.x < width / 2 && count == 0) {
      truck.drive(2);
      dog.drive(2);
    } else {
      //Make dog pop up from truck
      if (dog.y > truck.y - 25) {
        dog.popup();
      }
      count++;
      dog.draw();
    }
    truck.draw();

    //Check to see if letters are done floating
    doneFloating = checkAllLettersDoneFloating();

    //Have truck and dog speed off after 3 seconds
    if (count > frameRate() * 3) {
      if (truck.x < width + 160) {
        truck.drive(5);
        dog.drive(5);
      }
      //Have circles appear and float to form name
      if (truck.x > width / 2 + 100) {
        for (var i = 0; i < letters.length; i++) {
          if (
            count % 3 == 0 &&
            count > frameRate() * 3.4 &&
            !doneFloating &&
            !gameStart
          ) {
            letters[i].float();
          } else if (gameStart && !gameOver) {
            //If the user has started the game
            fill(0);
            //Show score inside moon
            textSize(15);
            textAlign(CENTER);
            text("SCORE:", width - 120, 55);
            text(score, width - 120, 75);
            //Move letters
            letters[i].bounce();
            //Move paddle if keys are held down
            if (keyIsDown(LEFT_ARROW)) {
              bar.moveLeft();
            } else if (keyIsDown(RIGHT_ARROW)) {
              bar.moveRight();
            }
            bar.draw();
          }
          letters[i].draw();
        }
      }
    }
  } else if (replay) {
    //If user chooses to replay game
    setup();
  } else if (won) {
    //If user has reached 20 points show end screen
    background(0);
    //Draw replay button
    fill(255, 112, 52);
    rect(width / 2 - 70, height / 3 + 85, 140, 50, 10);
    //Show text with score
    fill(255);
    textSize(50);
    textAlign(CENTER);
    textStyle(BOLD);
    text("YOU WIN", width / 2, height / 3);
    textStyle(NORMAL);
    textSize(30);

    text("SCORE: " + score, width / 2, height / 3 + 40);
    text("REPLAY", width / 2, height / 3 + 120);
  } else {
    //If user loses
    background(0);
    //Draw replay button
    fill(255, 112, 52);
    rect(width / 2 - 70, height / 3 + 85, 140, 50, 10);
    fill(255);
    //Show text with score
    textSize(50);
    textAlign(CENTER);
    textStyle(BOLD);
    text("GAME OVER", width / 2, height / 3);
    textStyle(NORMAL);
    textSize(30);
    text("SCORE: " + score, width / 2, height / 3 + 40);
    text("REPLAY", width / 2, height / 3 + 120);
  }
}
