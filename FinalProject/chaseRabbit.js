//When the player is more than 200 pixels away, wander
class wanderState {
  constructor() {
    this.wanderDist = 0;
    this.dir = 0.8;
  }
  execute(me) {
    //Pick a distance to wander and a direction to wander in
    if (this.wanderDist == 0) {
      this.wanderDist = int(random(50, 100));
      this.dir = random([-me.speed, me.speed]);
    }
    //Move towards wander destination
    this.wanderDist--;
    me.position.add(this.dir, 0);

    //Change directions if the rabbit runs in to a wall
    for (var i = 0; i < blocks[currLevel].length; i++) {
      if (
        (abs(blocks[currLevel][i].y + 20 - me.position.y) < 30 &&
          abs(blocks[currLevel][i].x + 20 - me.position.x) < 35) ||
        me.position.x < 20 ||
        me.position.x > maxPlayerX - 20
      ) {
        me.position.add(-this.dir * 5, 0);
        this.dir = -this.dir;
        this.wanderDist += 5;
      }
    }
    //Start chasing if either bear is within 200 pixels
    if (
      dist(
        me.position.x,
        me.position.y,
        brownBearPlayer.position.x,
        brownBearPlayer.position.y
      ) < 200
    ) {
      me.changeState(1);
      me.bearChasing = brownBearPlayer;
    } else if (
      dist(
        me.position.x,
        me.position.y,
        blackBearPlayer.position.x,
        blackBearPlayer.position.y
      ) < 200
    ) {
      me.changeState(1);
      me.bearChasing = blackBearPlayer;
    }
  }
} // wanderState

//If the user is less than 200 pixels away, chase
class chaseState {
  execute(me) {
    //Move toward the bear you are chasing
    if (me.position.x < me.bearChasing.position.x) {
      me.velocity.set(me.speed, 0);
    } else {
      me.velocity.set(-me.speed, 0);
    }

    me.velocity.add(me.acceleration);
    me.acceleration.set(0, 0);
    me.position.add(me.velocity);
    //Make sure not to walk through walls
    for (var i = 0; i < blocks[currLevel].length; i++) {
      if (
        abs(blocks[currLevel][i].y + 20 - me.position.y) < 30 &&
        abs(blocks[currLevel][i].x + 20 - me.position.x) < 35
      ) {
        if (me.position.x > blocks[currLevel][i].x) {
          me.position.add(5, 0);
        }
        if (me.position.x < blocks[currLevel][i].x) {
          me.position.add(-5, 0);
        }
      }
    }
    //Wander if both bears are further than 200 pixels away
    if (
      dist(
        me.position.x,
        me.position.y,
        me.bearChasing.position.x,
        me.bearChasing.position.y
      ) > 200
    ) {
      me.changeState(0);
    }
  }
} // chaseState

//This class represents the rabbits that appear in the last 3 levels
//The rabbit with chase either of the bears that are less than 200 pixels away
class chaseRabbit {
  constructor(x, y, speed) {
    this.position = new p5.Vector(x, y);
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
    this.force = new p5.Vector(0, 0);
    this.jump = 0;
    this.state = [new wanderState(), new chaseState()];
    this.currState = 0;
    this.count = 0;
    this.speed = speed;
    this.bearChasing = blackBearPlayer;
  }

  changeState(x) {
    this.currState = x;
  }

  applyForce(force) {
    this.acceleration.add(force);
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
      //Make the player grunt
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
      //Make the player grunt
      if (soundOn) {
        gruntNoise.play();
      }
    }
  }
}
