//This class represents the boats at the top of the screen
class boat {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    //Randomize the colors and speed
    this.color = color(random(0,255),random(0,255),random(0,255))
    this.speed = random(-3,3)
  }

  draw() {
    fill(this.color)
    noStroke()
    rect(this.x-10, this.y-5, 20, 10)
    triangle(this.x-10, this.y-5, this.x-10, this.y+5, this.x-20, this.y-5)
        triangle(this.x+10, this.y-5, this.x+10, this.y+5, this.x+20, this.y-5)
    fill(255)
        triangle(this.x, this.y-10, this.x+10, this.y-15, this.x, this.y-20)
    stroke(0)
    line(this.x, this.y-5, this.x, this.y-20)
  }

  //Move back and forth
  move() {
    this.x += this.speed;
    if(this.x < 20 || this.x >width-20){
      this.speed = -this.speed
    }
  }
}
