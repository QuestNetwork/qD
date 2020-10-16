import { Component, OnInit, Input,ViewChild} from '@angular/core';
import { UiService} from '../services/ui.service';
import { QuestOSService } from '../services/quest-os.service';
import packageJson from '../../../package.json';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { saveAs } from 'file-saver';
import swarmJson from '../swarm.json';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  @ViewChild('newMessage') newMessage;

  fs: any;

  constructor(private router: Router,private ui: UiService, private q: QuestOSService) {

  }

  stringifyStore;
isElectron = false;


  pwdInput(event){
    if (event.keyCode === 13) {
      this.signIn(this.pwd);
    }

  }


   DEVMODE = true;

  public processing;
  public completeChallengeScreen = false;

  async openFile(files){
    this.ui.updateProcessingStatus(true);
    const droppedFile = files[0];

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          let fileStoreReader = new FileReader();
          fileStoreReader.addEventListener('load', (event) => {
            this.openFileLoaded(event);
          });

          fileStoreReader.readAsText(file);
        });
      }
    }


     fileOpen;

async openFileLoaded(event){

      let config = event.target['result'];
    try{
       config = JSON.parse(config);
    }catch(error){}

    this.DEVMODE && console.log(config);
    this.DEVMODE && console.log(typeof config);


      //this is a quick file and settings save before payment
    if(typeof config != 'string' || (typeof(config) == 'object' && (typeof config['version'] == 'undefined' || typeof config['appId'] == 'undefined' || config['appId'] != "qDesk"))){
      //iNVALID FIlE FORMAT
      console.log('Import Failed');
      this.ui.showSnack('Not a valid qDesk Keychain!','Got it!',{duration:2000});
      this.ui.updateProcessingStatus(false);
      return false;
    }
    else{
      //IMPORTED A .KEYCHAIN FILE
      this.fileOpen = config;

      let importSettingsStatus = false;
      try{
           importSettingsStatus = await this.attemptImportSettings(config);
      }catch(e){
        this.ui.updateProcessingStatus(false);
        // this.pwdFail = true;
        this.pwd = "";
         throw('pwd');
      }
      console.log('Sign In: Import Settings Status:',importSettingsStatus);
      if(importSettingsStatus)
      {
        this.ui.showSnack('Opening Messages...','Almost There',{duration:2000});
        await this.jumpToChannels();
        return true;
      }
      else{
        this.ui.updateProcessingStatus(false);
        this.ui.showSnack('Error Importing Settings!','Oh No');
        return false;
      }
    }

  }

  async jumpToChannels(){

    if(!this.q.os.hasPassword()){
      this.router.navigate(['/settings/account']);
      this.ui.enableTab('channelTab');
      this.ui.disableTab('signInTab');
      this.ui.updateProcessingStatus(false);
    }
    else{
      this.router.navigate(['/messages']);
      this.q.os.ui.toTabIndex(1);
      this.ui.enableTab('channelTab');
      this.ui.disableTab('signInTab');

      if(this.q.os.channel.getSelected() == 'NoChannelSelected' ){
        this.ui.updateProcessingStatus(false);
      }

      return true;
    }

  }

  async generateDefaultSettings(){
    this.q.os.bee.config.deleteConfig()
    this.ui.updateProcessingStatus(true);
    let importSettingsStatus = false;
    try{
         importSettingsStatus = await this.attemptImportSettings({});
    }catch(e){
      this.ui.updateProcessingStatus(false);
this.pwd = "";
       throw('pwd');
    }    console.log('Import Settings Status:',importSettingsStatus);
    if(importSettingsStatus){
      this.ui.showSnack('Default Settings Loaded...','Almost There', {duration: 2000});
      console.log("Default Settings Loaded...");
      await this.jumpToChannels();
    }
    else{this.ui.showSnack('Error Importing Settings!','Oh No');}
  }

  channelNameList = [];
  channelName;
  passwordDialog = false;

  async attemptImportSettings(config = {}){
    try{
        await this.importSettings(config);
        return true;
    }
    catch(error){
      if(error == 'keychain invalid'){
        this.ui.showSnack('Invalid Keychain!','Start Over',{duration:8000});
        this.ui.delay(2000);
        //window.location.reload();
        return false;
      }
      else if(error == 'pwd'){
        this.passwordDialog = true;
        // this.ui.showSnack('Bad Password!','Start Enter',{duration:8000});
        // this.ui.delay(2000);
        this.ui.updateProcessingStatus(false);
        this.pwd = "";
        throw('pwd');
        //window.location.reload();
      }
      else{
        this.ui.showSnack('Swarm Error =(','Start Over', {duration:8000});

        console.log(error);
        await this.ui.delay(5000);
      //  window.location.reload();
        return false;
      }
    }
  }

  async importSettings(config = {}){
    console.log('Sign In: Importing Settings ...');

    this.DEVMODE && console.log(config);
      this.ui.setElectronSize('0');
      this.ui.updateProcessingStatus(true);
      this.completeChallengeScreen = false;

      //wait for ipfs
      this.q.os.sendBootMessage('Waiting For Peers...');
      this.start();
      while(!this.q.os.isReady()){
        console.log('SignIn: Waiting for Quest OS...');
        this.q.os.sendBootMessage('Waiting For Peers... '+this.end()+'s');
        await this.ui.delay(5000);
      }

      // this.ui.showSnack('Signing In...','Cool',{duration:1000});
      try{
        this.q.os.sendBootMessage('Signing In...');
        this.q.os.signIn(config);
        console.log('SignIn: Selecting Channel: '+this.q.os.channel.getSelected()+'...');
        this.q.os.channel.select(this.q.os.channel.getSelected());
      }catch(e){
        console.log(e);
        if(e == 'pwd'){
          this.pwd = "";
          throw('pwd');
        }

        throw('keychain invalid');
      }
      return true;
    }

    public async dropped(files) {
      this.ui.updateProcessingStatus(true);
      // console.log(files);
      if(String(files[0].relativePath).endsWith('.qcprofile')){
        return this.openFile(files);
      }
      else{
        this.ui.updateProcessingStatus(false);
        alert("No suitable Quest Chat Profile!");
        this.ui.snackBarDismiss();
      }
    }

  public fileOver(event){

  }


  initLoadConfig(config = {}){
    console.log('Importing Settings...');

    this.attemptImportSettings(config).then( (importSettingsStatus) => {
      console.log('Import Settings Status:',importSettingsStatus);
      console.log(importSettingsStatus);
      if(importSettingsStatus){
        console.log('SignIn: Settings Imported Successfully');
        this.fileOpen = undefined;
        this.jumpToChannels();
      }
      else{
              this.ui.updateProcessingStatus(false);
              this.ui.showSnack('SignIn: No Settings Imported','Oh Ok');
          }
    }).catch( (error) => {

      if(error == 'pwd'){

          this.ui.updateProcessingStatus(false);

           throw('pwd');

      }else{
        this.ui.updateProcessingStatus(false);
        this.ui.showSnack('SignIn: Error Importing Settings!','Oh No');
        this.DEVMODE && console.log(error);
      }

    });
  }

   startTime;
   endTime;

   start() {
    this.startTime = new Date();
  };

   end() {
    this.endTime = new Date();
    let timeDiff = this.endTime - this.startTime; //in ms
    // strip the ms
    timeDiff /= 1000;

    // get seconds
    return Math.round(timeDiff);
  }

  pwd = "";
  async signIn(pwd){

    this.ui.updateProcessingStatus(true);

    console.log('SignIn: Waiting For Quest OS...');
    this.q.os.sendBootMessage('Waiting For Peers...');
    this.start();
    while(!this.q.os.isReady()){
      this.q.os.sendBootMessage('Waiting For Peers... '+this.end()+'s');
      await this.ui.delay(1000);
    }

    this.q.os.setPwd(pwd);
    // console.log(pwd);
    await this.ui.delay(2000);
    this.ngOnInit();

  }

  hide = true;
    async ngOnInit() {
      //auto login

      var userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.indexOf('electron') > -1) {
        this.isElectron = true;
      }
//
      // console.log('hasLocalStorage:',this.q.os.hasLocalStorage());
      // console.log('hasConfigFile:',this.isElectron && this.q.os.hasConfigFile())
      if((this.isElectron && this.q.os.hasConfigFile()) || typeof this.fileOpen != 'undefined' || (!this.isElectron && this.q.os.hasLocalStorage())){
        this.ui.updateProcessingStatus(true);
        //wait for ocean
        console.log('SignIn: Waiting For Quest OS...');
        this.q.os.sendBootMessage('Waiting For Peers...');
        this.start();
        while(!this.q.os.isReady()){
          console.log('SignIn: Waiting For Quest OS.');
          this.q.os.sendBootMessage('Waiting For Peers... '+this.end()+'s');
          await this.ui.delay(1000);
        }

        if(typeof this.fileOpen != 'undefined'){
            this.initLoadConfig( this.fileOpen);
        }
        // !this.isElectron && this.q.os.hasLocalStorage())
        else{
          this.initLoadConfig();
        }
      }
      else{
        this.DEVMODE && console.log("SignIn: Not Signed In");
        this.ui.updateProcessingStatus(false);
      }

    }



  public files: NgxFileDropEntry[] = [];





}
