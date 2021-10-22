class seahorse {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.wanderX = random(35, width - 10);
    this.wanderY = random(height / 6 + 35, height - 40 - 30);
    this.speed = 2;
    //Create body
    this.body = new subdivisionObj();
    this.body.points.push(new p5.Vector(this.x - 30, this.y + 15));
    this.body.points.push(new p5.Vector(this.x - 10, this.y + 15));
    this.body.points.push(new p5.Vector(this.x - 30, this.y + 10));
    this.body.points.push(new p5.Vector(this.x - 35, this.y + 15));
    this.body.points.push(new p5.Vector(this.x - 30, this.y + 25));
    this.body.points.push(new p5.Vector(this.x - 20, this.y + 30));
    this.body.points.push(new p5.Vector(this.x - 10, this.y + 28));
    this.body.points.push(new p5.Vector(this.x, this.y + 25));
    this.body.points.push(new p5.Vector(this.x + 5, this.y + 15));
    this.body.points.push(new p5.Vector(this.x + 3, this.y + 5));
    this.body.points.push(new p5.Vector(this.x, this.y));
    this.body.points.push(new p5.Vector(this.x + 3, this.y - 5));
    this.body.points.push(new p5.Vector(this.x + 5, this.y - 15));
    this.body.points.push(new p5.Vector(this.x, this.y - 35));
    this.body.points.push(new p5.Vector(this.x - 20, this.y - 30));
    this.body.points.push(new p5.Vector(this.x - 20, this.y - 25));
    this.body.points.push(new p5.Vector(this.x - 30, this.y - 25));
    this.body.points.push(new p5.Vector(this.x - 30, this.y - 20));
    this.body.points.push(new p5.Vector(this.x - 20, this.y - 20));
    this.body.points.push(new p5.Vector(this.x - 10, this.y - 15));
    this.body.points.push(new p5.Vector(this.x - 30, this.y - 5));
    this.body.points.push(new p5.Vector(this.x - 5, this.y + 15));
    this.body.points.push(new p5.Vector(this.x - 20, this.y + 25));
    this.body.points.push(new p5.Vector(this.x - 30, this.y + 20));
    
    //Create fin
    this.fin = new subdivisionObj();
    this.fin.points.push(new p5.Vector(this.x - 10, this.y - 35));
    this.fin.points.push(new p5.Vector(this.x + 10, this.y - 25));
    this.fin.points.push(new p5.Vector(this.x + 5, this.y - 15));
    this.fin.points.push(new p5.Vector(this.x + 10, this.y - 5));
    this.fin.points.push(new p5.Vector(this.x, this.y + 5));
    this.fin.points.push(new p5.Vector(this.x + 10, this.y + 15));
    this.fin.points.push(new p5.Vector(this.x + 5, this.y + 25));
    this.fin.points.push(new p5.Vector(this.x, this.y + 30));
  }

  draw() {
    strokeWeight(3);
    this.fin.draw(color(69, 163, 39));
    this.body.draw(color(220, 236, 104));
    fill(0);
    circle(this.x - 12, this.y - 25, 4);
    line(this.x - 23, this.y, this.x - 10, this.y + 5);
    line(this.x - 23, this.y - 5, this.x - 10, this.y);
    line(this.x - 22, this.y - 10, this.x - 10, this.y - 5);
  }

  //Wander around
  wander() {
    if (abs(this.wanderX- this.x) <this.speed && abs(this.wanderY- this.y) <this.speed) {
      this.wanderX = random(35, width - 10);
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
    for (var i = 0; i < this.fin.points.length; i++) {
      this.fin.points[i].x += this.speed * cos(angle);
    }
    for (var i = 0; i < this.fin.points.length; i++) {
      this.fin.points[i].y += this.speed * sin(angle);
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
