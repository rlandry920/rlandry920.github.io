//Represents snowflake that fall in winter
class snowflake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.hit = false;
  }

  draw() {
    stroke(255);
    line(this.x, this.y - 10, this.x, this.y + 10);
    line(this.x, this.y + 5, this.x - 4, this.y + 9);
    line(this.x, this.y + 5, this.x + 4, this.y + 9);
    line(this.x, this.y - 5, this.x - 4, this.y - 9);
    line(this.x, this.y - 5, this.x + 4, this.y - 9);
    line(this.x - 10, this.y - 5, this.x + 10, this.y + 5);
    line(this.x - 6, this.y - 3, this.x - 7, this.y - 8);
    line(this.x - 6, this.y - 3, this.x - 10, this.y - 1);
    line(this.x + 6, this.y - 3, this.x + 7, this.y - 8);
    line(this.x + 6, this.y - 3, this.x + 10, this.y - 1);
    line(this.x - 10, this.y + 5, this.x + 10, this.y - 5);
    line(this.x - 6, this.y + 3, this.x - 7, this.y + 8);
    line(this.x - 6, this.y + 3, this.x - 10, this.y + 1);
    line(this.x + 6, this.y + 3, this.x + 7, this.y + 8);
    line(this.x + 6, this.y + 3, this.x + 10, this.y + 1);
  }

  fall() {
    this.y += this.speed;
    if (this.y > height + 10) {
      this.y = 0;
      this.x = random(width / 4 + 10, width / 2 - 10);
    }
  }

  //If either bear runs into the snowflake, it disappears and the score goes up by 1
  checkHit() {
    if (
      (abs(this.x - blackBearPlayer.position.x) < 35 &&
        abs(this.y - blackBearPlayer.position.y) < 30) ||
      (abs(this.x - brownBearPlayer.position.x) < 35 &&
        abs(this.y - brownBearPlayer.position.y) < 30)
    ) {
      this.hit = true;
      winterScore++;
      if (soundOn) {
        iceNoise.play();
      }
    }
  }
}
