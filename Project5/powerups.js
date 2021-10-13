class scopePowerUp{
  
  constructor(x, y){
     this.x = x;
    this.y = y;
    this.hit = false;
  }
  
  draw() {
    noFill();
    circle(this.x, this.y, 16)
        circle(this.x, this.y, 8)

    line(this.x-12, this.y, this.x -4, this.y)
        line(this.x+12, this.y, this.x +4, this.y)
    line(this.x, this.y-12, this.x, this.y-8)
        line(this.x, this.y+12, this.x, this.y+8)
  }
  
  checkHit(){
    if(abs(player.x-this.x) <18 && abs(player.y-this.y) < 18){
      this.hit = true;
      player.scopeCounter = 5*frameRate();
    }
  }
}

class rapidFirePowerUp{
  
  constructor(x, y){
     this.x = x;
    this.y = y;
    this.hit = false;
  }
  
  draw() {
    fill(0)
    textSize(20)
    textStyle(NORMAL)
    text("x2", this.x-10, this.y)
  }
  
  checkHit(){
    if(abs(player.x-this.x) <18 && abs(player.y-this.y) < 20){
      this.hit = true;
      player.rapidFireCounter = 5*frameRate();
    }
  }
}

class shieldPowerUp{
  
  constructor(x, y){
     this.x = x;
    this.y = y;
    this.hit = false;
  }
  
  draw() {
    noFill();
    stroke(0);
    bezier(this.x-8, this.y-5, this.x-7, this.y, this.x-8, this.y+8, this.x,this.y+10)
        bezier(this.x+8, this.y-5, this.x+7, this.y, this.x+8, this.y+8, this.x,this.y+10)
        bezier(this.x-8, this.y-5, this.x-6, this.y-3, this.x-2, this.y-4, this.x,this.y-10)
            bezier(this.x+8, this.y-5, this.x+6, this.y-3, this.x+2, this.y-4, this.x,this.y-10)



  }
  
  checkHit(){
    if(abs(player.x-this.x) <18 && abs(player.y-this.y) < 20){
      this.hit = true;
      player.shieldCounter = 5*frameRate();
    }
  }
}