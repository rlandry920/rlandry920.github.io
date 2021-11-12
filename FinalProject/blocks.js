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
