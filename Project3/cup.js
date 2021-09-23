//This function creates a custom character for the baja blast cup
function customPrize() {
  createCanvas(400, 400)
  background(255, 255, 255, 0)
  let x = 100;
  let y = 200;
  noStroke();
  fill(211);
  rect(x, y - 170, 5, 250);
  fill(120, 222, 191);
  ellipse(x - 1, y + 99, 56, 20);
  quad(x - 30, y + 100, x + 30, y + 100, x + 40, y, x - 40, y);
  quad(x - 50, y - 70, x + 50, y - 70, x + 50, y - 15, x - 50, y - 15);
  rect(x - 43, y - 15, 85, 20, 5);

  noFill();
  stroke(255);
  bezier(x - 30, y + 100, x - 20, y + 120, x + 15, y + 110, x + 30, y + 100);
  line(x - 30, y + 100, x - 40, y);
  line(x + 30, y + 100, x + 40, y);
  bezier(x - 40, y, x - 20, y + 6, x + 15, y + 6, x + 40, y);
  bezier(x - 40, y, x - 45, y - 5, x - 45, y - 10, x - 42, y - 15);
  bezier(x + 40, y, x + 45, y - 5, x + 45, y - 10, x + 42, y - 15);
  bezier(x - 50, y - 18, x - 25, y - 10, x + 25, y - 10, x + 50, y - 18);
  bezier(x - 50, y - 18, x - 50, y - 60, x - 50, y - 95, x - 55, y - 100);
  bezier(x + 50, y - 18, x + 50, y - 60, x + 50, y - 95, x + 55, y - 108);
  bezier(x - 60, y - 105, x - 50, y - 120, x + 50, y - 120, x + 60, y - 105);
  bezier(x - 52, y - 90, x - 55, y - 95, x - 60, y - 90, x - 60, y - 105);
  bezier(x + 53, y - 100, x + 55, y - 100, x + 60, y - 105, x + 60, y - 105);

  bezier(x - 55, y - 125, x, y - 140, x + 58, y - 120, x + 60, y - 120);

  bezier(x + 60, y - 105, x + 62, y - 105, x + 62, y - 115, x + 60, y - 120);

  line(x - 55, y - 125, x - 60, y - 105);
  line(x - 50, y - 125, x - 51, y - 117);
  line(x - 45, y - 127, x - 46, y - 117);
  line(x - 45, y - 127, x - 46, y - 117);
  line(x - 40, y - 128, x - 41, y - 118);
  line(x - 35, y - 129, x - 36, y - 119);
  line(x - 30, y - 129, x - 31, y - 119);
  line(x - 25, y - 130, x - 26, y - 119);
  line(x - 20, y - 130, x - 21, y - 120);

  line(x - 15, y - 130, x - 16, y - 120);
  line(x - 10, y - 129, x - 11, y - 119);
  line(x - 10, y - 131, x - 11, y - 121);
  line(x - 5, y - 130, x - 6, y - 120);

  line(x + 1, y - 130, x, y - 120);
  line(x + 6, y - 130, x + 5, y - 121);
  line(x + 11, y - 130, x + 10, y - 120);
  line(x + 16, y - 129, x + 15, y - 120);
  line(x + 21, y - 128, x + 20, y - 121);
  line(x + 26, y - 128, x + 25, y - 120);
  line(x + 31, y - 127, x + 30, y - 119);
  line(x + 36, y - 125, x + 35, y - 117);
  line(x + 41, y - 124, x + 40, y - 116);
  line(x + 46, y - 123, x + 45, y - 115);
  line(x + 51, y - 122, x + 50, y - 114);
  line(x + 56, y - 121, x + 55, y - 113);

  //Take a screen capture and add it to images
  images.push(get(0, 0, width, height));
}