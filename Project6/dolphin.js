class dolphin {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.wanderX = random(70, width - 70);
    this.wanderY = random(height / 6 + 40, height - 40 - 40);
    this.speed = 3;
    //Create body
    this.body = new subdivisionObj();
    this.body.points.push(new p5.Vector(this.x - 40, this.y + 22));
    this.body.points.push(new p5.Vector(this.x - 38, this.y + 10));
    this.body.points.push(new p5.Vector(this.x - 30, this.y + 2));
    this.body.points.push(new p5.Vector(this.x - 12, this.y - 14));
    this.body.points.push(new p5.Vector(this.x - 10, this.y - 14));
    this.body.points.push(new p5.Vector(this.x - 6, this.y - 16));
    this.body.points.push(new p5.Vector(this.x - 3, this.y - 23));
    this.body.points.push(new p5.Vector(this.x - 3, this.y - 26));
    this.body.points.push(new p5.Vector(this.x - 4, this.y - 29));
    this.body.points.push(new p5.Vector(this.x - 8, this.y - 30));
    this.body.points.push(new p5.Vector(this.x - 4, this.y - 30));
    this.body.points.push(new p5.Vector(this.x - 1, this.y - 30));
    this.body.points.push(new p5.Vector(this.x + 1, this.y - 30));
    this.body.points.push(new p5.Vector(this.x + 7, this.y - 24));
    this.body.points.push(new p5.Vector(this.x + 8, this.y - 21));
    this.body.points.push(new p5.Vector(this.x + 10, this.y - 18));
    this.body.points.push(new p5.Vector(this.x + 13, this.y - 18));
    this.body.points.push(new p5.Vector(this.x + 16, this.y - 18));
    this.body.points.push(new p5.Vector(this.x + 22, this.y - 16));
    this.body.points.push(new p5.Vector(this.x + 25, this.y - 15));
    this.body.points.push(new p5.Vector(this.x + 28, this.y - 14));
    this.body.points.push(new p5.Vector(this.x + 31, this.y - 13));
    this.body.points.push(new p5.Vector(this.x + 34, this.y - 12));
    this.body.points.push(new p5.Vector(this.x + 37, this.y - 11));
    this.body.points.push(new p5.Vector(this.x + 40, this.y - 10));
    this.body.points.push(new p5.Vector(this.x + 43, this.y - 8));
    this.body.points.push(new p5.Vector(this.x + 46, this.y - 6));
    this.body.points.push(new p5.Vector(this.x + 49, this.y - 4));
    this.body.points.push(new p5.Vector(this.x + 50, this.y));
    this.body.points.push(new p5.Vector(this.x + 53, this.y + 1));
    this.body.points.push(new p5.Vector(this.x + 56, this.y + 2));
    this.body.points.push(new p5.Vector(this.x + 59, this.y + 3));
    this.body.points.push(new p5.Vector(this.x + 63, this.y + 3));
    this.body.points.push(new p5.Vector(this.x + 66, this.y + 4));
    this.body.points.push(new p5.Vector(this.x + 69, this.y + 5));
    this.body.points.push(new p5.Vector(this.x + 69, this.y + 6));
    this.body.points.push(new p5.Vector(this.x + 68, this.y + 7));
    this.body.points.push(new p5.Vector(this.x + 67, this.y + 8));
    this.body.points.push(new p5.Vector(this.x + 66, this.y + 8));
    this.body.points.push(new p5.Vector(this.x + 63, this.y + 9));
    this.body.points.push(new p5.Vector(this.x + 60, this.y + 10));
    this.body.points.push(new p5.Vector(this.x + 57, this.y + 9));
    this.body.points.push(new p5.Vector(this.x + 54, this.y + 10));
    this.body.points.push(new p5.Vector(this.x + 51, this.y + 11));
    this.body.points.push(new p5.Vector(this.x + 30, this.y + 15));
    this.body.points.push(new p5.Vector(this.x + 10, this.y + 12));
    this.body.points.push(new p5.Vector(this.x - 10, this.y + 20));
    this.body.points.push(new p5.Vector(this.x - 30, this.y + 30));
    this.body.points.push(new p5.Vector(this.x - 25, this.y + 52));
    this.body.points.push(new p5.Vector(this.x - 40, this.y + 35));
    this.body.points.push(new p5.Vector(this.x - 50, this.y + 32));
    this.body.points.push(new p5.Vector(this.x - 60, this.y + 32));
    this.body.points.push(new p5.Vector(this.x - 70, this.y + 30));
    this.body.points.push(new p5.Vector(this.x - 40, this.y + 22));

    //Create fin
    this.fin = new subdivisionObj();
    this.fin.points.push(new p5.Vector(this.x - 3, this.y + 5));
    this.fin.points.push(new p5.Vector(this.x, this.y + 12));
    this.fin.points.push(new p5.Vector(this.x - 5, this.y + 25));
    this.fin.points.push(new p5.Vector(this.x + 12, this.y + 15));
    this.fin.points.push(new p5.Vector(this.x + 15, this.y + 5));
  }

  draw() {
    this.body.draw(color(145, 176, 189));
    this.fin.draw(color(150));
    fill(0);
    circle(this.x + 40, this.y, 7);
    line(this.x + 68, this.y + 7, this.x + 50, this.y + 6);
  }

  //Wander around
  wander() {
    if (abs(this.wanderX- this.x) <this.speed && abs(this.wanderY- this.y) <this.speed) {
      this.wanderX = random(70, width - 70);
      this.wanderY = random(height / 6 + 40, height - 40 - 40);
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
      dist(this.x, this.y, rock.x, rock.y + 10) < 85 &&
      rock.stop &&
      rock.particles.length == 0
    ) {
      rock.stop = false;
    }
  }
}
