//Draw instructions
function drawHowToPlay() {
  instructionsCount++;
  if (instructionsCount > 100) {
    instructionsCount = 0;
    sampleButton.pressed = !sampleButton.pressed;
  }

  textFont(titleFont);
  textSize(80);
  strokeWeight(8);
  stroke(0);
  fill(255);
  text("HOW TO PLAY", 180, 80);
  if (howToPlayPage == 1) {
    textSize(40);
    text("Use arrow keys and W,A,S,D to move the 2 players", 500, 150, 600);
    text(
      "The bears must work together to get to the end and complete each level before time runs out",
      500,
      300,
      600
    );
    text(
      "Watch out for the evil bunnies! If they hit you, you lose a life",
      500,
      500,
      600
    );
    strokeWeight(1);
    fill(150);
    rect(80, 140, 35, 35);
    rect(40, 180, 35, 35);
    rect(120, 180, 35, 35);
    rect(80, 180, 35, 35);
    fill(100);

    //Hightlight different keys
    if (instructionsCount >= 0 && instructionsCount < 25) {
      rect(80, 140, 35, 35);
    } else if (instructionsCount >= 25 && instructionsCount < 50) {
      rect(40, 180, 35, 35);
    } else if (instructionsCount >= 50 && instructionsCount < 75) {
      rect(120, 180, 35, 35);
    } else if (instructionsCount >= 75 && instructionsCount < 100) {
      rect(80, 180, 35, 35);
    }

    stroke(255);
    fill(255);
    line(80, 150, 80, 140);
    line(50, 180, 40, 180);
    line(110, 180, 120, 180);
    line(80, 180, 80, 170);
    noStroke();
    triangle(75, 180, 85, 180, 80, 185);
    triangle(75, 140, 85, 140, 80, 135);
    triangle(120, 175, 120, 185, 125, 180);
    triangle(40, 175, 40, 185, 35, 180);

    //Draw sample characters
    sampleBlackBear.position.x = 50;
    sampleBrownBear.position.x = 110;
    sampleBlackBear.position.y = 340;
    sampleBrownBear.position.y = 340;
    sampleBrownBear.draw();
    sampleBlackBear.draw();
    sampleRabbit.draw();
  }
  //Draw second page of instructions
  else if (howToPlayPage == 2) {
    textSize(40);
    text(
      "Stand on buttons that will help you navigate through the map",
      500,
      150,
      600
    );
    text(
      "Once you have collected all of the tokens for that season, a portal will open up and both bears have to walk through to get to the next level",
      500,
      300,
      600
    );
    samplePortal.draw();
    sampleButton.draw();
  }

  stroke(0);
  strokeWeight(4);
  fill(255, 255, 0);
  triangle(420, 580, 420, 620, 450, 600);
  triangle(380, 580, 380, 620, 350, 600);
  strokeWeight(8);
  stroke(0);
  fill(255);
  textSize(60);
  text("BACK", 337, 680);
  strokeWeight(1);
}
