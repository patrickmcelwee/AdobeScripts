// An Illustrator Javascript
// Assists with layering pattern pieces

layerTextLabels(); 
function layerTextLabels() {
  var myDocument = app.activeDocument;
  // moves "14" labels to "Size 14" layer
  var targetLayer = myDocument.layers.getByName("Size 14");
  for (i=0; i < myDocument.textFrames.length; i++) {
    var thisFrame = myDocument.textFrames[i];
    if (thisFrame.contents === "14") {
      thisFrame.move(targetLayer, ElementPlacement.PLACEATEND);
    }
  }
}
