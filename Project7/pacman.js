let maxAngle = 3.14159 / 3;

//Represents pac-man class that is the player
class pacman {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.orientation = 0;
    this.moving = false;
    this.angle = PI / 10;
    this.openingRate = PI / 40; //2 degrees
    this.invincible = false;
    this.hit = false;
    this.respawnCounter = 150;
    this.invincibleCounter = 150;
  }

  draw() {
    //Respawn if you have been hit
    if (this.hit) {
      this.respawnCounter--;
    }
    if (this.respawnCounter == 0) {
      this.hit = false;
      this.x = width / 2;
      this.y = height - 110;
      this.respawnCounter = 150;
      this.orientation = 0;
      this.moving = false;
    }
    //Stay invinicible for a small period of time after respawning
    if (this.invincible && !this.hit) {
      this.invincibleCounter--;
    }
    if (this.invincibleCounter == 0) {
      this.invincible = false;
      this.invincibleCounter = 100;
    }
    
    //Only draw if you didn't just die
    if (!this.hit) {
      rectMode(CORNER);
      stroke(0);
      noFill();
      noStroke();
      push();
      translate(this.x, this.y);
      //Rotate based on orientation
      rotate(this.orientation);
      translate(-this.x, -this.y);
      fill(255, 255, 0);
      arc(this.x, this.y, 16, 16, this.angle, TWO_PI - this.angle);
      pop();
      
      //Move eye based on orientations
      fill(0)
      if(this.orientation == 0){
        circle(this.x-2, this.y-4, 3)
      }
      else if(this.orientation == PI){
        circle(this.x+2, this.y-4, 3)
      }
      else if(this.orientation == PI/2){
        circle(this.x+4, this.y+2, 3)
      }
      else if(this.orientation == -PI/2 ){
        circle(this.x+4, this.y-2, 3)
      }
      rectMode(CENTER);
    }
  }

  //Move player up
  moveUpward() {
    this.y--;
    if (this.y < 0) {
      this.y = height;
    }
    for (var i = 0; i < walls.length; i++) {
      if (
        walls[i].y < this.y &&
        this.y - walls[i].y <= 16 &&
        abs(this.x - walls[i].x) <= 16
      ) {
        this.y++;
        this.moving = false;
      }
    }
  }

  //Move player down
  moveDownward() {
    this.y++;
    if (this.y > height) {
      this.y = 0;
    }
    for (var i = 0; i < walls.length; i++) {
      if (
        walls[i].y > this.y &&
        walls[i].y - this.y <= 16 &&
        abs(this.x - walls[i].x) <= 16
      ) {
        this.y--;
        this.moving = false;
      }
    }
  }

  //Move player left
  moveLeft() {
    this.x--;
    if (this.x < -10) {
      this.x = width + 10;
    }
    for (var i = 0; i < walls.length; i++) {
      if (
        walls[i].x < this.x &&
        this.x - walls[i].x <= 16 &&
        abs(this.y - walls[i].y) <= 16
      ) {
        this.x++;
        this.moving = false;
      }
    }
  }

  //Move player right
  moveRight() {
    this.x++;
    if (this.x > width + 10) {
      this.x = -10;
    }
    for (var i = 0; i < walls.length; i++) {
      if (
        walls[i].x > this.x &&
        walls[i].x - this.x <= 16 &&
        abs(this.y - walls[i].y) <= 16
      ) {
        this.x--;
        this.moving = false;
      }
    }
  }

  //Make the pac man open and close its mouth
  //Move in the direction the pacman is pointed
  move() {
    this.angle += this.openingRate;
    if (this.angle > maxAngle || this.angle < 0) {
      this.openingRate = -this.openingRate;
    }
    if (this.moving) {
      if (this.orientation == 0) {
        this.moveRight();
      } else if (this.orientation == PI) {
        this.moveLeft();
      } else if (this.orientation == PI / 2) {
        this.moveDownward();
      } else if (this.orientation == -PI / 2) {
        this.moveUpward();
      }
    }
  }
  
  //This function is only used for the start screen
  sampleMove(){
        this.angle += this.openingRate;
    if (this.angle > maxAngle || this.angle < 0) {
      this.openingRate = -this.openingRate;
    }
    this.x+=2;
    if(this.x > width +10){
      this.x = -100
    }
  }
}
