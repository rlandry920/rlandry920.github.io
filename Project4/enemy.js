//When the player is more than 120 pixels away, wander
class wanderState {
  constructor() {
    this.wanderDist = 0;
    this.dir = 0.8;
  }
  execute(me) {
    me.checkWalls();

    if (me.jump > 0) {
      me.applyForce(gravity);
      me.velocity.add(me.acceleration);
      me.acceleration.set(0, 0);
      me.position.add(me.velocity);
    } else {
      if (this.wanderDist == 0) {
        this.wanderDist = int(random(50, 100));
        this.dir = random([-0.8, 0.8]);
      }
      this.wanderDist--;
      me.position.add(this.dir, 0);
      if (me.position.x > 770 || me.position.x < 30 || !me.standing) {
        me.position.add(-this.dir * 5, 0);
        this.dir = -this.dir;
        this.wanderDist += 5;
      }
    }
    if (
      dist(me.position.x, me.position.y, player.position.x, player.position.y) <
      120
    ) {
      me.changeState(1);
    }
  }
} // wanderState

//If the user is less than 120 pixels away, chase
class chaseState {
  constructor() {
    this.onEdge = false;
    this.edge = "";
  }

  execute(me) {
    if (
      me.position.y - 10 > player.position.y + 35 &&
      me.jump == 0 &&
      player.jump == 0 && me.velocity.y == 0
    ) {
      me.applyForce(jumpForce);
      me.jump = 1;
    }
    if (me.jump > 0) {
      me.applyForce(gravity);
    }

    if (me.position.x < player.position.x) {
      me.velocity.set(0.8, me.velocity.y);
    } else {
      me.velocity.set(-0.8, me.velocity.y);
    }

    me.velocity.add(me.acceleration);
    me.acceleration.set(0, 0);
    me.position.add(me.velocity);

    me.checkWalls();
    if (!me.standing) {
      me.jump = 1;
    }
    if (
      dist(me.position.x, me.position.y, player.position.x, player.position.y) >
      120
    ) {
      me.changeState(0);
    }
  }
} // chaseState

class enemyObj {
  constructor(x, y) {
    this.position = new p5.Vector(x, y);
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
    this.force = new p5.Vector(0, 0);
    this.jump = 0;
    this.state = [new wanderState(), new chaseState()];
    this.currState = 0;
    this.standing = false;
    this.count = 0;
    this.hit = false;
  }

  changeState(x) {
    this.currState = x;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  draw() {
    this.count++;
    noStroke();

    fill(12, 24, 130);
    rect(this.position.x - 5, this.position.y + 5, 10, 10);
    ellipse(this.position.x - 3, this.position.y + 14, 4, 8);
    ellipse(this.position.x + 3, this.position.y + 14, 4, 8);
    ellipse(this.position.x - 6, this.position.y + 8, 4, 8);
    ellipse(this.position.x + 6, this.position.y + 8, 4, 8);
    circle(this.position.x, this.position.y, 15); // head
    if (this.count > 10) {
      fill(255, 0, 0);
      circle(this.position.x - 3, this.position.y - 1, 3);
      circle(this.position.x + 3, this.position.y - 1, 3);
    }
    if (this.count == 50) {
      this.count = 0;
    }
    strokeWeight(1);
    stroke(255, 0, 0);
    noFill();
    line(
      this.position.x - 3,
      this.position.y + 3,
      this.position.x + 3,
      this.position.y + 3
    );
    line(
      this.position.x - 4,
      this.position.y - 4,
      this.position.x - 1,
      this.position.y - 3
    );
    line(
      this.position.x + 4,
      this.position.y - 4,
      this.position.x + 1,
      this.position.y - 3
    );
  }

  drawHit() {
    this.count--;
    this.checkWalls();
    noStroke();

    fill(12, 24, 130);
    rect(this.position.x - 6, this.position.y + 10, 12, 8);
    ellipse(this.position.x - 3, this.position.y + 19, 4, 4);
    ellipse(this.position.x + 3, this.position.y + 19, 4, 4);
    ellipse(this.position.x - 7, this.position.y + 13, 4, 8);
    ellipse(this.position.x + 7, this.position.y + 13, 4, 8);
    ellipse(this.position.x, this.position.y + 6, 15, 10); // head
    if (this.count > 10) {
      fill(255, 0, 0);
      circle(this.position.x - 3, this.position.y + 5.5, 3);
      circle(this.position.x + 3, this.position.y + 5.5, 3);
    }
    if (this.count == 50) {
      this.count = 0;
    }
    strokeWeight(1);
    stroke(255, 0, 0);
    noFill();
    line(
      this.position.x - 3,
      this.position.y + 8,
      this.position.x + 3,
      this.position.y + 8
    );
    line(
      this.position.x - 4,
      this.position.y + 3,
      this.position.x - 1,
      this.position.y + 4
    );
    line(
      this.position.x + 4,
      this.position.y + 3,
      this.position.x + 1,
      this.position.y + 4
    );
  }

  //Make sure to stay on walls
  checkWalls() {
    this.standing = false;
    if (this.position.y + 21 > height - 20) {
      this.position.y = height - 38;
      this.velocity.y = 0;
      this.jump = 0;
      this.standing = true;
      return;
    }
    for (var i = 0; i < walls.length; i++) {
      if (
        walls[i].y + 10 >= this.position.y + 20 &&
        walls[i].y - 10 - (this.position.y + 20) < 5 &&
        abs(walls[i].x - this.position.x) <= 19
      ) {
        if (this.velocity.y >= 0) {
          this.position.y = walls[i].y - 30;
          this.velocity.y = 0;
          this.jump = 0;
          this.standing = true;
        }
      }
    }
  }
}
