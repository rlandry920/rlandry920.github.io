//This class is only used for the start screen
class sampleGhost{
    constructor(x, y, c) {
    this.x = x;
      this.y=y;
    this.color = c;
    }
  
  draw() {
    rectMode(CORNER);
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y - 3, 18, 13);
    rect(this.x - 9, this.y - 3, 18, 8);
    triangle(
      this.x - 9,
      this.y + 5,
      this.x - 6,
      this.y + 5,
      this.x - 9,
      this.y + 10
    );
    triangle(
      this.x - 6,
      this.y + 5,
      this.x - 3,
      this.y + 10,
      this.x,
      this.y + 5
    );
    triangle(
      this.x + 6,
      this.y + 5,
      this.x + 3,
      this.y + 10,
      this.x,
      this.y + 5
    );
    triangle(
      this.x + 9,
      this.y + 5,
      this.x + 6,
      this.y + 5,
      this.x + 9,
      this.y + 10
    );

    fill(255, 255, 255);
    ellipse(this.x - 3, this.y - 3, 5, 8);
    ellipse(this.x + 3, this.y - 3, 5, 8);
    fill(0, 0, 255);
    ellipse(this.x - 4, this.y - 3, 2, 3);
    ellipse(this.x + 2, this.y - 3, 2, 3);
    rectMode(CENTER);
  }
  
  //Move right across screen
  move(){
    this.x+=2;
    if(this.x > width +10){
      this.x = -100
    }
  }
}