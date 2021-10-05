class candyObj {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.hit = false;
    this.angle = angle
    this.speed = random(2, 5)
    this.color = color(random(0, 255), random(0, 255), random(0, 255))
    this.angle = angle;
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    translate(-this.x, -this.y);
    noStroke();
    fill(this.color)
    ellipse(this.x, this.y, 16, 10);
    triangle(this.x - 4, this.y, this.x - 14, this.y - 6, this.x - 14, this.y + 6)
    triangle(this.x + 4, this.y, this.x + 14, this.y - 6, this.x + 14, this.y + 6)
    stroke(255)
    line(this.x - 4, this.y - 4, this.x - 6, this.y + 3)
    line(this.x, this.y - 5, this.x - 2, this.y + 4)
    line(this.x + 4, this.y - 4, this.x + 2, this.y + 4)
    pop();

  }

  fall() {
    if (this.y < height + 6) {

      this.y += this.speed;
    }
  }

  //Check to see if player comes in contact
  checkHit() {
    if (abs(this.x - player.position.x) < 31 && ((this.y < player.position.y && player.position.y - this.y < 10) || (this.y > player.position.y && this.y - player.position.y < 33))) {
      this.hit = true;
      score += 1;
      if (score == 20) {
        gameWin = true;
      }
    }
  }

}