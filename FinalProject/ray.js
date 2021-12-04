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

  //If either bear runs into the ray, it disappears and the score goes up by 1
  checkHit() {
    if (
      (abs(this.x - blackBearPlayer.position.x) < 35 &&
        abs(this.y - blackBearPlayer.position.y) < 30) ||
      (abs(this.x - brownBearPlayer.position.x) < 35 &&
        abs(this.y - brownBearPlayer.position.y) < 30)
    ) {
      this.hit = true;
      summerScore++;
      if (soundOn) {
        sizzleNoise.play();
      }
    }
  }
}
