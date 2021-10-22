class crab {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.wanderX = random(40, width - 40);
    this.speed = 3;
    //Create body
    this.body = new subdivisionObj();
    this.body.points.push(new p5.Vector(this.x - 30, this.y));
    this.body.points.push(new p5.Vector(this.x, this.y - 10));
    this.body.points.push(new p5.Vector(this.x + 30, this.y));
    this.body.points.push(new p5.Vector(this.x, this.y + 15));

    //Create left claw
    this.leftClaw = new subdivisionObj();
    this.leftClaw.points.push(new p5.Vector(this.x - 18, this.y - 5));
    this.leftClaw.points.push(new p5.Vector(this.x - 24, this.y - 12));
    this.leftClaw.points.push(new p5.Vector(this.x - 18, this.y - 20));
    this.leftClaw.points.push(new p5.Vector(this.x - 16, this.y - 25));
    this.leftClaw.points.push(new p5.Vector(this.x - 30, this.y - 15));
    this.leftClaw.points.push(new p5.Vector(this.x - 25, this.y - 25));
    this.leftClaw.points.push(new p5.Vector(this.x - 10, this.y - 30));
    this.leftClaw.points.push(new p5.Vector(this.x - 25, this.y - 33));
    this.leftClaw.points.push(new p5.Vector(this.x - 30, this.y - 30));
    this.leftClaw.points.push(new p5.Vector(this.x - 40, this.y - 20));
    this.leftClaw.points.push(new p5.Vector(this.x - 38, this.y - 10));
    this.leftClaw.points.push(new p5.Vector(this.x - 30, this.y - 8));
    this.leftClaw.points.push(new p5.Vector(this.x - 25, this.y));
    this.leftClaw.points.push(new p5.Vector(this.x - 10, this.y + 5));

    //Create right claw
    this.rightClaw = new subdivisionObj();
    this.rightClaw.points.push(new p5.Vector(this.x + 18, this.y - 5));
    this.rightClaw.points.push(new p5.Vector(this.x + 24, this.y - 12));
    this.rightClaw.points.push(new p5.Vector(this.x + 18, this.y - 20));
    this.rightClaw.points.push(new p5.Vector(this.x + 16, this.y - 25));
    this.rightClaw.points.push(new p5.Vector(this.x + 30, this.y - 15));
    this.rightClaw.points.push(new p5.Vector(this.x + 25, this.y - 25));
    this.rightClaw.points.push(new p5.Vector(this.x + 10, this.y - 30));
    this.rightClaw.points.push(new p5.Vector(this.x + 25, this.y - 33));
    this.rightClaw.points.push(new p5.Vector(this.x + 30, this.y - 30));
    this.rightClaw.points.push(new p5.Vector(this.x + 40, this.y - 20));
    this.rightClaw.points.push(new p5.Vector(this.x + 38, this.y - 10));
    this.rightClaw.points.push(new p5.Vector(this.x + 30, this.y - 8));
    this.rightClaw.points.push(new p5.Vector(this.x + 25, this.y));
    this.rightClaw.points.push(new p5.Vector(this.x + 10, this.y + 5));
  }

  draw() {
    this.leftClaw.draw(color(254, 34, 15));
    this.rightClaw.draw(color(254, 34, 15));
    this.body.draw(color(254, 34, 15));
    stroke(254, 34, 15);
    strokeWeight(5);
    line(this.x - 8, this.y - 5, this.x - 8, this.y - 15);
    line(this.x + 8, this.y - 5, this.x + 8, this.y - 15);
    strokeWeight(3);
    //Draw legs
    line(this.x - 5, this.y + 10, this.x - 15, this.y + 20);
    line(this.x - 15, this.y + 25, this.x - 15, this.y + 20);
    line(this.x - 15, this.y + 8, this.x - 25, this.y + 18);
    line(this.x - 25, this.y + 25, this.x - 25, this.y + 18);
    line(this.x - 18, this.y + 4, this.x - 35, this.y + 15);
    line(this.x - 35, this.y + 22, this.x - 35, this.y + 15);
    line(this.x + 5, this.y + 10, this.x + 15, this.y + 20);
    line(this.x + 15, this.y + 25, this.x + 15, this.y + 20);
    line(this.x + 15, this.y + 8, this.x + 25, this.y + 18);
    line(this.x + 25, this.y + 25, this.x + 25, this.y + 18);
    line(this.x + 18, this.y + 4, this.x + 35, this.y + 15);
    line(this.x + 35, this.y + 22, this.x + 35, this.y + 15);
    strokeWeight(1);
    //Draw eyes
    ellipse(this.x + 8, this.y - 20, 10, 15);
    ellipse(this.x - 8, this.y - 20, 10, 15);
    fill(255);
    ellipse(this.x + 8, this.y - 20, 8, 12);
    ellipse(this.x - 8, this.y - 20, 8, 12);
    fill(0);
    ellipse(this.x + 8, this.y - 20, 4, 6);
    ellipse(this.x - 8, this.y - 20, 4, 6);

    point(this.x - 40, this.y);
  }

  //Make the crab wander only in the x direction
  wander() {
    if (abs(this.wanderX - this.x) < this.speed) {
      this.wanderX = random(40, width - 40);
    }
    if (this.wanderX > this.x) {
      this.x += this.speed;
      for (var i = 0; i < this.body.points.length; i++) {
        this.body.points[i].x += this.speed;
      }
      for (var i = 0; i < this.leftClaw.points.length; i++) {
        this.leftClaw.points[i].x += this.speed;
      }
      for (var i = 0; i < this.rightClaw.points.length; i++) {
        this.rightClaw.points[i].x += this.speed;
      }
    } else if (this.wanderX < this.x) {
      this.x -= this.speed;
      for (var i = 0; i < this.body.points.length; i++) {
        this.body.points[i].x -= this.speed;
      }
      for (var i = 0; i < this.leftClaw.points.length; i++) {
        this.leftClaw.points[i].x -= this.speed;
      }
      for (var i = 0; i < this.rightClaw.points.length; i++) {
        this.rightClaw.points[i].x -= this.speed;
      }
    }
  }

  //Check to see if hit rock
  checkHit() {
    if (
      dist(this.x, this.y, rock.x, rock.y + 10) < 75 &&
      rock.stop &&
      rock.particles.length == 0
    ) {
      rock.stop = false;
    }
  }
}
