//This class represents the balloons that appear on the win screen
class balloon {
  //Each balloon has a random color and speed
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = color(random(0, 255), random(0, 255), random(0, 255));
    this.speed = random(10, 15);
  }

  draw() {
    noStroke();
    fill(this.color);
    //balloon
    ellipse(this.x, this.y, 35, 40);
    stroke(255);
    strokeWeight(2);
    noFill();
    //string
    bezier(
      this.x,
      this.y + 20,
      this.x - 10,
      this.y + 30,
      this.x + 10,
      this.y + 40,
      this.x,
      this.y + 50
    );
    strokeWeight(1);
  }

  //Make the balloon float up on the screen
  float() {
    this.y -= this.speed;
  }
}
