//This class represents the ghosts that use a star to chase
class ghost {
  constructor(x, y, c) {
    this.position = new p5.Vector(x, y);
    this.color = c;
    this.state = [new chaseState(), new wanderState()];
    this.currState = 1;
    this.whisker1 = new p5.Vector(0, 0);
    this.whisker2 = new p5.Vector(0, 0);
    this.graph = new Array(20);
    this.cost = new Array(20);
    this.inq = new Array(20);
    this.comefrom = new Array(20);
    this.path = [];
    this.q = [];
    this.pathLen = 0;
    this.pathFound = 0;
    this.qLen = 0;
    this.qStart = 0;
    this.initialized = 0;
    this.target = new targetObj(0, 0);
    this.targetPos = new targetObj(0, 0);
    this.finalDest = new targetObj(0, 0);
    this.haveWanderTarget = false;

    //Initialize all variables needs for a star search
    for (var i = 0; i < 20; i++) {
      this.graph[i] = new Array(20);
      this.cost[i] = new Array(20);
      this.inq[i] = new Array(20);
      this.comefrom[i] = new Array(20);
    }
    for (i = 0; i < 400; i++) {
      this.path.push(new p5.Vector(0, 0));
      this.q.push(new qObj(0, 0));
    }
    for (i = 0; i < 20; i++) {
      for (var j = 0; j < 20; j++) {
        this.comefrom[i][j] = new p5.Vector(0, 0);
      }
    }

    //Fill graph based on tilemap
    for (i = 0; i < tilemap.length; i++) {
      for (var j = 0; j < tilemap[i].length; j++) {
        if (tilemap[i][j] == "w") {
          this.graph[i][j] = -1;
        } else {
          this.graph[i][j] = 0;
        }
      }
    }

    this.initialized = 1;
  }

  draw() {
    rectMode(CORNER);
    noStroke();
    fill(this.color);
    ellipse(this.position.x, this.position.y - 3, 18, 13);
    rect(this.position.x - 9, this.position.y - 3, 18, 8);
    triangle(
      this.position.x - 9,
      this.position.y + 5,
      this.position.x - 6,
      this.position.y + 5,
      this.position.x - 9,
      this.position.y + 10
    );
    triangle(
      this.position.x - 6,
      this.position.y + 5,
      this.position.x - 3,
      this.position.y + 10,
      this.position.x,
      this.position.y + 5
    );
    triangle(
      this.position.x + 6,
      this.position.y + 5,
      this.position.x + 3,
      this.position.y + 10,
      this.position.x,
      this.position.y + 5
    );
    triangle(
      this.position.x + 9,
      this.position.y + 5,
      this.position.x + 6,
      this.position.y + 5,
      this.position.x + 9,
      this.position.y + 10
    );

    fill(255, 255, 255);
    ellipse(this.position.x - 3, this.position.y - 3, 5, 8);
    ellipse(this.position.x + 3, this.position.y - 3, 5, 8);
    fill(0, 0, 255);
    ellipse(this.position.x - 4, this.position.y - 3, 2, 3);
    ellipse(this.position.x + 2, this.position.y - 3, 2, 3);
    rectMode(CENTER);
  }

  //Check to see if the ghost has hit the player
  //If so, the player loses a life
  checkHit() {
    if (
      abs(this.position.x - pacmanPlayer.x) <= 10 &&
      abs(this.position.y - pacmanPlayer.y) <= 10 &&
      !pacmanPlayer.invincible
    ) {
      if (lives == 0) {
        gameOver = true;
        if(score > highScore){
          highScore = score;
        }
      }
      lives--;
      pacmanPlayer.hit = true;
      pacmanPlayer.invincible = true;
      this.refreshPath();
    }
  }

  changeState(x) {
    this.currState = x;
  }

