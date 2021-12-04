//This class represents the portal that the bears have to walk through at the end of the level
class portal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
  }

  //Spin the portal constantly
  draw() {
    push();
    translate(this.x + 40, this.y + 40);
    rotate(this.angle);
    translate(-this.x - 40, -this.y - 40);
    image(portalImg, this.x, this.y, 80, 80);
    pop();
    this.angle += PI / 100;
  }

  //If either bear walks into the portal, it disappears until the next level
  checkHit() {
    if (
      abs(this.x + 40 - blackBearPlayer.position.x) < 25 &&
      abs(this.y + 40 - blackBearPlayer.position.y) < 20 &&
      !blackBearPlayer.portal
    ) {
      blackBearPlayer.portal = true;
      if (soundOn) {
        whooshNoise.play();
      }
    }

    if (
      abs(this.x + 40 - brownBearPlayer.position.x) < 25 &&
      abs(this.y + 40 - brownBearPlayer.position.y) < 20 &&
      !brownBearPlayer.portal
    ) {
      brownBearPlayer.portal = true;
      if (soundOn) {
        whooshNoise.play();
      }
    }
  }
}
