function drawOptions() {
  textFont(titleFont);
  textSize(80);
  strokeWeight(8);
  stroke(0);
  fill(255);
  text("OPTIONS", 270, 80);
  textSize(60);
  text("SWAP", 330, 200);
  text("TIME LIMIT", 50, 400);
  text("LIVES", 50, 500);
  text("SOUND", 50, 600);
  text("ON", 450, 600);
  text("OFF", 650, 600);

  text("BACK", 337, 680);

  textAlign(CENTER);

  //Allow user to change time limit
  let timeText = "";
  if (timeLimit == 1) {
    timeText = timeLimit + " MINUTE";
  } else {
    timeText = timeLimit + " MINUTES";
  }
  text(timeText, 590, 400, 400);
  text(lives, 590, 500, 400);
  textAlign(LEFT);
  textSize(40);
  text("WASD", 100, 280);
  text("ARROWS", 580, 280);

  noStroke();
  fill(255, 255, 0);
  rect(400, 380, 40, 10, 5);
  rect(750, 380, 40, 10, 5);
  rect(750, 380, 10, 40, 5);
  rect(400, 480, 40, 10, 5);
  rect(750, 480, 40, 10, 5);
  rect(750, 480, 10, 40, 5);
  rect(580, 580, 40, 10, 5);

  //Allow user to turn sound on and off
  fill(255);
  if (soundOn) {
    circle(560, 580, 20);
  } else {
    circle(600, 580, 20);
  }
  stroke(0);
  strokeWeight(8);
  line(310, 180, 280, 180);
  line(280, 180, 290, 165);
  line(280, 180, 290, 195);
  line(490, 180, 520, 180);
  line(520, 180, 510, 165);
  line(520, 180, 510, 195);
  strokeWeight(1);
  noFill();
  //Allow user to switch which keys control each bear
  if (brownBearArrows) {
    sampleBlackBear.position.x = 150;
    sampleBrownBear.position.x = 650;
  } else {
    sampleBrownBear.position.x = 150;
    sampleBlackBear.position.x = 650;
  }
  sampleBlackBear.position.y = 180;
  sampleBrownBear.position.y = 180;
  sampleBrownBear.draw();
  sampleBlackBear.draw();
}
