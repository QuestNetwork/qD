const { app, BrowserWindow } = require("electron");
const NativeImage = require("electron").nativeImage;
const path = require("path");
const url = require("url");
const open = require("open");
let win;



function createWindow() {

  // const { width, height } = screen.getPrimaryDisplay().workAreaSize;


  win = new BrowserWindow({ width: 1030, height: 655, backgroundColor: "#ffffff",
    acceptFirstMouse: true,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      backgroundThrottling: false,
      enableRemoteModule: true
    },
    icon: NativeImage.createFromPath(__dirname + '/dist/web/assets/icon.png')
  });
  win.removeMenu();
  setTimeout( () => {
    win.loadURL(`file://${__dirname}/dist/web/index.html`);
  }, 250);


  win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {

      event.preventDefault();
      open(url);
    //
    // if (frameName === 'modal') {
    //   // open window as modal
    //   event.preventDefault()
    //   Object.assign(options, {
    //     // modal: true,
    //     parent: win,
    //     width: 910,
    //     height: 680
    //   });
    //   event.newGuest = new BrowserWindow(options)
    //
    // }
    //   else{
    // // event.preventDefault();
    //       Object.assign(options, {
    //         // url: `file://${__dirname}/dist/web/index.html`,
    //          // parent: win,
    //          width: 610, height: 380, frame: false, transparent: true, backgroundColor: "#00ffffff",
    //            acceptFirstMouse: true,
    //            webPreferences: {
    //                    webSecurity: false
    //                }
    //        });
    //   }
    });


  // win.webContents.openDevTools({mode: 'undocked'})


  // The following is optional and will open the DevTools:
  // win.webContents.openDevTools()
  win.on("closed", () => {
    app.quit();
  });

  // ipcMain.on('resize', function (e, x, y) {
  //   win.setSize(x, y);
  // });
}



app.on("ready", createWindow);
// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  // if (process.platform !== "darwin") {
    app.quit();
  // }
});




// CAPTCHA GENERATION AND VALIDATION FOR OWNERS
//
//
// p2pCaptchaService = require('express')();
// const SvgCaptchaFactory = require('@questnetwork/quest-captcha-js')();
//
// // Respond a svg captcha image.
// p2pCaptchaService.get('/captcha', function (req, res) {
//   var captcha = SvgCaptchaFactory.create();
//   res.type('application/json');
//   res.status(200).send(JSON.stringify(captcha));
// });
