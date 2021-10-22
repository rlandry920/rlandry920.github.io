// Systems of particle systems
// this.particles point to objects of particles
gravity = new p5.Vector(0, 0.02);

class rockObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    this.on = true;
    this.stop = true;
  }

  execute() {
    if (this.particles.length < 100 && !this.stop) {
      this.particles.push(new particleObj(this.x, this.y));
      this.particles.push(new particleObj(this.x, this.y));
      this.particles.push(new particleObj(this.x, this.y));
    }
    for (var i = 0; i < this.particles.length; i++) {
      if (
        this.particles[i].timeLeft > 0 &&
        this.particles[i].position.y < this.y
      ) {
        this.particles[i].draw();
        this.particles[i].move();
      } else {
        this.particles.splice(i, 1);
        this.stop = true;
      }
    }
  }
  draw() {
    image(rockImg, this.x-40, this.y-30, 80, 80)
  }
}
