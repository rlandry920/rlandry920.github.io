class leaf {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.speed=2;
  }
  
  draw(){
    image(leafImg, this.x, this.y, 30, 30)
  }
  
  fall(){
    this.y += this.speed;
    if(this.y > height+10){
      this.y = 0;
      this.x = random(0, width / 4 - 30);
    }
  }
}