//This class represents the rabbits that are in the fall level
class rabbit {
  constructor(x, y, speed, minX, maxX) {
    this.position = new p5.Vector(x, y);
    this.speed = speed;
    this.minX = minX;
    this.maxX = maxX;
  }

  draw() {
    noStroke();
    fill(255);
    //legs
    rect(this.position.x - 8, this.position.y + 32, 8, 15, 5);
    rect(this.position.x + 8, this.position.y + 32, 8, 15, 5);
    //body
    ellipse(this.position.x, this.position.y + 20, 25, 30);
    ellipse(this.position.x, this.position.y, 30, 25);
    stroke(0);
    //arms
    rect(this.position.x - 5, this.position.y + 20, 5, 10, 5);
    rect(this.position.x + 5, this.position.y + 20, 5, 10, 5);
    noStroke();
    rect(this.position.x, this.position.y + 15, 20, 3);
    //ears
    push();
    translate(this.position.x, this.position.y);
    rotate(-PI / 12);
    translate(-this.position.x, -this.position.y);
    ellipse(this.position.x - 5, this.position.y - 20, 10, 20);
    fill(0);
    ellipse(this.position.x - 5, this.position.y - 15, 5, 10);
    fill(255);
    pop();
    push();
    translate(this.position.x, this.position.y);
    rotate(PI / 12);
    translate(-this.position.x, -this.position.y);
    ellipse(this.position.x + 5, this.position.y - 20, 10, 20);
    fill(0);
    ellipse(this.position.x + 5, this.position.y - 15, 5, 10);
    fill(255);
    pop();
    //eyes
    fill(255, 0, 0);
    ellipse(this.position.x - 5, this.position.y - 5, 5, 5);
    ellipse(this.position.x + 5, this.position.y - 5, 5, 5);
    //mouth
    arc(this.position.x, this.position.y + 4, 15, 10, 0, PI, PIE);
    fill(0);
    //nose
    triangle(
      this.position.x + 3,
      this.position.y - 2,
      this.position.x - 3,
      this.position.y - 2,
      this.position.x,
      this.position.y + 2
    );
  }

  //Move back and forth and change direction when hit max or min
  move() {
    this.position.x += this.speed;
    if (this.position.x < this.minX || this.position.x > this.maxX) {
      this.speed = -this.speed;
    }
  }

  //Check to see if either player hit the rabbit
  //If so, the user loses a life
  checkHit() {
    if (
      abs(this.position.x - blackBearPlayer.position.x) < 40 &&
      abs(this.position.y - blackBearPlayer.position.y) < 20 &&
      blackBearPlayer.hitTimer == 0
    ) {
      livesLeft--;
      blackBearPlayer.hitTimer = 200;
      if (soundOn) {
        gruntNoise.play();
      }
    }
    if (
      abs(this.position.x - brownBearPlayer.position.x) < 40 &&
      abs(this.position.y - brownBearPlayer.position.y) < 20 &&
      brownBearPlayer.hitTimer == 0
    ) {
      livesLeft--;
      brownBearPlayer.hitTimer = 200;
      if (soundOn) {
        gruntNoise.play();
      }
    }
  }
}
