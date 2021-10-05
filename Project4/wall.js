//This class represents the purple tiles that make up the center of the board
class wallObj {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color
  }
  draw() {
    noStroke()
    fill(this.color);
    rect(this.x, this.y, 20, 20);
  }
}

