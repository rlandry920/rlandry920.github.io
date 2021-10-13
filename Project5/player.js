//This class represents the user's player.
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 1;
    this.angle = 0;
    this.dead = false;
    this.fireCounter = 0;
    this.rapidFireCounter = 0;
    this.bulletBank = [];
    this.scopeCounter = 0;
    this.shieldCounter = 100;
    for (var i = 0; i < 50; i++) {
      this.bulletBank.push(new playerBullet());
    }
  }

  draw() {
    for (i = 0; i < this.bulletBank.length; i++) {
      if (this.bulletBank[i].active) {
        this.bulletBank[i].draw();
        this.bulletBank[i].move();
      }
    }
    if (this.scopeCounter > 0) {
      drawingContext.setLineDash([5, 15]);
      line(
        this.x,
        this.y,
        this.x + 400 * cos(this.angle),
        this.y + 400 * sin(this.angle)
      );
      drawingContext.setLineDash([]);
      this.scopeCounter--;
    }
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(0, 0, 255);
    rect(0, 0, 20, 20);
    rect(10, 0, 20, 4);
    pop();
    
    if (this.shieldCounter > 0) {
      fill(0, 0, 255, 100)
      circle(this.x, this.y, 50)
      this.shieldCounter--;
    }

    if (this.fireCounter > 0) {
      this.fireCounter--;
    }
    
    if (this.rapidFireCounter > 0) {
      this.rapidFireCounter--;
    }
  }

  rotateClockwise() {
    this.angle += PI / 80;
    if (this.angle > PI) {
      this.angle = -angle179;
    } else if (this.angle < -PI) {
      this.angle = angle179;
    }
  }

  rotateCounterClockwise() {
    this.angle -= PI / 80;
    if (this.angle > PI) {
      this.angle = -angle179;
    } else if (this.angle < -PI) {
      this.angle = angle179;
    }
  }

  //Move forward at an angle
  moveForward() {
    this.x += this.speed * cos(this.angle);
    this.y += this.speed * sin(this.angle);
    for (var i = 0; i < walls.length; i++) {
      if (dist(this.x, this.y, walls[i].x, walls[i].y) < 30) {
        this.x -= 2 * cos(this.angle);
        this.y -= 2 * sin(this.angle);
      }
    }
    for (i = 0; i < enemies.length; i++) {
      if (dist(this.x, this.y, enemies[i].position.x, enemies[i].position.y) < 30) {
        this.x -= 2 * cos(this.angle);
        this.y -= 2 * sin(this.angle);
      }
    }
  }

  //Move backward at the opposite angle
  moveBackward() {
    this.x -= this.speed * cos(this.angle);
    this.y -= this.speed * sin(this.angle);
    for (var i = 0; i < walls.length; i++) {
      if (dist(this.x, this.y, walls[i].x, walls[i].y) < 30) {
        this.x += 2 * cos(this.angle);
        this.y += 2 * sin(this.angle);
      }
    }
    for (i = 0; i < enemies.length; i++) {
      if (dist(this.x, this.y, enemies[i].position.x, enemies[i].position.y) < sqrt(800)) {
        this.x += 2 * cos(this.angle);
        this.y += 2 * sin(this.angle);
      }
    }
  }

  fire() {
    if (this.fireCounter <= 0) {
      var newBullet = this.findFreeBullet();
      newBullet.fire(this.x, this.y, this.angle);
      if(this.rapidFireCounter > 0){
      this.fireCounter = 0.5 * frameRate();
      }else{
        this.fireCounter = 1 * frameRate();
      }
    }
  }

  findFreeBullet() {
    for (var i = 0; i < this.bulletBank.length; i++) {
      if (!this.bulletBank[i].active) {
        return this.bulletBank[i];
      }
    }
    return null;
  }

  checkHit() {
    for (var e = 0; e < enemies.length; e++) {
      for (i = 0; i < enemies[e].state[1].bulletBank.length; i++) {
        if (this.shieldCounter >0 &&
          enemies[e].state[1].bulletBank[i].active &&
          dist(
            enemies[e].state[1].bulletBank[i].x,
            enemies[e].state[1].bulletBank[i].y,
            this.x,
            this.y
          ) < 30
        ) {
          enemies[e].state[1].bulletBank[i].active = false;
        }
        else if (
          enemies[e].state[1].bulletBank[i].active &&
          dist(
            enemies[e].state[1].bulletBank[i].x,
            enemies[e].state[1].bulletBank[i].y,
            this.x,
            this.y
          ) < 20
        ) {
          gameOver = true;
          enemies[e].state[1].bulletBank[i].active = false;
        }
      }
    }
  }
}
