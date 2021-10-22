class stingray {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.wanderX = random(50, width - 50);
    this.wanderY = random(height / 6 + 40, height - 40 - 80);
    this.speed = 1;
    //Create body
    this.body = new subdivisionObj();
    this.body.points.push(new p5.Vector(this.x - 20, this.y - 10));
    this.body.points.push(new p5.Vector(this.x - 50, this.y));
    this.body.points.push(new p5.Vector(this.x - 30, this.y + 30));
    this.body.points.push(new p5.Vector(this.x - 5, this.y + 40));
    this.body.points.push(new p5.Vector(this.x - 1, this.y + 60));
    this.body.points.push(new p5.Vector(this.x, this.y + 80));
    this.body.points.push(new p5.Vector(this.x + 1, this.y + 60));
    this.body.points.push(new p5.Vector(this.x + 5, this.y + 40));
    this.body.points.push(new p5.Vector(this.x + 30, this.y + 30));
    this.body.points.push(new p5.Vector(this.x + 50, this.y));
    this.body.points.push(new p5.Vector(this.x + 20, this.y - 10));
    this.body.points.push(new p5.Vector(this.x, this.y - 40));
  }

  draw() {
    this.body.draw(color(51, 63, 73));
    fill(0);
    circle(this.x - 10, this.y - 5, 6);
    circle(this.x + 10, this.y - 5, 6);
    fill(253, 209, 239);
    circle(this.x - 20, this.y + 5, 10);
    circle(this.x + 20, this.y + 5, 10);
    noFill();
    bezier(
      this.x - 8,
      this.y + 5,
      this.x - 4,
      this.y + 10,
      this.x + 4,
      this.y + 10,
      this.x + 8,
      this.y + 5
    );

    point(this.x - 50, this.y + 80);
    point(this.x + 50, this.y - 40);
  }

  //Wander around
  wander() {
    if (abs(this.wanderX - this.x) < this.speed && abs(this.wanderY - this.y) < this.speed) {
      this.wanderX = random(50, width - 50);
      this.wanderY = random(height / 6 + 40, height - 40 - 80);
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
      dist(this.x, this.y, rock.x, rock.y + 10) < 85 &&
      rock.stop &&
      rock.particles.length == 0
    ) {
      rock.stop = false;
    }
  }
}
