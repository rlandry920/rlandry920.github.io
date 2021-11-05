//This class represents the pellets that the pac man can eat
class pellet{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.eaten = false
  }
  
  draw(){
    fill(255)
    circle(this.x, this.y, 5)
  }
  
  //Check to see if player has eaten pellet
  checkHit(){
    if(abs(pacmanPlayer.x-this.x)<12 && abs(pacmanPlayer.y-this.y)<12 && !pacmanPlayer.hit){
      this.eaten = true;
      score +=10
    }
  }
}