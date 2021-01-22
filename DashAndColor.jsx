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

function dashAndColorize() {
  var myDocument = app.activeDocument;

  var dialog = new Window("dialog", "Enter Sizes");

  var minSize = parseInt(prompt("Enter the minimum size", 0));
  validateSize(minSize);

  var maxSize = parseInt(prompt("Enter the maximum size", 24));
  validateSize(maxSize);

  var moss = new RGBColor();
  moss.red = 45;
  moss.green = 106;
  moss.blue = 44;

  for (size=minSize; size <= maxSize; size += 2) {
    var sizeString = size.toString();
    var targetLayer = myDocument.layers.getByName("Size " + sizeString);

    // change simple paths
    changePaths(targetLayer.pathItems, moss);

    // change paths in groups
    var groups = targetLayer.groupItems;
    for (var i=0; i < groups.length; i++) {
      changePaths(groups[i].pathItems, moss);
    }

    // change simple text
    var textFrames = targetLayer.textFrames;
    for (var textIndex = 0; textIndex < textFrames.length; textIndex++) {
      textFrames[textIndex].textRange.fillColor = moss;
    }
  }
}

dashAndColorize();
