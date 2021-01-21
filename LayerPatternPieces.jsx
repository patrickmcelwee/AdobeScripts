// An Illustrator Javascript
// Assists with layering pattern pieces

layerTextLabels(); 
function layerTextLabels() {
  var myDocument = app.activeDocument;
  var minSize = 0;
  var maxSize = 24;
  for (size=minSize; size <= maxSize; size += 2) {
    var sizeString = size.toString();
    // moves "size" labels to "Size ${size}" layer
    var targetLayer = myDocument.layers.getByName("Size " + sizeString);
    for (i=0; i < myDocument.textFrames.length; i++) {
      var thisFrame = myDocument.textFrames[i];
      if (thisFrame.contents === sizeString) {
        thisFrame.move(targetLayer, ElementPlacement.PLACEATEND);
      }
    }
  }
}
