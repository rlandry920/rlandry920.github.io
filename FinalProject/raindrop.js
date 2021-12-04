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

  //If either bear runs into the raindrop, it disappears and the score goes up by 1
  checkHit() {
    if (
      (abs(this.x - blackBearPlayer.position.x) < 35 &&
        abs(this.y - blackBearPlayer.position.y) < 30) ||
      (abs(this.x - brownBearPlayer.position.x) < 35 &&
        abs(this.y - brownBearPlayer.position.y) < 30)
    ) {
      this.hit = true;
      springScore++;
      if (soundOn) {
        raindropNoise.play();
      }
    }
  }
}
