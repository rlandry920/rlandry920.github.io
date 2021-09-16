class enemyObj {
  constructor(x, y, dir) {
    this.x = x;
    this.y = y;
    this.speed = 2;
    if (random() < 0.5) {
      this.speed = -this.speed;
    }
    this.dir = dir;
  }
  draw() {
    noStroke();
    fill(170, 198, 87);
    rect(this.x - 2.5, this.y, 5, 15);
    quad(
      this.x - 4.5,
      this.y - 4,
      this.x - 10,
      this.y - 2,
      this.x - 2.5,
      this.y + 8,
      this.x,
      this.y + 3
    );
    quad(
      this.x + 4.5,
      this.y - 4,
      this.x + 10,
      this.y - 2,
      this.x + 2.5,
      this.y + 8,
      this.x,
      this.y + 3
    );
    fill(62, 124, 49);
    circle(this.x - 8, this.y - 5, 8);
    circle(this.x - 1, this.y - 8, 8);
    circle(this.x + 2, this.y - 3, 8);
    circle(this.x + 8, this.y - 5, 8);
    circle(this.x - 4, this.y - 2, 8);
    circle(this.x + 3, this.y - 7, 8);

    fill(255);
    circle(this.x - 3, this.y + 5, 5);
    circle(this.x + 3, this.y + 5, 5);
    fill(0);
    circle(this.x - 3, this.y + 5, 2);
    circle(this.x + 3, this.y + 5, 2);
  }

  move() {
    if (this.dir == "h") {
      this.moveHorizontal();
    } else if (this.dir == "v") {
      this.moveVertical();
    }
  }

  moveHorizontal() {
    this.x += this.speed;
    for (var i = 0; i < walls.length; i++) {
      if (
        this.x < walls[i].x &&
        walls[i].x - this.x < 12 &&
        this.y > walls[i].y - 10 &&
        this.y < walls[i].y + 30
      ) {
        this.x -= 5;
        this.speed = -this.speed;
      }
      if (
        this.x - walls[i].x > 0 &&
        this.x - walls[i].x < 30 &&
        this.y > walls[i].y - 10 &&
        this.y < walls[i].y + 30
      ) {
        this.x += 5;
        this.speed = -this.speed;
      }
    }
  }
  moveVertical() {
    this.y -= this.speed;
    for (var i = 0; i < walls.length; i++) {
      if (
        this.y - walls[i].y > 0 &&
        this.y - walls[i].y < 32 &&
        this.x > walls[i].x - 10 &&
        this.x < walls[i].x + 30
      ) {
        this.y += 5;
        this.speed = -this.speed;
      }
      if (
        walls[i].y - this.y > 0 &&
        walls[i].y - this.y < 15 &&
        this.x > walls[i].x - 10 &&
        this.x < walls[i].x + 30
      ) {
        this.y -= 5;
        this.speed = -this.speed;
      }
    }
  }

  checkHit() {
    if (
      ((player.x >= this.x && player.x - this.x < 23) ||
        (player.x <= this.x && this.x - player.x < 23)) &&
      ((player.y >= this.y && player.y - this.y < 27) ||
        (player.y <= this.y && this.y - player.y < 20))
    ) {
      hitEnemy = true;
    }
  }
}
class purpleTileObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    noStroke();
    fill(52, 61, 152);
    rect(this.x, this.y, 20, 20);
  }
}

class cupObj {
  constructor(x, y) {
    this.x = x + 4;
    this.y = y;
    this.hit = false;
  }
  draw() {
    fill(255);
    image(images[0], this.x, this.y, 40, 40);
  }

  checkHit() {
    if (
      ((player.x >= this.x && player.x - this.x < 24) ||
        (player.x <= this.x && this.x - player.x < 15)) &&
      ((player.y >= this.y && player.y - this.y < 45) ||
        (player.y <= this.y && this.y - player.y < 15))
    ) {
      this.hit = true;
      score++;
    }
  }
}

class wallObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    noStroke();
    fill(237, 0, 140);
    rect(this.x, this.y, 20, 20);
  }
}
