//Represents raindrops that fall in spring
class raindrop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 2;
  }

  draw() {
    noStroke();
    fill(161, 198, 204);
    circle(this.x, this.y, 10);
    triangle(this.x - 5, this.y, this.x + 5, this.y, this.x, this.y - 10);
  }

  fall() {
    this.y += this.speed;
    if (this.y > height + 10) {
      this.y = 0;
      this.x = random(width / 2 + 10, (3 * width) / 4 - 10);
    }
  }
}
