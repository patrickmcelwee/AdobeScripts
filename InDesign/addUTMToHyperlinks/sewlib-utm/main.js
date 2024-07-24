const { entrypoints } = require("uxp");
const { app } = require("indesign");

entrypoints.setup({
  commands: {
    addUTMToHyperlinks: () => addUTMToHyperlinks()
  },
  panels: {
    showPanel: {
      show({node} = {}) {}
    }
  }
});

addUTMToHyperlinks = () => {
  const doc = app.activeDocument;
  const links = doc.hyperlinkURLDestinations;
  // links.forEach(link => {
  //   const url = link.destinationURL;
  //   if (url.includes('sewlib.com') || url.includes('sewliberated.com')) {
  //     link.url
  //   }
  // })

    const dialog = app.dialogs.add();
    const col = dialog.dialogColumns.add();
    const colText = col.staticTexts.add();
    colText.staticLabel = "here are the hyperlinks" + links;

    dialog.canCancel = false;
    dialog.show();
    dialog.destroy();
    return;
}
