class playerObj {
  constructor(x, y) {
    this.position = new p5.Vector(x, y);
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
    this.force = new p5.Vector(0, 0);
    this.jump = 0;
    this.walkForward = 0;
    this.walkBackward = 0;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  //Move based on forces being applied
  update() {
    this.acceleration.set(0, 0);
    if (this.walkForward === 1) {
      this.velocity.x = walkForce.x;
    }
    if (this.walkBackward === 1) {
      this.velocity.x = backForce.x;
    }
    if (this.walkForward === 0 && this.walkBackward == 0) {
      this.velocity.x = 0;
    }
    if (this.jump === 2) {
      this.applyForce(jumpForce);
      this.jump = 1;
    }
    if (this.jump > 0) {
      this.applyForce(gravity);
    }
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.set(0, 0);

    if (this.position.x < 37) {
      this.position.x += 5;
    } else if (this.position.x > 800 - 37) {
      this.position.x -= 5;
    }
    player.checkWalls();

  }

  draw() {
    noStroke();
    fill(213, 126, 36);
    rect(this.position.x - 8, this.position.y, 16, 20);
    quad(
      this.position.x - 8,
      this.position.y + 15,
      this.position.x,
      this.position.y + 20,
      this.position.x - 2,
      this.position.y + 30,
      this.position.x - 10,
      this.position.y + 30
    );
    quad(
      this.position.x + 8,
      this.position.y + 15,
      this.position.x,
      this.position.y + 20,
      this.position.x + 2,
      this.position.y + 30,
      this.position.x + 10,
      this.position.y + 30
    );
    quad(
      this.position.x + 5,
      this.position.y + 10,
      this.position.x + 8,
      this.position.y + 8,
      this.position.x + 16,
      this.position.y + 20,
      this.position.x + 12,
      this.position.y + 22
    );
    circle(this.position.x + 14, this.position.y + 21, 4);
    quad(
      this.position.x - 5,
      this.position.y + 10,
      this.position.x - 8,
      this.position.y + 8,
      this.position.x - 16,
      this.position.y + 20,
      this.position.x - 12,
      this.position.y + 22
    );
    circle(this.position.x - 14, this.position.y + 21, 4);
    ellipse(this.position.x - 9, this.position.y + 30, 16, 6);

    ellipse(this.position.x + 9, this.position.y + 30, 16, 6);
    circle(this.position.x, this.position.y, 20); // head
    fill(255, 0, 0);
    circle(this.position.x, this.position.y + 12, 5);
    circle(this.position.x, this.position.y + 18, 5);
    fill(255);
    circle(this.position.x - 4, this.position.y - 2, 5);
    circle(this.position.x + 4, this.position.y - 2, 5);
    strokeWeight(1);
    stroke(255);
    noFill();
    bezier(
      this.position.x - 4,
      this.position.y + 5,
      this.position.x - 2,
      this.position.y + 7,
      this.position.x + 2,
      this.position.y + 7,
      this.position.x + 4,
      this.position.y + 5
    );
  }

  checkWalls() {
    var standing = false;
    if (this.position.y + 33 > height - 20) {
      this.position.y = height - 53;
      this.velocity.y = 0;
      this.jump = 0;
      standing = true;
      return;
    }
    for (var i = 0; i < walls.length; i++) {
      if (
        (walls[i].y + 10) >= (this.position.y + 30) &&
        ((walls[i].y - 10) - (this.position.y + 33)) < 0.5 &&
        abs(walls[i].x - this.position.x) < 17
      ) {
        if (this.velocity.y >= 0) {
          this.position.y = walls[i].y - 43;
          this.velocity.y = 0;
          this.jump = 0;
          standing = true;
        }
      }
    }
    if (!standing) {
      this.jump = 1;
    }
  }

  //See if any enemies hit the player
  checkHit() {
    for (var i = 0; i < enemies.length; i++) {
      if (enemies[i].velocity.y >= 0 &&
        !enemies[i].hit && this.jump > 0 &&
        this.velocity.y > 0 &&
        this.position.y < enemies[i].position.y &&
        enemies[i].position.y - this.position.y - 45 < 1 &&
        abs(enemies[i].position.x - this.position.x) < 27
      ) {
        enemies[i].hit = true;
        enemies[i].count = 30;
        this.jump = 2;
      }
      if (!enemies[i].hit) {
        if (
          ((enemies[i].position.y > this.position.y &&
            enemies[i].position.y - this.position.y < 44) ||
            (enemies[i].position.y < this.position.y &&
              this.position.y - enemies[i].position.y < 20)) &&
          abs(enemies[i].position.x - this.position.x) < 27
        ) {
          gameOver = true;
        }
      }
    }
  }
}
