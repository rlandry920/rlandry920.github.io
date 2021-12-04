var balloons;
var gameWonPortal1, gameWonPortal2;

function setupGameWon() {
  balloons = [];
  for (var i = 0; i < 100; i++) {
    balloons.push(
      new balloon(random(20, width - 20), random(height + 100, height + 500))
    );
  }
  gameWonPortal1 = new portal(100, 30);
  gameWonPortal2 = new portal(620, 30);
}

//Draw game won animation
function drawGameWon() {
  drawGradient(fall1, fall2, 0, width / 4, 0, height);
  drawGradient(winter1, winter2, width / 4, width / 2, 0, height);
  drawGradient(spring1, spring2, width / 2, (3 * width) / 4, 0, height);
  drawGradient(summer1, summer2, (3 * width) / 4, width, 0, height);

  textFont(titleFont);
  textSize(100);
  strokeWeight(8);
  stroke(255);
  fill(254, 8, 3);
  text("YOU WIN", 230, 100);
  var time = "";
  var min = int(gameTimer / 60);
  var sec = gameTimer % 60;
  if (sec < 10) {
    time = min + ":0" + sec;
  } else {
    time = min + ":" + sec;
  }
  textSize(65);
  textAlign(CENTER);
  text(
    "Congratulations! You sprinted through all of the seasons with " +
      time +
      " minutes remaining",
    410,
    240,
    700
  );
  textAlign(LEFT);
  fill(255);
  stroke(0);
  textSize(50);
  strokeWeight(7);
  text("RETURN TO MAIN MENU", 175, 650);

  //Make balloons fly up
  for (var i = 0; i < balloons.length; i++) {
    balloons[i].draw();
    balloons[i].float();
  }

  gameWonPortal1.draw();
  gameWonPortal2.draw();
}
