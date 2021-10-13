//This class represents the bullet that the user shoots
class playerBullet {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.speed = 2;
    this.angle = 0;
    this.active = false;
    this.count = 0;
  }

  fire(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.active = true;
    this.bounced = false;
  }

  //Randomly change colors
  draw() {
    this.count++;
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    translate(-this.x, -this.y);
    fill(0,0, 255);
    circle(this.x, this.y, 10);
    pop();
  }

  //Move in the directiont that it was shot
  move() {
    this.x += this.speed * cos(this.angle);
    this.y += this.speed * sin(this.angle);
    if (
      this.x <= 15 ||
      this.x >= width - 15 ||
      this.y <= 15 ||
      this.y >= height - 15
    ) {
        this.active = false;
    }
  }
}

class enemyBullet {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.speed = 1;
    this.angle = 0;
    this.active = false;
    this.count = 0;
    this.color = color(random(255), random(255), random(255));
  }

  fire(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.active = true;
    this.bounced = false;
  }

  //Randomly change colors
  draw() {
    this.count++;
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    translate(-this.x, -this.y);
    fill(255, 0, 0)
    circle(this.x, this.y, 10);
    pop();
  }

  //Move in the directiont that it was shot
  move() {
    this.x += this.speed * cos(this.angle);
    this.y += this.speed * sin(this.angle);
    if (
      this.x <= 15 ||
      this.x >= width - 15 ||
      this.y <= 15 ||
      this.y >= height - 15
    ) {
        this.active = false;
    }
  }
}
