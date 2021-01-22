// An Illustrator Javascript
// Assists with creating dashed, colored lines by size
// Assumes that all objects are appopriately placed on layers
//

function validateSize(size) {
  if (isNaN(size) || size < 0 || size % 2 !== 0) {
    throw("Not a valid size, must be multiple of 2: " + size)
  }
}

function changePaths(paths, color) {
  for (var pathIndex=0; pathIndex < paths.length; pathIndex++) {
    paths[pathIndex].strokeColor = color;
  }
}

function getColors() {
  var moss = new RGBColor();
  moss.red = 45;
  moss.green = 106;
  moss.blue = 44;

  var clay = new RGBColor();
  clay.red = 199;
  clay.green = 82;
  clay.blue = 47;

  var lavender = new RGBColor();
  lavender.red = 48;
  lavender.green = 39;
  lavender.blue = 119;

  var caramel = new RGBColor();
  caramel.red = 170;
  caramel.green = 112;
  caramel.blue = 73;

  var lightPurple = new RGBColor();
  lightPurple.red = 111;
  lightPurple.green = 94;
  lightPurple.blue = 246;

  var darkPurple = new RGBColor();
  darkPurple.red = 94;
  darkPurple.green = 31;
  darkPurple.blue = 64;

  var fern = new RGBColor();
  fern.red = 103;
  fern.green = 143;
  fern.blue = 95;

  var pink = new RGBColor();
  pink.red = 170;
  pink.green = 73;
  pink.blue = 124;

  return [moss, clay, lavender, caramel, lightPurple, darkPurple, fern, pink]
}

function dashAndColorize() {
  var myDocument = app.activeDocument;

  var minSize = parseInt(prompt("Enter the minimum size", 0));
  validateSize(minSize);

  var maxSize = parseInt(prompt("Enter the maximum size", 24));
  validateSize(maxSize);

  var colors =  getColors();
  var colorIndex = 0;

  for (size=minSize; size <= maxSize; size += 2) {
    var color = colors[colorIndex % colors.length];
    colorIndex = colorIndex + 1;
    var sizeString = size.toString();
    var targetLayer = myDocument.layers.getByName("Size " + sizeString);

    // change simple paths
    changePaths(targetLayer.pathItems, color);

    // change paths in groups
    var groups = targetLayer.groupItems;
    for (var i=0; i < groups.length; i++) {
      changePaths(groups[i].pathItems, color);
    }

    // change simple text
    var textFrames = targetLayer.textFrames;
    for (var textIndex = 0; textIndex < textFrames.length; textIndex++) {
      textFrames[textIndex].textRange.fillColor = color;
    }
  }
}

dashAndColorize();
