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

  initLoadConfig(){
    console.log('Importing Settings...');

    this.attemptImportSettings({}).then( (importSettingsStatus) => {
      console.log('Import Settings Status:',importSettingsStatus);
      console.log(importSettingsStatus);
      if(importSettingsStatus){
        console.log('SignIn: Settings Imported Successfully');
        this.ui.showSnack('Loading Channels...','Almost There', {duration:2000});
        this.jumpToChannels();
        this.ui.signIn();
        if(this.q.os.channel.getSelected() == 'NoChannelSelected'){
          this.ui.updateProcessingStatus(false);
        }
      }
      else{
              this.ui.updateProcessingStatus(false);
              this.ui.showSnack('SignIn: No Settings Imported','Oh Ok');
          }
    }).catch( (error) => {
      this.ui.updateProcessingStatus(false);
      this.ui.showSnack('SignIn: Error Importing Settings!','Oh No');
      this.DEVMODE && console.log(error);
    });
  }

  async ngOnInit() {
    //auto login

    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf(' electron/') > -1) {
      this.isElectron = true;
    }

    console.log(this.q.os.hasLocalStorage());

    if(this.isElectron){
      this.ui.updateProcessingStatus(true);
      //wait for ocean
      console.log('SignIn: Waiting For Quest OS...');
      while(!this.q.os.isReady()){
        console.log('SignIn: Waiting For Quest OS.');
        await this.ui.delay(1000);
      }

      if(this.q.os.hasConfigFile()){
        this.initLoadConfig();
      }
      else{
        this.ui.updateProcessingStatus(false);
        this.DEVMODE && console.log("SignIn: Not Signed In");
      }
    }
    else if(!this.isElectron && this.q.os.hasLocalStorage()){
      this.ui.updateProcessingStatus(true);
      //wait for ocean
      console.log('SignIn: Waiting For Quest OS...');
      while(!this.q.os.isReady()){
        console.log('SignIn: Waiting For Quest OS.');
        await this.ui.delay(1000);
      }

      this.initLoadConfig();
    }
    else{
      this.ui.updateProcessingStatus(false);
    }

  }


   DEVMODE = swarmJson['dev'];

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



async openFileLoaded(event){

      let config;
    try{
       config = JSON.parse(event.target['result']);
    }catch(error){}

    this.DEVMODE && console.log(config);

      //this is a quick file and settings save before payment
    if(typeof(config) == 'undefined' || typeof(config.version) == 'undefined' || typeof(config.appId) == 'undefined' || config.appId != "qDesk"){
      //iNVALID FIlE FORMAT
      this.ui.showSnack('Not a valid qDesk Keychain!','Got it!',{duration:2000});
      this.ui.updateProcessingStatus(false);
      return false;
    }
    else if(typeof(config) != 'undefined' && typeof(config.version) != 'undefined' && typeof(config.appId) != 'undefined' && config.appId == "qDesk"){
      //IMPORTED A .KEYCHAIN FILE
      let importSettingsStatus = await this.attemptImportSettings(config);
      console.log('Sign In: Import Settings Status:',importSettingsStatus);
      if(importSettingsStatus){this.ui.showSnack('Opening Messages...','Almost There',{duration:2000});await this.jumpToChannels();return true;}
      else{this.ui.showSnack('Error Importing Settings!','Oh No');}
    }
    else{
      this.ui.updateProcessingStatus(false);
      return false;
    }
  }

  async jumpToChannels(){
    this.router.navigate(['/messages']);
    this.ui.toTabIndex(1);
    this.ui.enableTab('channelTab');
    this.ui.disableTab('signInTab');

    if(this.q.os.channel.getSelected() == 'NoChannelSelected' ){
      this.ui.updateProcessingStatus(false);
    }

    return true;
  }

  async generateDefaultSettings(){
    this.ui.updateProcessingStatus(true);
    let importSettingsStatus = await this.attemptImportSettings({});
    console.log('Import Settings Status:',importSettingsStatus);
    if(importSettingsStatus){
      this.ui.showSnack('Default Settings Loaded...','Almost There', {duration: 2000});
      console.log("Default Settings Loaded...");
      await this.jumpToChannels();
    }
    else{this.ui.showSnack('Error Importing Settings!','Oh No');}
  }

  channelNameList = [];
  channelName;

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

      while(!this.q.os.isReady()){
        console.log('SignIn: Waiting for Quest OS...');
        await this.ui.delay(5000);
      }

      this.ui.showSnack('Signing In...','Cool',{duration:1000});
      this.q.os.signIn(config);
      console.log('SignIn: Selecting Channel: '+this.q.os.channel.getSelected()+'...');
      this.q.os.channel.select(this.q.os.channel.getSelected());
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



  public files: NgxFileDropEntry[] = [];





}
