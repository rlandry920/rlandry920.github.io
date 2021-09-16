class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 3;
  }

  draw() {
    stroke(0);
    strokeWeight(1);
    fill(255);
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
    circle(this.x - 4, this.y - 1, 3);
    circle(this.x + 4, this.y - 1, 3);
    line(this.x + 10, this.y - 5, this.x + 13, this.y + 10);
    line(this.x - 10, this.y - 5, this.x - 13, this.y + 10);

    stroke(255, 0, 0);
    noFill();
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

  moveLeft() {
    this.x -= this.speed;
    for (var i = 0; i < walls.length; i++) {
      if (
        this.x - walls[i].x > 0 &&
        this.x - walls[i].x < 35 &&
        this.y > walls[i].y-10 &&
        this.y < walls[i].y + 38
      ) {
        this.x += 8;
      }
    }
  }
  moveRight() {
    this.x += this.speed;
    for (var i = 0; i < walls.length; i++) {
      if (
        this.x < walls[i].x &&
        walls[i].x - this.x < 15 &&
        this.y > walls[i].y-10 &&
        this.y < walls[i].y + 30
      ) {
        this.x -= 8;
      }
    }
  }
  moveUp() {
    this.y -= this.speed;
    for (var i = 0; i < walls.length; i++) {
      if (
        this.y - walls[i].y > 0 &&
        this.y - walls[i].y < 40 &&
        this.x > walls[i].x-10 &&
        this.x < walls[i].x + 30
      ) {
        this.y += 8;
      }
    }
  }
  moveDown() {
    this.y += this.speed;
    for (var i = 0; i < walls.length; i++) {
      if (
        walls[i].y - this.y > 0 &&
        walls[i].y - this.y < 15 &&
        this.x > walls[i].x-10 &&
        this.x < walls[i].x + 30
      ) {
        this.y -= 8;
      }
    }
  }
}
