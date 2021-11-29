var backgroundColour, nodeColour, edgeColour;
var nodeSize = 8;

//This function creates a cuboid based on 8 nodes
var createCuboid = function (x, y, z, w, h, d, cubeColor) {
  //Create nodes based on position and dimensions
  var nodes = [
    [x, y, z],
    [x, y, z + d],
    [x, y + h, z],
    [x, y + h, z + d],
    [x + w, y, z],
    [x + w, y, z + d],
    [x + w, y + h, z],
    [x + w, y + h, z + d],
  ];
  //Create 12 edges based on nodes
  var edges = [
    [0, 1],
    [1, 3],
    [3, 2],
    [2, 0],
    [4, 5],
    [5, 7],
    [7, 6],
    [6, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ];
  //Create 6 faces
  var faces = [
    [0, 1, 3, 2],
    [4, 5, 7, 6],
    [0, 2, 6, 4],
    [1, 3, 7, 5],
    [0, 1, 5, 4],
    [2, 3, 7, 6],
  ];

  //Create normals for each of the 6 faces
  var nNode0 = [x, y + h / 2, z + d / 2];
  var nNode0b = [x - 100, y + h / 2, z + d / 2];
  var nNode1 = [x + w, y + h / 2, z + d / 2];
  var nNode1b = [x + w + 100, y + h / 2, z + d / 2];
  var nNode2 = [x + w / 2, y + h / 2, z];
  var nNode2b = [x + w / 2, y + h / 2, z - 100];
  var nNode3 = [x + w / 2, y + h / 2, z + d];
  var nNode3b = [x + w / 2, y + h / 2, z + d + 100];
  var nNode4 = [x + w / 2, y + h, z + d / 2];
  var nNode4b = [x + w / 2, y + h - 100, z + d / 2];
  var nNode5 = [x + w / 2, y, z + d / 2];
  var nNode5b = [x + w / 2, y + 100, z + d / 2];

  var nNodes = [nNode0, nNode1, nNode2, nNode3, nNode4, nNode5];
  var nNodesB = [nNode0b, nNode1b, nNode2b, nNode3b, nNode4b, nNode5b];

  //Return all of the values of the cuboid
  return {
    nodes: nodes,
    edges: edges,
    faces: faces,
    nNodes: nNodes,
    nNodesB: nNodesB,
    cubeColor: cubeColor,
  };
};

var shapes = [];

// Rotate shape around the z-axis
var rotateZ3D = function (theta, nodes, nNodes, nNodesB) {
  var sinTheta = sin(theta);
  var cosTheta = cos(theta);

  //Rotates nodes
  for (var n = 0; n < nodes.length; n++) {
    var node = nodes[n];
    var x = node[0];
    var y = node[1];
    node[0] = x * cosTheta - y * sinTheta;
    node[1] = y * cosTheta + x * sinTheta;
  }

  //Rotates normals
  for (n = 0; n < nNodes.length; n++) {
    var node = nNodes[n];
    var x = node[0];
    var y = node[1];
    node[0] = x * cosTheta - y * sinTheta;
    node[1] = y * cosTheta + x * sinTheta;
  }

  for (n = 0; n < nNodesB.length; n++) {
    var node = nNodesB[n];
    var x = node[0];
    var y = node[1];
    node[0] = x * cosTheta - y * sinTheta;
    node[1] = y * cosTheta + x * sinTheta;
  }
};

var rotateY3D = function (theta, nodes, nNodes, nNodesB) {
  var sinTheta = sin(theta);
  var cosTheta = cos(theta);

  //Rotate nodes
  for (var n = 0; n < nodes.length; n++) {
    var node = nodes[n];
    var x = node[0];
    var z = node[2];
    node[0] = x * cosTheta - z * sinTheta;
    node[2] = z * cosTheta + x * sinTheta;
  }

  //Rotate normals
  for (var n = 0; n < nNodes.length; n++) {
    var node = nNodes[n];
    var x = node[0];
    var z = node[2];
    node[0] = x * cosTheta - z * sinTheta;
    node[2] = z * cosTheta + x * sinTheta;
  }

  for (var n = 0; n < nNodesB.length; n++) {
    var node = nNodesB[n];
    var x = node[0];
    var z = node[2];
    node[0] = x * cosTheta - z * sinTheta;
    node[2] = z * cosTheta + x * sinTheta;
  }
};

var rotateX3D = function (theta, nodes, nNodes, nNodesB) {
  var sinTheta = sin(theta);
  var cosTheta = cos(theta);

  //Rotate nodes
  for (var n = 0; n < nodes.length; n++) {
    var node = nodes[n];
    var y = node[1];
    var z = node[2];
    node[1] = y * cosTheta - z * sinTheta;
    node[2] = z * cosTheta + y * sinTheta;
  }

  //Rotate normals
  for (var n = 0; n < nNodes.length; n++) {
    var node = nNodes[n];
    var y = node[1];
    var z = node[2];
    node[1] = y * cosTheta - z * sinTheta;
    node[2] = z * cosTheta + y * sinTheta;
  }

  for (var n = 0; n < nNodesB.length; n++) {
    var node = nNodesB[n];
    var y = node[1];
    var z = node[2];
    node[1] = y * cosTheta - z * sinTheta;
    node[2] = z * cosTheta + y * sinTheta;
  }
};

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  backgroundColour = color(255, 255, 255);

  //Create colors for the table

  checkerColor1 = color(92, 52, 32);
  checkerColor2 = color(164, 102, 61);

  baseColor = color(60, 36, 26);

  trim1Color = color(97, 56, 45);

  legColor = color(137, 81, 50);
  legColorDark = color(81, 42, 23);

  //Create checkered top
  tableTop1 = createCuboid(-120, -20, -20, 60, 10, 60, checkerColor1);
  tableTop2 = createCuboid(-60, -20, -20, 60, 10, 60, checkerColor2);
  tableTop3 = createCuboid(0, -20, -20, 60, 10, 60, checkerColor1);
  tableTop4 = createCuboid(60, -20, -20, 60, 10, 60, checkerColor2);
  tableTop5 = createCuboid(-120, -20, 40, 60, 10, 60, checkerColor2);
  tableTop6 = createCuboid(-60, -20, 40, 60, 10, 60, checkerColor1);
  tableTop7 = createCuboid(0, -20, 40, 60, 10, 60, checkerColor2);
  tableTop8 = createCuboid(60, -20, 40, 60, 10, 60, checkerColor1);

  //Create 4 legs
  leg1 = createCuboid(-120, -15, -20, 20, 100, 20, legColor);
  leg2 = createCuboid(100, -15, -20, 20, 100, 20, legColor);
  leg3 = createCuboid(-120, -15, 80, 20, 100, 20, legColor);
  leg4 = createCuboid(100, -15, 80, 20, 100, 20, legColor);

  //Create base of table
  base = createCuboid(100, 60, 80, -200, -5, -80, baseColor);

  //Add all shapes to the array
  shapes = [
    tableTop1,
    tableTop2,
    tableTop3,
    tableTop4,
    tableTop5,
    tableTop6,
    tableTop7,
    tableTop8,
    leg1,
    leg2,
    leg3,
    leg4,
    base,
  ];

  //Start with rotation
  for (var shapeNum = 0; shapeNum < shapes.length; shapeNum++) {
    var nodes = shapes[shapeNum].nodes;
    var nNodes = shapes[shapeNum].nNodes;
    var nNodesB = shapes[shapeNum].nNodesB;
    rotateY3D(-40, nodes, nNodes, nNodesB);
    rotateX3D(-20, nodes, nNodes, nNodesB);
  }
}