  //Initialize graph for a star search
  initGraph(x, y) {
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 20; j++) {
        if (this.graph[i][j] > 0) {
          this.graph[i][j] = 0;
        }
        this.inq[i][j] = 0;
        this.cost[i][j] = 0;
      }
    }

    this.graph[x][y] = 1;
  }

  //Perform a star search to compute path
  findAStarPath(x, y) {
    var i, j, a, b;
    this.qLen = 0;
    this.graph[x][y] = 1;
    this.inq[x][y] = 1;
    this.q[this.qLen].setC(x, y);
    this.q[this.qLen].fcost = 0;
    this.qLen++;
    this.pathLen = 0;
    this.qStart = 0;

    while (this.qStart < this.qLen && this.pathFound === 0) {
      this.findMinInQ();
      i = this.q[this.qStart].x;
      j = this.q[this.qStart].y;
      this.graph[i][j] = 1;
      this.qStart++;

      if (i === this.targetPos.x && j === this.targetPos.y) {
        this.pathFound = 1;
        this.path[this.pathLen].set(j * 20 + 10, i * 20 + 10);
        this.pathLen++;
      }

      a = i + 1;
      b = j;
      if (a < 20 && this.pathFound === 0) {
        if (this.graph[a][b] === 0 && this.inq[a][b] === 0) {
          this.setComeFrom(a, b, i, j);
        }
      }
      a = i - 1;
      b = j;
      if (a >= 0 && this.pathFound === 0) {
        if (this.graph[a][b] === 0 && this.inq[a][b] === 0) {
          this.setComeFrom(a, b, i, j);
        }
      }
      a = i;
      b = j + 1;
      if (b < 20 && this.pathFound === 0) {
        if (this.graph[a][b] === 0 && this.inq[a][b] === 0) {
          this.setComeFrom(a, b, i, j);
        }
      }
      a = i;
      b = j - 1;
      if (b >= 0 && this.pathFound === 0) {
        if (this.graph[a][b] === 0 && this.inq[a][b] === 0) {
          this.setComeFrom(a, b, i, j);
        }
      }
    }

    while (i !== x || j !== y) {
      a = this.comefrom[i][j].x;
      b = this.comefrom[i][j].y;
      this.path[this.pathLen].set(b * 20 + 10, a * 20 + 10);
      this.pathLen++;
      i = a;
      j = b;
    }
  }
  setComeFrom(a, b, i, j) {
    this.inq[a][b] = 1;
    this.comefrom[a][b].set(i, j);
    this.q[this.qLen].setC(a, b);
    this.cost[a][b] = this.cost[i][j] + 10;
    this.q[this.qLen].fcost =
      this.cost[a][b] +
      dist(b * 20, a * 20, this.finalDest.x, this.finalDest.y);
    this.qLen++;
  }
  findMinInQ() {
    var min = this.q[this.qStart].fcost;
    var minIndex = this.qStart;
    for (var i = this.qStart + 1; i < this.qLen; i++) {
      if (this.q[i].fcost < min) {
        min = this.q[i].qStart;
        minIndex = i;
      }
    }
    if (minIndex !== this.qStart) {
      // swap
      var t1 = this.q[minIndex].x;
      var t2 = this.q[minIndex].y;
      var t3 = this.q[minIndex].fcost;
      this.q[minIndex].x = this.q[this.qStart].x;
      this.q[minIndex].y = this.q[this.qStart].y;
      this.q[minIndex].fcost = this.q[this.qStart].fcost;
      this.q[this.qStart].x = t1;
      this.q[this.qStart].y = t2;
      this.q[this.qStart].fcost = t3;
    }
  }

  //Create a new path for the ghost using the a star search
  refreshPath() {
    this.target.x = pacmanPlayer.x;
    this.target.y = pacmanPlayer.y;
    this.finalDest.x = this.target.x;
    this.finalDest.y = this.target.y;
    this.targetPos.x = floor(this.finalDest.y / 20);
    this.targetPos.y = floor(this.finalDest.x / 20);
    var i = floor(this.position.y / 20);
    var j = floor(this.position.x / 20);
    this.initGraph(i, j);
    this.pathFound = 0;
    this.pathLen = 0;
    this.findAStarPath(i, j);
    this.pathLen--;
    this.target.x = this.path[this.pathLen].x;
    this.target.y = this.path[this.pathLen].y;
  }
}

class chaseState {
  constructor() {
    this.step = new p5.Vector(0, 0);
  }

