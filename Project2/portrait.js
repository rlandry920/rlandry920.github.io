function customPortrait(){
  createCanvas(400, 400);
  background(255, 255, 255, 0)
  scale(0.8)
  //Hair
  fill(28, 16, 15);
  arc(260, 290, 240, 320, QUARTER_PI + HALF_PI, QUARTER_PI, OPEN);

  //Face 
  noStroke()
  fill(247, 221, 212);
  ellipse(260, 255, 180, 230);
  
  //Hat
  noStroke()
  fill(0,0,0)
  rect(170,90,180,100,10)
  triangle(260, 90, 100, 230, 420, 230);
  fill(255,255,255)
  //rect(260,200,200,200)
  
  //Eyebrows
  stroke(28, 16, 15);
  strokeWeight(6);
  noFill();
  arc(210, 242, 45, 15, PI, TWO_PI, OPEN);
  arc(310, 242, 45, 15, PI, TWO_PI, OPEN);
  noStroke()
  fill(247, 221, 212)
  rect(319,234,3,8)

  //Eyes

  stroke(0,0,0);
  strokeWeight(5);
  arc(212, 262, 35, 20, PI, TWO_PI, OPEN);
  arc(308, 262, 35, 20, PI, TWO_PI, OPEN);
  strokeWeight(1)
  fill(32, 19, 19);
  ellipse(220, 265, 28, 28);
  ellipse(300, 265, 28, 28);

  //Eyeballs
  noStroke()
  fill(255)
  ellipse(225, 257, 8, 8);
  ellipse(304, 257, 8, 8);

  //Mouth
  fill(232, 124, 104);
  arc(260, 325, 35, 30, 0, PI);
  fill(232, 124, 104);
  arc(252, 325, 18, 8, PI,0);
  arc(268, 325, 18, 8, PI,0);
  
  //Shirt
  fill(252, 143, 121)
  rectMode(CENTER)
  fill(203, 175, 237)
  rect(210, 480, 100, 170, 40);
  fill(189, 230, 156)
  rect(310, 480, 100, 170, 40)
  fill(252, 188, 187)
  rect(260, 480, 70, 170)


  //Neck
  fill(247, 221, 212)
  rect(260, 380, 50, 65, 20);

 
  //Chain
  stroke(220,220,220)
  strokeWeight(4)
  noFill()
  arc(260,395,60,80,TWO_PI, PI)

  images.push(get(0,0,width,height));
}
