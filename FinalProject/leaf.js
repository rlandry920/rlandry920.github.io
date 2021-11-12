//Represents leaves for the fall level
class leaf {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.hit = false;
  }

  draw() {
    image(leafImg, this.x, this.y, 30, 30);
  }

  fall() {
    this.y += this.speed;
    if (this.y > height + 10) {
      this.y = 0;
      this.x = random(0, width / 4 - 30);
    }
  }

  //If either bear runs into the leaf, it disappears and the score goes up by 1
  checkHit() {
    if (
      (abs(this.x - blackBearPlayer.position.x) < 35 &&
        abs(this.y - blackBearPlayer.position.y) < 30) ||
      (abs(this.x - brownBearPlayer.position.x) < 35 &&
        abs(this.y - brownBearPlayer.position.y) < 30)
    ) {
      this.hit = true;
      fallScore++;
    }
  }
}
