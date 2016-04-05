//PlaceMultipagePDF.jsx
//An InDesign JavaScript
//Places all of the pages of a multi-page PDF for pattern tiles.
//
//For more on InDesign/InCopy scripting see the documentation included in the Scripting SDK 
//available at http://www.adobe.com/devnet/indesign/sdk.html
//or visit the InDesign Scripting User to User forum at http://www.adobeforums.com
//
main();
function main() {
  //Make certain that user interaction (display of dialogs, etc.) is turned on.
  app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
  //Display a standard Open File dialog box.
  var myPDFFile = File.openDialog("Choose a PDF File");
  if ((myPDFFile !== "") && (myPDFFile !== null)) {
    var myDocument, myPage;
    if (app.documents.length !== 0) {
      var myTemp = myChooseDocument();
      myDocument = myTemp[0];
    }
    else {
      myDocument = app.documents.add();
    }

    if (myDocument.pages.length > 1) {
      myPage = myChoosePage(myDocument);
    }
    else {
      myPage = myDocument.pages.item(0);
    }

    var patternName = getPatternName();

    var docPref = myDocument.documentPreferences;
    docPref.pageWidth =  "8.5in";
    docPref.pageHeight = "11in";
    docPref.pageOrientation = PageOrientation.portrait;
    docPref.facingPages = false;

    myDocument.marginPreferences.top =    "0.5in";
    myDocument.marginPreferences.bottom = "0.5in";
    myDocument.marginPreferences.left =   "0.5in";
    myDocument.marginPreferences.right =  "0.5in";

    // Set the document's ruler origin to page origin. This is very important
    // --if you don't do this, getting objects to the correct position on the
    // page is much more difficult.
    myDocument.viewPreferences.rulerOrigin = RulerOrigin.pageOrigin;

    var pageNumberLayer = myDocument.layers.add();
    pageNumberLayer.name = "TilePageNumbers";

    var tileOutlineLayer = myDocument.layers.add();
    tileOutlineLayer.name = "tileOutlines";

    var master = myDocument.masterSpreads.item(0);
    var pageNumberTextFrame = master.textFrames.add(pageNumberLayer);
    pageNumberTextFrame.geometricBounds = [
      "5.2in",  // y1
      "5.3in", // x1
      "5in",    // y2
      "0.8in"  // x2
    ];
    pageNumberTextFrame.rotationAngle = 90;
    pageNumberTextFrame.insertionPoints.item(-1).contents = "Sew Liberated - " + patternName + " - Page ";
    pageNumberTextFrame.insertionPoints.item(-1).contents = SpecialCharacters.autoPageNumber;
    pageNumberTextFrame.paragraphs.item(0).justification = Justification.rightAlign;

    var tileOutline = master.rectangles.add(tileOutlineLayer);
    tileOutline.geometricBounds = ["0.5in", "1in", "10.5in", "7.5in"];
    tileOutline.strokeTint = 25;

    myPlacePDF(myDocument, myPage, myPDFFile);
  }
}

function getPatternName() {
  var patternName;
  var patternNameDialog = app.dialogs.add({
    name: 'Pattern Name',
    canCancel: false
  });
  var patternNameField = patternNameDialog.dialogColumns.add().textEditboxes.add({
    editContents: 'Enter the name of this pattern',
    minWidth: 180
  });

  var result = patternNameDialog.show();
  if (result === true) {
    patternName = patternNameField.editContents;
  }
  patternNameDialog.destroy();
  return patternName;
}

function myChooseDocument() {
  var myDocumentNames = [];
  myDocumentNames.push("New Document");
  //Get the names of the documents
  for(var myDocumentCounter = 0;myDocumentCounter < app.documents.length; myDocumentCounter++) {
    myDocumentNames.push(app.documents.item(myDocumentCounter).name);
  }
  var myChooseDocumentDialog = app.dialogs.add(
      {name:"Choose a Document", canCancel:false}
  );
  var row = myChooseDocumentDialog.dialogColumns.add().dialogRows.add();
  row.dialogColumns.add() .staticTexts.add({staticLabel:"Place PDF in:"});
  var myChooseDocumentDropdown =
   row.dialogColumns.add().dropdowns.add(
     {stringList:myDocumentNames, selectedIndex:0}
   );

  var myResult = myChooseDocumentDialog.show();
  if (myResult === true) {
    if (myChooseDocumentDropdown.selectedIndex === 0) {
      myDocument = app.documents.add();

    }
    else {
      myDocument = app.documents.item(myChooseDocumentDropdown.selectedIndex-1);
    }
    myChooseDocumentDialog.destroy();
  }
  else {
    myDocument = "";
    myChooseDocumentDialog.destroy();
  }
  return [myDocument];
}

function myChoosePage(myDocument) {
  alert(myDocument.name);
  var myPageNames = [];
  //Get the names of the pages in the document
  for(var myCounter = 0; myCounter < myDocument.pages.length;myCounter++) {
    myPageNames.push(myDocument.pages.item(myCounter).name);
  }
  var myChoosePageDialog = app.dialogs.add({name:"Choose a Page", canCancel:false});
  var row = myChoosePageDialog.dialogColumns.add().dialogRows.add();
  row.dialogColumns.add().staticTexts.add({staticLabel:"Place PDF on:"});
  var myChoosePageDropdown = row.dialogColumns.add().dropdowns.add(
    {stringList:myPageNames, selectedIndex:0}
  );

  myChoosePageDialog.show();
  var myPage = myDocument.pages.item(myChoosePageDropdown.selectedIndex);
  myChoosePageDialog.destroy();
  return myPage;
}

function myPlacePDF(myDocument, myPage, myPDFFile) {
  var myPDFPage, myFirstPage;
  app.pdfPlacePreferences.pdfCrop = PDFCrop.cropMedia;
  var myCounter = 1;
  var myBreak = false;
  while(myBreak === false) {
    if (myCounter > 1) {
      myPage = myDocument.pages.add(LocationOptions.after, myPage);
    }
    app.pdfPlacePreferences.pageNumber = myCounter;
    myPDFPage = myPage.place(File(myPDFFile), ["1in", "0.5in"])[0];
    if (myCounter == 1) {
      myFirstPage = myPDFPage.pdfAttributes.pageNumber;
    }
    else {
      if (myPDFPage.pdfAttributes.pageNumber == myFirstPage) {
        myPage.remove();
        myBreak = true;
      }
    }
    myCounter = myCounter + 1;
  }
}
