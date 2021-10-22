var a;
let sunset1, sunset2, ocean1, ocean2;
let seaweeds, animals, boats;
let rock;

function setup() {
  createCanvas(600, 400);
  frameRate(20);
  a = random(1500);
  sunset1 = color(247, 191, 105);
  sunset2 = color(198, 105, 94);
  ocean1 = color(1, 147, 222);
  ocean2 = color(2, 72, 196);
  seaweeds = [];
  //Make seaweed
  for (var i = 1; i < 1; i++) {
    seaweeds.push(new seaweed(i * 40, 325, i * 40, 355));
  }
  //Make boats
  boats = [];
  for (i = 0; i < 5; i++) {
    boats.push(new boat(random(20, width - 20), 65));
  }
  //Make rock
  rock = new rockObj(550, 325);

  //Add all of the animals
  animals = [];
  animals.push(new dolphin(200, 200));
  animals.push(new jellyfish(300, 300));
  animals.push(new seahorse(500, 150));
  animals.push(new stingray(400, 200));
  animals.push(new crab(400, 375));
  animals.push(new fish(100, 200));
}

//Load in custom font
function preload() {
  rockImg = loadImage("../images/rock.png");
}

function mouseClicked() {
  var xCor = mouseX;
  var yCor = mouseY;
  //If the user clicks on the rock, it sprays bubbles
  if (dist(xCor, yCor, rock.x, rock.y + 10) < 35 && rock.stop && rock.particles.length == 0) {
    rock.stop = false;
  }
}

var draw = function () {
  drawSunset();
  drawOcean();
  for (var i = 0; i < seaweeds.length; i++) {
    seaweeds[i].draw();
  }
  noStroke();
  fill(220, 192, 139);
  rect(0, height - 40, width, 40);
  for (i = 0; i < animals.length; i++) {
    animals[i].draw();
    animals[i].wander();
    animals[i].checkHit();

  }
  for (i = 0; i < boats.length; i++) {
    boats[i].draw();
    boats[i].move();
  }
  if (rock.on) {
    rock.execute();
  }
  rock.draw();
};

function drawSunset() {
  //Draw gradient for sunset
  noFill();
  for (let i = 0; i <= height / 6; i++) {
    let inter = map(i, 0, height / 6, 0, 1);
    let c = lerpColor(sunset1, sunset2, inter);
    stroke(c);
    line(0, i, width, i);
  }
}

function drawOcean() {
  //Draw gradient for ocean
  noFill();
  for (let i = height / 6; i <= height; i++) {
    let inter = map(i, height / 6, height, 0, 1);
    let c = lerpColor(ocean1, ocean2, inter);
    stroke(c);
    line(0, i, width, i);
  }
}
