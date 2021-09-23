//This class represents the bullet that the user shoots
class JellybeanObj {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.angle = angle;
    this.active = false;
    this.count = 0;
    this.color = color(random(255), random(255), random(255));

  }

  fire(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.active = true;
    this.color = color(random(255), random(255), random(255));
  }

  //Randomly change colors
  draw() {
    this.count++;
    push();
    if(this.count == 15){
    this.color = color(random(255), random(255), random(255));
      this.count = 0;
    }
    fill(this.color);
    translate(this.x, this.y);
    rotate(this.angle);
    translate(-this.x, -this.y);
    noStroke();
    circle(this.x - 1, this.y - 4, 6);
    circle(this.x - 1, this.y + 4, 6);
    ellipse(this.x + 1, this.y, 6, 12);
    pop();
  }

  //Move in the directiont that it was shot
  move() {
    this.x += this.speed * cos(this.angle - PI / 2);
    this.y += this.speed * sin(this.angle - PI / 2);
    this.checkCollision();
  }

  //Check to see if it has hit a wall
  //If it hits a wall, it disappears
  checkCollision() {
    for (var i = 0; i < walls.length; i++) {
      if (
        (this.x < walls[i].x &&
          walls[i].x - this.x < 10 &&
          this.y > walls[i].y - 10 &&
          this.y < walls[i].y + 30) ||
        (this.x - walls[i].x > 0 &&
          this.x - walls[i].x < 30 &&
          this.y > walls[i].y - 10 &&
          this.y < walls[i].y + 30) ||
        (this.y - walls[i].y > 0 &&
          this.y - walls[i].y < 10 &&
          this.x > walls[i].x - 10 &&
          this.x < walls[i].x + 30) ||
        (walls[i].y - this.y > 0 &&
          walls[i].y - this.y < 10 &&
          this.x > walls[i].x - 10 &&
          this.x < walls[i].x + 30)
      ) {
        this.active = false;
      }
    }
  }
}