var closestLegZ = 0;
var closestLegNum = 0;

var draw = function () {
  background(backgroundColour);
  var nodes, edges, faces, nNodes, nNodesB;
  var visibleFaces = [];
 closestLegZ = 0;
 closestLegNum = 0;
  push();
  translate(200, 200);
  //Draw each shape
  for (var shapeNum = 0; shapeNum < shapes.length; shapeNum++) {
    nodes = shapes[shapeNum].nodes;
    edges = shapes[shapeNum].edges;
    faces = shapes[shapeNum].faces;
    nNodes = shapes[shapeNum].nNodes;
    nNodesB = shapes[shapeNum].nNodesB;
    var closestZ = 0;

    //Only draw faces that are facing toward the screen
    for (var f = 0; f < faces.length; f++) {
      if (nNodesB[f][2] - nNodes[f][2] > 0) {
        if (nNodes[f][2] > closestZ) {
          closestZ = nNodesB[f][2];
        }
        //Color the faces of the legs differently
        if (shapeNum >= 8 && shapeNum <= 11) {
          visibleFaces.push(
            new faceObj(
              [
                [nodes[faces[f][0]][0], nodes[faces[f][0]][1]],
                [nodes[faces[f][1]][0], nodes[faces[f][1]][1]],
                [nodes[faces[f][2]][0], nodes[faces[f][2]][1]],
                [nodes[faces[f][3]][0], nodes[faces[f][3]][1]],
              ],
              nNodes[f][2],
              shapes[shapeNum].cubeColor,
              legColorDark,
              nNodesB[f][0] - nNodes[f][0],
              shapeNum
            )
          );
        } else {
          visibleFaces.push(
            new faceObj(
              [
                [nodes[faces[f][0]][0], nodes[faces[f][0]][1]],
                [nodes[faces[f][1]][0], nodes[faces[f][1]][1]],
                [nodes[faces[f][2]][0], nodes[faces[f][2]][1]],
                [nodes[faces[f][3]][0], nodes[faces[f][3]][1]],
              ],
              nNodes[f][2],
              shapes[shapeNum].cubeColor
            )
          );
        }
      }
    }

    //Find the leg that is closest to the screen
    if (shapeNum >= 8 && shapeNum <= 11) {
      if (closestZ > closestLegZ) {
        closestLegNum = shapeNum;
      }
    }
  }

  //Order faces from furtherst away to closest
  visibleFaces.sort(compareFaces);

  //Draw faces that are furthest away first
  //This prevents any overlappying
  for (var v = 0; v < visibleFaces.length; v++) {
    var visibleFace = visibleFaces[v];
    var corners = visibleFace.corners;
    var normal = visibleFace.normal;
    //Color the inside leg faces darker but only if its not the closest lef to the screen
    if ((
      (normal < 0 && corners[0][0] > 50) ||
      (normal > 0 && corners[0][0] < 50)
    ) && visibleFace.shapeNum != closestLegNum) {
      fill(visibleFace.darkColor);
    } else {
      fill(visibleFace.color);
    }
    noStroke();
    //Draw each face using the nodes
    quad(
      corners[0][0],
      corners[0][1],
      corners[1][0],
      corners[1][1],
      corners[2][0],
      corners[2][1],
      corners[3][0],
      corners[3][1]
    );
  }

  pop();
};

//This function is used to order the faces from further to nearest using the z position
function compareFaces(a, b) {
  return a.z - b.z;
}

mouseDragged = function () {
  var dx = mouseX - pmouseX;
  var dy = mouseY - pmouseY;

  for (var shapeNum = 0; shapeNum < shapes.length; shapeNum++) {
    var nodes = shapes[shapeNum].nodes;
    var nNodes = shapes[shapeNum].nNodes;
    var nNodesB = shapes[shapeNum].nNodesB;

    //Rotate object based on mouse position
    rotateY3D(dx, nodes, nNodes, nNodesB);
    rotateX3D(dy, nodes, nNodes, nNodesB);
  }
};

//Class represents a face that is pointed toward the screen
class faceObj {
  constructor(corners, z, color, darkColor, normal, shapeNum) {
    this.corners = corners;
    this.z = z;
    this.color = color;
    this.darkColor = darkColor;
    this.normal = normal;
    this.shapeNum = shapeNum;
  }
}
