class chaseState {
  constructor() {
    this.step = new p5.Vector(0, 0);
    this.angle = 0;
    this.angleDir = 0;
    this.vec = new p5.Vector(0, 0);
  }

  execute(me) {
    let bulletComing = me.goingToBeHit();
    if (bulletComing != null) {
      me.state[2].bulletComing = bulletComing;
      me.changeState(2);
    }
    this.vec.set(player.x - me.position.x, player.y - me.position.y);
    this.angle = this.vec.heading();
    var angleDiff = abs(this.angle - me.angle);
    if (angleDiff > twoDegrees) {
      if (this.angle > me.angle) {
        this.angleDir = oneDegree;
      } else {
        this.angleDir = -oneDegree;
      }
      if (angleDiff > PI) {
        this.angleDir = -this.angleDir;
      }

      me.angle += this.angleDir;
      if (me.angle > PI) {
        me.angle = -angle179;
      } else if (me.angle < -PI) {
        me.angle = angle179;
      }
    } else if (dist(player.x, player.y, me.position.x, me.position.y) > 20) {
      me.position.add(cos(me.angle), sin(me.angle));
      for (var i = 0; i < walls.length; i++) {
        if (dist(me.position.x, me.position.y, walls[i].x, walls[i].y) < 30) {
          me.position.x -= 2 * cos(me.angle);
          me.position.y -= 2 * sin(me.angle);
        }
      }
      for (i = 0; i < enemies.length; i++) {
        if (
          me.position.x != enemies[i].position.x &&
          me.position.y != enemies[i].position.y &&
          dist(
            me.position.x,
            me.position.y,
            enemies[i].position.x,
            enemies[i].position.y
          ) < sqrt(800)
        ) {
          me.position.x -= 2 * cos(me.angle);
          me.position.y -= 2 * sin(me.angle);
        }
      }
    }

    if (dist(player.x, player.y, me.position.x, me.position.y) <= 120) {
      me.changeState(1);
    }
  }
}

class fireState {
  constructor() {
    this.step = new p5.Vector(0, 0);
    this.angle = 0;
    this.angleDir = 0;
    this.vec = new p5.Vector(0, 0);
    this.fireCounter = 0;
    this.bulletBank = [];
    for (var i = 0; i < 50; i++) {
      this.bulletBank.push(new enemyBullet());
    }
  }

  execute(me) {
    this.fireCounter--;
    let bulletComing = me.goingToBeHit();
    if (bulletComing != null) {
      me.state[2].bulletComing = bulletComing;
      me.changeState(2);
    }
    this.vec.set(player.x - me.position.x, player.y - me.position.y);
    this.angle = this.vec.heading();
    var angleDiff = abs(this.angle - me.angle);
    if (angleDiff > twoDegrees) {
      if (this.angle > me.angle) {
        this.angleDir = oneDegree;
      } else {
        this.angleDir = -oneDegree;
      }
      if (angleDiff > PI) {
        this.angleDir = -this.angleDir;
      }

      me.angle += this.angleDir;
      if (me.angle > PI) {
        me.angle = -angle179;
      } else if (me.angle < -PI) {
        me.angle = angle179;
      }
    } else {
      if (this.fireCounter <= 0) {
        var newBullet = this.findFreeBullet();
        newBullet.fire(me.position.x, me.position.y, me.angle);
        this.fireCounter = 2 * frameRate();
      }
    }

    if (dist(player.x, player.y, me.position.x, me.position.y) > 120) {
      me.changeState(0);
    }
  }

  findFreeBullet() {
    for (var i = 0; i < this.bulletBank.length; i++) {
      if (!this.bulletBank[i].active) {
        return this.bulletBank[i];
      }
    }
    return null;
  }
}

class avoidState {
  constructor() {
    this.step = new p5.Vector(0, 0);
    this.angle = 0;
    this.angleDir = 0;
    this.vec = new p5.Vector(0, 0);
    this.count = 0;
    this.bulletComing = null;
  }

