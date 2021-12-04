//Tilemap for fall level
var fallTilemap = [
  "                    ",
  "               l    ",
  "w w            w    ",
  "                  l ",
  "w w w w     w w w w ",
  "                    ",
  "                    ",
  "          l         ",
  "   l             l  ",
  "                    ",
  "w w w       w w w w ",
  "                    ",
  "                    ",
  "w w w w w w w w     ",
  "                    ",
  "    l          l    ",
  "w w w w w w w w w w ",
];

var winterTilemap = [
  "                    i         ",
  "                    i         ",
  "iiii   s            i         ",
  "      iii   s       is        ",
  "           iii  s   iii       ",
  "                ii  i         ",
  "                    i    s    ",
  "    ii     s     s  i         ",
  " s           iiiiiiii         ",
  "                              ",
  "iii                           ",
  "                   s          ",
  "                             s",
  "    iii                     ii",
  "    i                         ",
  "    is    s    s              ",
  "iiiiiiiiiiiiiiiiiiiiiiiiiiiiii",
];

var springTilemap = [
  "                    ",
  "                    ",
  "ggggggg             ",
  "                    ",
  "           r        ",
  "         gggg       ",
  "  r              r  ",
  "gggggg          gg  ",
  "                    ",
  "  r r r r    g r   r",
  "ggggggggggg  ggggggg",
  "                    ",
  "                    ",
  "            r       ",
  "                    ",
  "                    ",
  " r   r g          r ",
  "gggggggg         ggg",
  "             r       ",
  "           gggg     ",
  "                    ",
  "       r            ",
  "     ggg            ",
  "             r      ",
  "                    ",
  "                    ",
  "                    ",
  "                 ggg",
  "                    ",
  "    r               ",
  "   ggg              ",
  "                    ",
  "     r         r    ",
  "gggggggggggggggggggg",
];

var summerTilemap = [
  "                    ",
  "  r                 ",
  "sssss               ",
  "                    ",
  "         rr         ",
  "        sss         ",
  " r r             r r",
  "ssss            ssss",
  "                    ",
  "         rr         ",
  "                    ",
  "                    ",
  "       r r r r      ",
  "      sssssss       ",
  "                    ",
  "    r   r r r   r r ",
  "ssssssssssssssssssss",
];

//This class represents the logs in the fall level
class woodBlock {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    image(woodBlockImg, this.x, this.y, 82, 40);
  }
}

//This class represents the ice cubes in the winter level
class iceBlock {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    image(iceBlockImg, this.x, this.y, 42, 40);
  }
}

//This class represents the ice cubes in the winter level
class grassBlock {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    image(grassBlockImg, this.x, this.y, 42, 40);
  }
}

//This class represents the sand in the summer level
class sandBlock {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    image(sandBlockImg, this.x, this.y, 42, 40);
  }
}

//Create tilemaps for each level
function initTilemap() {
  //Fall level
  for (var i = 0; i < fallTilemap.length; i++) {
    for (var j = 0; j < fallTilemap[i].length; j++) {
      switch (fallTilemap[i][j]) {
        case "w":
          woodBlocks.push(new woodBlock(j * 40 - 5, i * 40 + 20));
          break;
        case "l":
          leafTokens.push(new leaf(j * 40, i * 40 + 15));
          break;
      }
    }
  }

  //Winter level
  for (var i = 0; i < winterTilemap.length; i++) {
    for (var j = 0; j < winterTilemap[i].length; j++) {
      switch (winterTilemap[i][j]) {
        case "i":
          iceBlocks.push(new iceBlock(j * 40, i * 40 + 20));
          break;
        case "s":
          snowflakeTokens.push(new snowflake(j * 40 + 20, i * 40 + 15));
          break;
      }
    }
  }

  //Spring level
  for (var i = 0; i < springTilemap.length; i++) {
    for (var j = 0; j < springTilemap[i].length; j++) {
      switch (springTilemap[i][j]) {
        case "g":
          grassBlocks.push(new grassBlock(j * 40, (i - 17) * 40 + 20));
          break;
        case "r":
          raindropTokens.push(new raindrop(j * 40, (i - 17) * 40 + 15));
          break;
      }
    }
  }

  //Summer level
  for (var i = 0; i < summerTilemap.length; i++) {
    for (var j = 0; j < summerTilemap[i].length; j++) {
      switch (summerTilemap[i][j]) {
        case "s":
          sandBlocks.push(new sandBlock(j * 40, i * 40 + 20));
          break;
        case "r":
          sunTokens.push(new ray(j * 40, i * 40 + 15));
          break;
      }
    }
  }
}
