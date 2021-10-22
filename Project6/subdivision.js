//Allows creation of animals by subdivision
class subdivisionObj {
  constructor() {
    this.points = [];

    this.p2 = [];
    this.iterations = 0;
  }

  pointDist(x, y) {
    var result = false;
    for (var i = 0; i < this.points.length; i++) {
      if (dist(x, y, this.points[i].x, this.points[i].y) < 10) {
        result = true;
        done = 1;
      }
    }
    return result;
  }

  splitPoints() {
    this.p2.splice(0, this.p2.length);
    for (var i = 0; i < this.points.length - 1; i++) {
      this.p2.push(new p5.Vector(this.points[i].x, this.points[i].y));
      this.p2.push(
        new p5.Vector(
          (this.points[i].x + this.points[i + 1].x) / 2,
          (this.points[i].y + this.points[i + 1].y) / 2
        )
      );
    }
    this.p2.push(new p5.Vector(this.points[i].x, this.points[i].y));
    this.p2.push(
      new p5.Vector(
        (this.points[0].x + this.points[i].x) / 2,
        (this.points[0].y + this.points[i].y) / 2
      )
    );
  }

  average() {
    for (var i = 0; i < this.p2.length - 1; i++) {
      var x = (this.p2[i].x + this.p2[i + 1].x) / 2;
      var y = (this.p2[i].y + this.p2[i + 1].y) / 2;
      this.p2[i].set(x, y);
    }
    var x = (this.p2[i].x + this.points[0].x) / 2;
    var y = (this.p2[i].y + this.points[0].y) / 2;
    this.points.splice(0, this.points.length);
    for (i = 0; i < this.p2.length; i++) {
      this.points.push(new p5.Vector(this.p2[i].x, this.p2[i].y));
    }
  }

  subdivide() {
    this.splitPoints();
    this.average();
  }

  draw(fillColor) {
    stroke(0);
    fill(fillColor);
    strokeWeight(1);
    beginShape();
    for (var i = 0; i < this.points.length; i++) {
      vertex(this.points[i].x, this.points[i].y);
    }
    vertex(this.points[0].x, this.points[0].y);
    endShape();

    if (this.iterations < 5) {
      this.subdivide();
      this.iterations++;
    }
  }
}
