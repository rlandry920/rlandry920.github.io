class rabbit {
  constructor(x, y) {
    this.position = new p5.Vector(x, y);
    this.movingRight = false;
    this.movingLeft = false;
    this.rightArmAngle = PI / 8;
    this.rightArmDir = 1;
    this.leftArmAngle = PI / 8;
    this.leftArmDir = 1;
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
    this.force = new p5.Vector(0, 0);
    this.jump = 0;
    this.walkRight = 0;
    this.walkLeft = 0;
  }

  draw() {
    noStroke();
    fill(255);
    rect(this.position.x-8, this.position.y+32, 8, 15, 5)
        rect(this.position.x+8, this.position.y+32, 8, 15, 5)

        ellipse(this.position.x, this.position.y+20, 25, 30)
    ellipse(this.position.x, this.position.y, 30, 25);
    stroke(0)
        rect(this.position.x-5, this.position.y+20, 5, 10, 5)
        rect(this.position.x+5, this.position.y+20, 5, 10, 5)
    noStroke()
        rect(this.position.x, this.position.y+15, 20, 3)

    push();
    translate(this.position.x, this.position.y);
    rotate(-PI / 12);
    translate(-this.position.x, -this.position.y);
    ellipse(this.position.x - 5, this.position.y - 20, 10, 20);
    fill(0);
    ellipse(this.position.x - 5, this.position.y - 15, 5, 10);
    fill(255);
    pop();
    push();
    translate(this.position.x, this.position.y);
    rotate(PI / 12);
    translate(-this.position.x, -this.position.y);
    ellipse(this.position.x + 5, this.position.y - 20, 10, 20);
    fill(0);
    ellipse(this.position.x + 5, this.position.y - 15, 5, 10);
    fill(255);
    pop();
    fill(255, 0, 0);
    ellipse(this.position.x - 5, this.position.y - 5, 5, 5);
    ellipse(this.position.x + 5, this.position.y - 5, 5, 5);
    arc(this.position.x, this.position.y + 4, 15, 10, 0, PI, PIE);
    fill(0);
    triangle(
      this.position.x + 3,
      this.position.y - 2,
      this.position.x - 3,
      this.position.y - 2,
      this.position.x,
      this.position.y+2
    );
  }
}
