var clockX;
var clockDir;

function setupTimesUp() {
  clockX = 240;
  clockDir = 5;
}

function drawTimesUp() {
  if (!alarmNoise.isPlaying() && soundOn) {
    alarmNoise.play();
  }
  if (clockX <= 235 || clockX >= 245) {
    clockDir *= -1;
  }
  clockX += clockDir;
  background(100);
  textFont(titleFont);
  textSize(100);
  strokeWeight(8);
  stroke(255);
  fill(254, 8, 3);
  stroke(0);

  image(clockImg, clockX, 100, 300, 320);
  text("TIMES UP", 220, 100);
  textSize(45);
  textAlign(CENTER);
  var season = "";
  if (currLevel == 0) {
    season = "Fall";
  } else if (currLevel == 1) {
    season = "Winter";
  } else if (currLevel == 2) {
    season = "Spring";
  } else if (currLevel == 3) {
    season = "Summer";
  }
  fill(255, 234, 12);
  text(
    "You sprinted till " + season + " before running out of time",
    410,
    440,
    700
  );
  textAlign(LEFT);
  fill(255);
  textSize(50);
  strokeWeight(7);
  text("RETURN TO MAIN MENU", 175, 650);
  textSize(65);
}
