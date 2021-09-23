//This class represents the enemy object
//The enemies are broccoli and they move either horiztonally or vertically but not both
//If the player hits any enemy the game is automatically over
class enemyObj {
  constructor(x, y) {
    this.position = new p5.Vector(x, y);
    this.speed = 1;
    this.step = new p5.Vector(0, 0);
    this.hit = false;
  }
  draw() {
    noStroke();
    fill(170, 198, 87);
    rect(this.position.x - 2.5, this.position.y, 5, 15);
    quad(
      this.position.x - 4.5,
      this.position.y - 4,
      this.position.x - 10,
      this.position.y - 2,
      this.position.x - 2.5,
      this.position.y + 8,
      this.position.x,
      this.position.y + 3
    );
    quad(
      this.position.x + 4.5,
      this.position.y - 4,
      this.position.x + 10,
      this.position.y - 2,
      this.position.x + 2.5,
      this.position.y + 8,
      this.position.x,
      this.position.y + 3
    );
    fill(62, 124, 49);
    circle(this.position.x - 8, this.position.y - 5, 8);
    circle(this.position.x - 1, this.position.y - 8, 8);
    circle(this.position.x + 2, this.position.y - 3, 8);
    circle(this.position.x + 8, this.position.y - 5, 8);
    circle(this.position.x - 4, this.position.y - 2, 8);
    circle(this.position.x + 3, this.position.y - 7, 8);
    fill(255);
    circle(this.position.x - 3, this.position.y + 5, 5);
    circle(this.position.x + 3, this.position.y + 5, 5);
    fill(0);
    circle(this.position.x - 3, this.position.y + 5, 2);
    circle(this.position.x + 3, this.position.y + 5, 2);
  }

  //Depending on the direction, move accordingly
  //Only move when its closer than 120 pixels to the user
  move() {
    this.step.set(player.x - this.position.x, player.y - this.position.y);
    if (this.step.mag() < 120) {
      this.step.normalize();
      this.step.mult(this.speed);
      this.position.add(this.step);
    }
    for (var i = 0; i < walls.length; i++) {
      if (
        this.position.x < walls[i].x &&
        walls[i].x - this.position.x < 12 &&
        this.position.y > walls[i].y - 10 &&
        this.position.y < walls[i].y + 30
      ) {
        this.position.x -= 5;
      }
      if (
        this.position.x - walls[i].x > 0 &&
        this.position.x - walls[i].x < 30 &&
        this.position.y > walls[i].y - 10 &&
        this.position.y < walls[i].y + 30
      ) {
        this.position.x += 5;
      }

      if (
        this.position.y - walls[i].y > 0 &&
        this.position.y - walls[i].y < 32 &&
        this.position.x > walls[i].x - 10 &&
        this.position.x < walls[i].x + 30
      ) {
        this.position.y += 5;
      }
      if (
        walls[i].y - this.position.y > 0 &&
        walls[i].y - this.position.y < 15 &&
        this.position.x > walls[i].x - 10 &&
        this.position.x < walls[i].x + 30
      ) {
        this.position.y -= 5;
      }
    }
  }

  //Checks to see if the player has come in contact with it
  checkHit() {
    if (
      ((player.x >= this.position.x && player.x - this.position.x < 23) ||
        (player.x <= this.position.x && this.position.x - player.x < 23)) &&
      ((player.y >= this.position.y && player.y - this.position.y < 30) ||
        (player.y <= this.position.y && this.position.y - player.y < 20))
    ) {
      player.dead = true;
    }
    //Check to see if bullet hit enemy
    //If its hit, the enemy disappears and the bullet disappears
    for (var i = 0; i < bulletBank.length; i++) {
      if (
        ((bulletBank[i].x >= this.position.x &&
          bulletBank[i].x - this.position.x < 18) ||
          (bulletBank[i].x <= this.position.x &&
            this.position.x - bulletBank[i].x < 18)) &&
        ((bulletBank[i].y >= this.position.y &&
          bulletBank[i].y - this.position.y < 25) ||
          (bulletBank[i].y <= this.position.y &&
            this.position.y - bulletBank[i].y < 25))
      ) {
        this.hit = true;
        bulletBank[i].active = false;
      }
    }
  }
}

//This class represents the purple tiles that make up the center of the board
class purpleTileObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    stroke(52, 61, 152);
    fill(52, 61, 152);
    rect(this.x, this.y, 20, 20);
  }
}

//This class represents the baja blast cup that acts as the prize
//All cups have to be collected to win the game
class cupObj {
  constructor(x, y) {
    this.x = x + 4;
    this.y = y;
    this.hit = false;
  }
  draw() {
    fill(255);
    image(images[0], this.x, this.y, 40, 40);
  }

  //Check to see if the player has come in contact with it
  //If the player has hit it, increase the color and make the cup disappear
  checkHit() {
    if (
      ((player.x >= this.x && player.x - this.x < 24) ||
        (player.x <= this.x && this.x - player.x < 15)) &&
      ((player.y >= this.y && player.y - this.y < 45) ||
        (player.y <= this.y && this.y - player.y < 15))
    ) {
      this.hit = true;
      score++;
    }
  }
}

//This represents the walls
class wallObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  draw() {
    noStroke();
    fill(237, 0, 140);
    rect(this.x, this.y, 20, 20);
  }
}
