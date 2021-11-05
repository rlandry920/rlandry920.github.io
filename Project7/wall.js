//This class represents the walls in the game map
class wall{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  
  draw(){
    fill(0, 0, 255)
    rect(this.x, this.y, 20, 20);
  }
}