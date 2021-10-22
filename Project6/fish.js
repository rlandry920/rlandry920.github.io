class fish {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.wanderX = random(35, width - 30);
    this.wanderY = random(height / 6 + 35, height - 40 - 30);
    this.speed = 2;
    //Create body
    this.body = new subdivisionObj();
    this.body.points.push(new p5.Vector(this.x + 30, this.y));
    this.body.points.push(new p5.Vector(this.x + 20, this.y - 10));
    this.body.points.push(new p5.Vector(this.x + 10, this.y - 30));
    this.body.points.push(new p5.Vector(this.x - 30, this.y - 25));
    this.body.points.push(new p5.Vector(this.x - 5, this.y + 2));
    this.body.points.push(new p5.Vector(this.x - 35, this.y - 10));
    this.body.points.push(new p5.Vector(this.x - 35, this.y + 25));
    this.body.points.push(new p5.Vector(this.x - 5, this.y + 2));
    this.body.points.push(new p5.Vector(this.x - 20, this.y + 30));
    this.body.points.push(new p5.Vector(this.x + 10, this.y + 25));
    this.body.points.push(new p5.Vector(this.x + 20, this.y + 10));
  }

  draw() {
    this.body.draw(color(239, 13, 215));
    stroke(0);
    line(this.x - 30, this.y, this.x - 20, this.y + 2);
    line(this.x - 30, this.y + 6, this.x - 20, this.y + 6);
    line(this.x - 30, this.y + 15, this.x - 20, this.y + 9);
    fill(0);
    circle(this.x + 10, this.y - 5, 7);
    line(this.x + 20, this.y, this.x + 25, this.y);
  }

  //Wander around
  wander() {
    if (abs(this.wanderX - this.x) < this.speed && abs(this.wanderY - this.y) < this.speed) {
      this.wanderX = random(35, width - 30);
      this.wanderY = random(height / 6 + 35, height - 40 - 30);
    }
    let angle = atan2(this.wanderY - this.y, this.wanderX - this.x);
    this.x += this.speed * cos(angle);
    this.y += this.speed * sin(angle);
    for (var i = 0; i < this.body.points.length; i++) {
      this.body.points[i].x += this.speed * cos(angle);
    }
    for (var i = 0; i < this.body.points.length; i++) {
      this.body.points[i].y += this.speed * sin(angle);
    }
  }
  
  //Check to see if hit rock
  checkHit() {
    if (
      dist(this.x, this.y, rock.x, rock.y + 10) < 65 &&
      rock.stop &&
      rock.particles.length == 0
    ) {
      rock.stop = false;
    }
  }
}