  execute(me) {
    var bullet = me.goingToBeHit();

    if (bullet != null && bullet != this.bulletComing) {
      this.bulletComing = bullet;
      this.count = 0;
    }
    this.count++;
    if (
      this.count > 60 &&
      dist(player.x, player.y, me.position.x, me.position.y) <= 120 &&
      bullet == null
    ) {
      me.changeState(1);
      this.count = 0;
      return;
    }
    if (
      this.count > 60 &&
      dist(player.x, player.y, me.position.x, me.position.y) > 120 &&
      bullet == null
    ) {
      me.changeState(0);
      this.count = 0;
      return;
    }
    this.vec.set(
      this.bulletComing.x - me.position.x,
      this.bulletComing.y - me.position.y
    );
    this.angle = this.vec.heading();
    var angleDiff = abs(this.angle - me.angle);
    if (angleDiff < PI / 6) {
      var bulletVec = new p5.Vector(0, 0);
      bulletVec.set(
        me.position.x - this.bulletComing.x,
        me.position.y - this.bulletComing.y
      );

      let bulletAngle = bulletVec.heading();
      if (bulletAngle < this.bulletComing.angle) {
        this.angleDir = PI / 90;
      } else {
        this.angleDir = -PI / 90;
      }
      me.angle += this.angleDir;
      if (me.angle > PI) {
        me.angle = -angle179;
      } else if (me.angle < -PI) {
        me.angle = angle179;
      }
    } else {
      me.position.add(cos(me.angle), sin(me.angle));
      for (var i = 0; i < walls.length; i++) {
        if (dist(me.position.x, me.position.y, walls[i].x, walls[i].y) < 30) {
          me.position.x -= 2 * cos(me.angle);
          me.position.y -= 2 * sin(me.angle);
        }
      }
      for (i = 0; i < enemies.length; i++) {
        if (
          me.position.x != enemies[i].position.x &&
          me.position.y != enemies[i].position.y &&
          dist(
            me.position.x,
            me.position.y,
            enemies[i].position.x,
            enemies[i].position.y
          ) < sqrt(800)
        ) {
          me.position.x -= 2 * cos(me.angle);
          me.position.y -= 2 * sin(me.angle);
        }
      }
    }
  }
}

class Enemy {
  constructor(x, y) {
    this.position = new p5.Vector(x, y);
    this.state = [new chaseState(), new fireState(), new avoidState()];
    this.currState = 0;
    this.angle = 0;
    this.hit = false;
    this.particles = [];
  }

  changeState(x) {
    this.currState = x;
  }

  goingToBeHit() {
    for (var i = 0; i < player.bulletBank.length; i++) {
      if (player.bulletBank[i].active) {
        var vec = new p5.Vector(0, 0);
        vec.set(
          this.position.x - player.bulletBank[i].x,
          this.position.y - player.bulletBank[i].y
        );
        var currAngle = vec.heading();
        if (abs(currAngle - player.bulletBank[i].angle) < PI / 10) {
          return player.bulletBank[i];
        }
      }
    }
    return null;
  }

  checkHit() {
    for (var i = 0; i < player.bulletBank.length; i++) {
      if (
        player.bulletBank[i].active &&
        dist(
          player.bulletBank[i].x,
          player.bulletBank[i].y,
          this.position.x,
          this.position.y
        ) < 20
      ) {
        this.hit = true;
        player.bulletBank[i].active = false;
        score++;
        if (score == 5) {
          gameWin = true;
        }
      }
    }
  }

  draw() {
    for (var i = 0; i < this.state[1].bulletBank.length; i++) {
      if (this.state[1].bulletBank[i].active) {
        this.state[1].bulletBank[i].draw();
        this.state[1].bulletBank[i].move();
      }
    }
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    if (this.hit) {
      fill(200);
    } else {
      fill(255, 0, 0);
    }
    rect(0, 0, 20, 20);
    rect(10, 0, 20, 4);
    pop();

  }
}