  execute(me) {
    //Keep going to each target of the path
    if (dist(me.target.x, me.target.y, me.position.x, me.position.y) > 1) {
      this.step.set(me.target.x - me.position.x, me.target.y - me.position.y);
      this.step.normalize();
      me.position.add(this.step); 
    } else {
      me.pathLen--;
      if (me.pathLen > 0) {
        me.target.x = me.path[me.pathLen].x;
        me.target.y = me.path[me.pathLen].y;
      } else {
        me.target.x = me.finalDest.x;
        me.target.y = me.finalDest.y;
      }
    }
    
    //If its further than 150 pixels from player, wander
    if (
      dist(pacmanPlayer.x, pacmanPlayer.y, me.position.x, me.position.y) >=
        150 ||
      pacmanPlayer.hit
    ) {
      me.changeState(1);
      me.haveWanderTarget = false;
    }
  }
}

class wanderState {
  constructor() {
    this.step = new p5.Vector(0, 0);
    this.wanderTarget = new targetObj(0, 0);
  }

  execute(me) {
    //Wander to random targets
    if (
      dist(
        this.wanderTarget.x,
        this.wanderTarget.y,
        me.position.x,
        me.position.y
      ) > 1 &&
      me.haveWanderTarget
    ) {
      this.step.set(
        this.wanderTarget.x - me.position.x,
        this.wanderTarget.y - me.position.y
      );
      this.step.normalize();
      me.position.add(this.step);
    } else {
      this.getWanderTarget(me);
      me.haveWanderTarget = true;
    }

    //If the ghost is within 150 pixels of the pacman, start chasing
    //Make sure to refresh path before chasing
    if (
      dist(pacmanPlayer.x, pacmanPlayer.y, me.position.x, me.position.y) <
        150 &&
      !pacmanPlayer.hit
    ) {
      me.changeState(0);
      me.refreshPath();
    }
  }

  //Get a random tile that is open and make it new target
  getWanderTarget(me) {
    var currI = floor(me.position.y / 20);
    var currJ = floor(me.position.x / 20);
    var openSquares = [];

    //Move one square away if you can
    if (currI > 0 && tilemap[currI - 1][currJ] != "w") {
      openSquares.push(new targetObj(currJ * 20 + 10, (currI - 1) * 20 + 10));
    }
    if (currI < 19 && tilemap[currI + 1][currJ] != "w") {
      openSquares.push(new targetObj(currJ * 20 + 10, (currI + 1) * 20 + 10));
    }
    if (currJ > 0 && tilemap[currI][currJ - 1] != "w") {
      openSquares.push(new targetObj((currJ - 1) * 20 + 10, currI * 20 + 10));
    }
    if (currJ < 19 && tilemap[currI][currJ + 1] != "w") {
      openSquares.push(new targetObj((currJ + 1) * 20 + 10, currI * 20 + 10));
    }

    //Move 2 squares away if you can
    if (
      currI > 1 &&
      tilemap[currI - 1][currJ] != "w" &&
      tilemap[currI - 2][currJ] != "w"
    ) {
      openSquares.push(new targetObj(currJ * 20 + 10, (currI - 2) * 20 + 10));
    }
    if (
      currI < 18 &&
      tilemap[currI + 1][currJ] != "w" &&
      tilemap[currI + 2][currJ] != "w"
    ) {
      openSquares.push(new targetObj(currJ * 20 + 10, (currI + 2) * 20 + 10));
    }
    if (
      currJ > 1 &&
      tilemap[currI][currJ - 1] != "w" &&
      tilemap[currI][currJ - 2] != "w"
    ) {
      openSquares.push(new targetObj((currJ - 2) * 20 + 10, currI * 20 + 10));
    }
    if (
      currJ < 18 &&
      tilemap[currI][currJ + 1] != "w" &&
      tilemap[currI][currJ + 2] != "w"
    ) {
      openSquares.push(new targetObj((currJ + 2) * 20 + 10, currI * 20 + 10));
    }
    var randomSquare = int(random(0, openSquares.length));
    this.wanderTarget = openSquares[randomSquare];
  }
}

class targetObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class qObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.fcost = 0;
  }

  setC(a, b) {
    this.x = a;
    this.y = b;
  }
}

//Find intersection in tilemap
function findIntersection(p) {
  var distance = 0;

  for (var i = 0; i < walls.length; i++) {
    var d = dist(p.x, p.y, walls[i].x, walls[i].y);
    if (d < 20) {
      distance += d;
    }
  }

  if (distance === 0) {
    distance = 100000;
  }

  return distance;
}
