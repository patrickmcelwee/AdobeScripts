// An Illustrator Javascript
// Assists with creating dashed, colored lines by size
// Assumes that all objects are appopriately placed on layers
//

function changePaths(paths, color) {
  for (var pathIndex=0; pathIndex < paths.length; pathIndex++) {
    paths[pathIndex].strokeColor = color;
  }
}

function dashAndColorize() {
  var myDocument = app.activeDocument;

  // light purple
  var moss = new CMYKColor();
  moss.cyan = 64;
  moss.magenta = 0;
  moss.yellow = 90;
  moss.black = 54;

  var targetLayer = myDocument.layers.getByName("Size 0");

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

dashAndColorize();
