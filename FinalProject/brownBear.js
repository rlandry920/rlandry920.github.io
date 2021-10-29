class brownBear {
  constructor(x, y) {
    this.position = new p5.Vector(x, y);
    this.movingRight = false;
    this.movingLeft = false;
    this.rightArmAngle = PI / 8;
        this.rightArmDir = 1;
    this.leftArmAngle = PI / 8;
        this.leftArmDir = 1;
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
    this.force = new p5.Vector(0, 0);
    this.jump = 0;
    this.walkRight = 0;
    this.walkLeft = 0;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  //Move based on forces being applied
  update() {
    this.acceleration.set(0, 0);
    if (this.walkRight === 1) {
      this.velocity.x = walkForce.x;
    }
    if (this.walkLeft === 1) {
      this.velocity.x = backForce.x;
    }
    if (this.walkRight === 0 && this.walkLeft == 0) {
      this.velocity.x = 0;
    }
    if (this.jump === 2) {
      this.applyForce(jumpForce);
      this.jump = 1;
    }
    if (this.jump > 0) {
      this.applyForce(gravity);
    }
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.set(0, 0);
  }

  draw() {
    if (this.movingRight) {
      if (this.rightArmAngle >= PI / 8 || this.rightArmAngle <= -PI / 8) {
        this.rightArmDir = -this.rightArmDir;
      } 
      this.rightArmAngle += this.rightArmDir*PI/40
      noStroke();
      fill(151, 76, 53);
      //ear
      circle(this.position.x - 10, this.position.y - 20, 15);
      //head
      ellipse(this.position.x, this.position.y - 10, 25, 25);
      ellipse(this.position.x - 5, this.position.y + 25, 5, 20);
      //body
      ellipse(this.position.x + 5, this.position.y + 25, 5, 20);
      ellipse(this.position.x, this.position.y + 10, 20, 35);
      push();
      translate(this.position.x, this.position.y);
      rotate(-PI / 15);
      translate(-this.position.x, -this.position.y);
      ellipse(this.position.x + 5, this.position.y + 15, 10, 25);
      stroke(0);
      pop();

      //eyes
      fill(255);
      ellipse(this.position.x + 1, this.position.y - 12, 6, 8);
      fill(0);
      ellipse(this.position.x + 1, this.position.y - 12, 3, 4);
      fill(208, 137, 75);
      //inner ear
      circle(this.position.x - 10, this.position.y - 20, 8);
      arc(
        this.position.x + 12,
        this.position.y - 8,
        13,
        13,
        (5 * PI) / 8,
        -PI / 2,
        PIE
      );
      push();
      translate(this.position.x, this.position.y);
      rotate(-PI / 15);
      translate(-this.position.x, -this.position.y);
      ellipse(this.position.x + 7, this.position.y + 15, 5, 20);
      pop();
      push();
      translate(this.position.x, this.position.y);
      rotate(this.rightArmAngle);
      translate(-this.position.x, -this.position.y);
      stroke(0);
      noFill();
      ellipse(this.position.x - 2, this.position.y + 10, 7, 15);
      noStroke();
      pop();
      //nose
      fill(0);
      ellipse(this.position.x + 12, this.position.y - 10, 4, 6);
      stroke(0);
      noFill();
      bezier(
        this.position.x + 8,
        this.position.y - 8,
        this.position.x + 9,
        this.position.y - 4,
        this.position.x + 8,
        this.position.y - 6,
        this.position.x + 12,
        this.position.y - 5
      );
    } else if (this.movingLeft) {
      if (this.leftArmAngle >= PI / 8 || this.leftArmAngle <= -PI / 8) {
        this.leftArmDir = -this.leftArmDir;
      } 
      this.leftArmAngle += this.leftArmDir*PI/40
      noStroke();
      fill(151, 76, 53);
      //ear
      circle(this.position.x + 10, this.position.y - 20, 15);
      //head
      ellipse(this.position.x, this.position.y - 10, 25, 25);
      ellipse(this.position.x - 5, this.position.y + 25, 5, 20);
      //body
      ellipse(this.position.x + 5, this.position.y + 25, 5, 20);
      ellipse(this.position.x, this.position.y + 10, 20, 35);
      push();
      translate(this.position.x, this.position.y);
      rotate(PI / 15);
      translate(-this.position.x, -this.position.y);
      ellipse(this.position.x - 5, this.position.y + 15, 10, 25);
      stroke(0);
      pop();

      //eyes
      fill(255);
      ellipse(this.position.x - 1, this.position.y - 12, 6, 8);
      fill(0);
      ellipse(this.position.x - 1, this.position.y - 12, 3, 4);
      fill(208, 137, 75);
      //inner ear
      circle(this.position.x + 10, this.position.y - 20, 8);
      arc(
        this.position.x - 12,
        this.position.y - 8,
        13,
        13,
        
        -PI / 2,
        (3 * PI) / 8,
        PIE
      );
      push();
      translate(this.position.x, this.position.y);
      rotate(PI / 15);
      translate(-this.position.x, -this.position.y);
      ellipse(this.position.x - 7, this.position.y + 15, 5, 20);
      pop();
      push();
      translate(this.position.x, this.position.y);
      rotate(this.leftArmAngle);
      translate(-this.position.x, -this.position.y);
      stroke(0);
      noFill();
      ellipse(this.position.x + 2, this.position.y + 10, 7, 15);
      noStroke();
      pop();
      //nose
      fill(0);
      ellipse(this.position.x - 12, this.position.y - 10, 4, 6);
      stroke(0);
      noFill();
      bezier(
        this.position.x - 8,
        this.position.y - 8,
        this.position.x - 9,
        this.position.y - 4,
        this.position.x - 8,
        this.position.y - 6,
        this.position.x - 12,
        this.position.y - 5
      );
    } else {
      noStroke();
      fill(151, 76, 53);
      //legs
      rect(this.position.x - 5, this.position.y + 20, 7, 25, 4);
      rect(this.position.x + 5, this.position.y + 20, 7, 25, 4);
      quad(
        this.position.x + 5,
        this.position.y + 8,
        this.position.x + 10,
        this.position.y + 5,
        this.position.x + 16,
        this.position.y + 15,
        this.position.x + 12,
        this.position.y + 17
      );
      quad(
        this.position.x - 5,
        this.position.y + 8,
        this.position.x - 10,
        this.position.y + 5,
        this.position.x - 16,
        this.position.y + 15,
        this.position.x - 12,
        this.position.y + 17
      );
      circle(this.position.x - 13.5, this.position.y + 15, 5);
      circle(this.position.x + 13.5, this.position.y + 15, 5);
      //body
      rect(this.position.x, this.position.y + 10, 20, 20);
      //outer ear
      circle(this.position.x - 15, this.position.y - 20, 15);
      circle(this.position.x + 15, this.position.y - 20, 15);
      //head
      ellipse(this.position.x, this.position.y - 10, 35, 30);
      fill(255);
      //eyes
      ellipse(this.position.x - 5, this.position.y - 15, 6, 8);
      ellipse(this.position.x + 5, this.position.y - 15, 6, 8);
      fill(0);
      ellipse(this.position.x - 5, this.position.y - 15, 3, 4);
      ellipse(this.position.x + 5, this.position.y - 15, 3, 4);
      fill(208, 137, 75);
      //inner ear
      circle(this.position.x - 15, this.position.y - 20, 8);
      circle(this.position.x + 15, this.position.y - 20, 8);
      noStroke();
      //stomach
      ellipse(this.position.x, this.position.y + 12, 12, 12);
      //face
      ellipse(this.position.x, this.position.y - 3, 20, 13);
      //nose
      fill(0);
      ellipse(this.position.x, this.position.y - 7, 10, 5);
      stroke(0);
      //mouth
      line(
        this.position.x,
        this.position.y - 5,
        this.position.x,
        this.position.y
      );
      noFill();
      bezier(
        this.position.x,
        this.position.y,
        this.position.x - 2,
        this.position.y + 3,
        this.position.x - 6,
        this.position.y + 3,
        this.position.x - 8,
        this.position.y - 2
      );
      bezier(
        this.position.x,
        this.position.y,
        this.position.x + 2,
        this.position.y + 3,
        this.position.x + 6,
        this.position.y + 3,
        this.position.x + 8,
        this.position.y - 2
      );
    }
  }
}
