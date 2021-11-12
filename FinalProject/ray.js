//Represents sun rays that fall in summer
class ray {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 2;
  }

  draw() {
    noFill();
    strokeWeight(5);
    stroke(254, 177, 37);
    bezier(
      this.x,
      this.y - 15,
      this.x - 10,
      this.y - 8,
      this.x + 10,
      this.y + 8,
      this.x,
      this.y + 15
    );
    strokeWeight(1);
  }

  fall() {
    this.y += this.speed;
    if (this.y > height + 10) {
      this.y = 0;
      this.x = random((3 * width) / 4 + 10, width - 10);
    }
  }
}
