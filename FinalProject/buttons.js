//This class represents the buttons that are used to move different logs in the map
class moveButton {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.pressed = false;
    this.color = color;
  }

  draw() {
    noStroke();
    fill(this.color);
    //If a bear is standing on the button, make it smaller
    if (!this.pressed) {
      rect(this.x, this.y, 20, 15, 5, 5, 0, 0);
    } else {
      rect(this.x, this.y + 2.5, 20, 10, 5, 5, 0, 0);
    }
  }

  //Check to see if a bear is standing on top of the button
  checkHit() {
    if (
      (abs(this.x - blackBearPlayer.position.x) < 20 &&
        blackBearPlayer.position.y < this.y &&
        this.y - blackBearPlayer.position.y < 25) ||
      (abs(this.x - brownBearPlayer.position.x) < 20 &&
        brownBearPlayer.position.y < this.y &&
        this.y - brownBearPlayer.position.y < 25)
    ) {
      //Play a sound to represent the button being clicked
      if (!this.pressed) {
        buttonClickNoise.play();
      }
      this.pressed = true;
    } else {
      this.pressed = false;
    }
  }
}
