//This class represents the user's player.
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.angle = 0;
    this.dead = false;
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    translate(-this.x, -this.y);
    stroke(0);
    strokeWeight(1);
    if (this.dead) {
      fill(170, 198, 87);
    } else {
      fill(255);
    }
    circle(this.x, this.y, 20);
    fill(0);
    quad(
      this.x - 15,
      this.y - 5,
      this.x - 8,
      this.y - 10,
      this.x + 8,
      this.y - 10,
      this.x + 15,
      this.y - 5,
      2
    );
    rect(this.x - 7, this.y - 16, 14, 8, 2);
    if (this.dead) {
      textSize(4);
      text("x", this.x - 4, this.y);
      text("x", this.x + 2, this.y);
    } else {
      circle(this.x - 4, this.y - 1, 3);
      circle(this.x + 4, this.y - 1, 3);
    }
    line(this.x + 10, this.y - 5, this.x + 13, this.y + 10);
    line(this.x - 10, this.y - 5, this.x - 13, this.y + 10);

    stroke(255, 0, 0);
    noFill();
    if (this.dead) {
      bezier(
        this.x - 4,
        this.y + 5,
        this.x - 2,
        this.y + 3,
        this.x + 2,
        this.y + 3,
        this.x + 4,
        this.y + 5
      );
    } else {
      bezier(
        this.x - 4,
        this.y + 5,
        this.x - 2,
        this.y + 7,
        this.x + 2,
        this.y + 7,
        this.x + 4,
        this.y + 5
      );
    }
    pop();
  }

  rotateClockwise() {
    this.angle += PI / 40;
  }

  rotateCounterClockwise() {
    this.angle -= PI / 40;
  }

  //Move forward at an angle
  moveForward() {
    this.x += this.speed * cos(this.angle - PI / 2);
    mapX += this.speed * cos(this.angle - PI / 2);
    this.y += this.speed * sin(this.angle - PI / 2);
    this.checkCollision();
  }

  //Move backward at the opposite angle
  moveBackward() {
    this.x -= this.speed * cos(this.angle - PI / 2);
    mapX -= this.speed * cos(this.angle - PI / 2);
    this.y -= this.speed * sin(this.angle - PI / 2);
    this.checkCollision();
  }

  
  //Check to see if it has hit a wall
  checkCollision() {
    for (var i = 0; i < walls.length; i++) {
      if (
        this.x - walls[i].x > 0 &&
        this.x - walls[i].x < 35 &&
        this.y > walls[i].y - 10 &&
        this.y < walls[i].y + 38
      ) {
        this.x += abs(5 * cos(this.angle - PI / 2));
        mapX += abs(5 * cos(this.angle - PI / 2));
      }
      if (
        this.x < walls[i].x &&
        walls[i].x - this.x < 15 &&
        this.y > walls[i].y - 10 &&
        this.y < walls[i].y + 30
      ) {
        this.x -= abs(5 * cos(this.angle - PI / 2));
        mapX -= abs(5 * cos(this.angle - PI / 2));
      }
      if (
        this.y - walls[i].y > 0 &&
        this.y - walls[i].y < 35 &&
        this.x > walls[i].x - 10 &&
        this.x < walls[i].x + 30
      ) {
        this.y += abs(5 * sin(this.angle - PI / 2));
      }
      if (
        walls[i].y - this.y > 0 &&
        walls[i].y - this.y < 15 &&
        this.x > walls[i].x - 10 &&
        this.x < walls[i].x + 30
      ) {
        this.y -= abs(5 * sin(this.angle - PI / 2));
      }
    }
  }
}
