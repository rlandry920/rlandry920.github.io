//This represents the bubbles that come out of the rock
class particleObj {
  constructor(x, y) {
    this.position = new p5.Vector(x, y);
    this.velocity = new p5.Vector(random(-0.3, 0.3), random(-1.8, -2.2));
    this.size = random(4, 6);
    this.position.y -= 18 - this.size;
    this.c1 = this.monteCarlo();
    this.timeLeft = 50;
  }

  monteCarlo() {
    var v1 = random(220, 255);
    var v2 = random(220, 255);
    while (v2 > v1) {
      v1 = random(220, 255);
      v2 = random(220, 255);
    }
    return v1;
  }

  move() {
    this.velocity.add(gravity);
    this.position.add(this.velocity);
    this.timeLeft--;
  }

  draw() {
    noStroke();
    fill(this.c1, this.c1, this.c1, this.timeLeft);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }
}
