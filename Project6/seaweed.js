//Seaweed sways at the bottoms

class seaweed {
  constructor(x1, y1, x2, y2) {
    this.dir = random([-1, 1]);
    this.x1 = x1;
    this.y1 = y1;
    this.cx1 = x1 + 20 * this.dir;
    this.cy1 = y1 + 10;
    this.cx2 = x2 + 20 * this.dir;
    this.cy2 = y2 - 10;
    this.x2 = x2;
    this.y2 = y2;
    this.cx1Dir = 1;
    this.cx2Dir = -1 * this.dir;
    this.x1Dir = -0.5 * this.dir;
  }

  draw() {
    strokeWeight(8);
    stroke(84, 118, 75);
    noFill();

    bezier(
      this.x1,
      this.y1,
      this.cx1,
      this.cy1,
      this.cx2,
      this.cy2,
      this.x2,
      this.y2
    );
    //Sway back and forth
    if (this.cx1 > this.cx2 && this.cx2 < this.x2 - 10) {
      this.cx1 -= this.cx1Dir;
    }
    if (this.cx1 < this.cx2 && this.cx2 > this.x2 + 10) {
      this.cx1 += this.cx1Dir;
    }
    this.cx2 += this.cx2Dir;
    if (abs(this.cx2 - this.x2) > 30) {
      this.cx2Dir = -this.cx2Dir;
    }
    this.x1 += this.x1Dir;
    if (abs(this.x1 - this.x2) > 15) {
      this.x1Dir = -this.x1Dir;
    }
  }
}
