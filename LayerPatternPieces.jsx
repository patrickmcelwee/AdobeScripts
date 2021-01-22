// An Illustrator Javascript
// Assists with layering pattern pieces

function validateSize(size) {
  if (isNaN(size) || size < 0 || size % 2 !== 0) {
    throw("Not a valid size, must be multiple of 2: " + size)
  }
}

function layerTextLabels() {
  //Make certain that user interaction (display of dialogs, etc.) is turned on.
  app.userInteractionLevel = UserInteractionLevel.DISPLAYALERTS;

  var myDocument = app.activeDocument;

  var minSize = parseInt(prompt("Enter the minimum size", 0));
  validateSize(minSize);

  var maxSize = parseInt(prompt("Enter the maximum size", 24));
  validateSize(maxSize);

  for (size=minSize; size <= maxSize; size += 2) {
    var sizeString = size.toString();
    // moves "size" labels to "Size ${size}" layer
    var targetLayer;
    try {
      targetLayer = myDocument.layers.getByName("Size " + sizeString);
    } catch(e) {
      alert("Layer 'Size " + sizeString + "' does not exist. Adding it now. " + e);
      targetLayer = myDocument.layers.add();
      targetLayer.name = "Size " + sizeString;
    }
    if (targetLayer) {
      for (i=0; i < myDocument.textFrames.length; i++) {
        var thisFrame = myDocument.textFrames[i];
        if (thisFrame.contents === sizeString) {
          thisFrame.move(targetLayer, ElementPlacement.PLACEATEND);
        }
      }
    } else {
      alert("No such layer: Size " + sizeString);
    }
  }
}

layerTextLabels(); 
