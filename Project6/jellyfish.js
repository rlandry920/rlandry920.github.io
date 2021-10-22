class jellyfish {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.wanderX = random(20, width - 20);
    this.wanderY = random(height / 6 + 25, height - 40 - 25);
    this.speed = 4;
    //Create body
    this.body = new subdivisionObj();
    this.body.points.push(new p5.Vector(this.x - 20, this.y + 5));
    this.body.points.push(new p5.Vector(this.x - 15, this.y - 5));
    this.body.points.push(new p5.Vector(this.x - 10, this.y - 15));
    this.body.points.push(new p5.Vector(this.x, this.y - 20));
    this.body.points.push(new p5.Vector(this.x + 10, this.y - 15));
    this.body.points.push(new p5.Vector(this.x + 15, this.y - 5));
    this.body.points.push(new p5.Vector(this.x + 20, this.y + 5));
    this.body.points.push(new p5.Vector(this.x, this.y));
  }

  draw() {
    strokeWeight(3);
    stroke(212, 212, 212, 100);
    noFill();
    //Create legs
    bezier(
      this.x - 10,
      this.y,
      this.x - 20,
      this.y + 12,
      this.x,
      this.y + 15,
      this.x - 10,
      this.y + 20
    );
    bezier(
      this.x,
      this.y,
      this.x - 10,
      this.y + 12,
      this.x + 10,
      this.y + 15,
      this.x,
      this.y + 20
    );
    bezier(
      this.x + 10,
      this.y,
      this.x,
      this.y + 12,
      this.x + 20,
      this.y + 15,
      this.x + 10,
      this.y + 20
    );
    this.body.draw(color(254, 197, 214));
    fill(0);
    circle(this.x - 5, this.y - 10, 4);
    circle(this.x + 5, this.y - 10, 4);
  }

  //Wander around
  wander() {
    if (abs(this.wanderX- this.x) <this.speed && abs(this.wanderY- this.y) <this.speed) {
      this.wanderX = random(20, width - 20);
      this.wanderY = random(height / 6 + 25, height - 40 - 25);
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
      dist(this.x, this.y, rock.x, rock.y + 10) < 55 &&
      rock.stop &&
      rock.particles.length == 0
    ) {
      rock.stop = false;
    }
  }
}
