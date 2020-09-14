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
  async ngOnInit() {
    //auto login

    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf(' electron/') > -1) {
      this.isElectron = true;
    }

    if(this.isElectron){
      this.ui.updateProcessingStatus(true);
      //wait for ocean
      console.log('SignIn: Waiting For Quest OS...');
      while(!this.q.os.isReady()){
        console.log('SignIn: Waiting For Quest OS.');
        await this.ui.delay(1000);
      }

      console.log(this.q.os.hasConfigFile());
      if(this.q.os.hasConfigFile()){
        console.log('Importing Settings...');

        this.attemptImportSettings({}).then( (importSettingsStatus) => {
          console.log('Import Settings Status:',importSettingsStatus);
          console.log(importSettingsStatus);
          if(importSettingsStatus){
            console.log('SignIn: Settings Imported Successfully');
            this.ui.showSnack('Loading Channels...','Almost There', {duration:2000});
            this.jumpToChannels();
            this.ui.signIn();
            if(this.q.os.channels.getSelectedChannel() == 'NoChannelSelected'){
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
      else{
        this.ui.updateProcessingStatus(false);
        this.DEVMODE && console.log("SignIn: Not Signed In");
      }
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

    this.ui.showSnack('Parsing File...','Almost There');
      let parsedStringify;
    try{
       parsedStringify = JSON.parse(event.target['result']);
    }catch(error){}

    this.DEVMODE && console.log(parsedStringify);

      //this is a quick file and settings save before payment
    if(typeof(parsedStringify) == 'undefined' || typeof(parsedStringify.version) == 'undefined' || typeof(parsedStringify.appId) == 'undefined' || parsedStringify.appId != "quest-messenger-js"){
      //iNVALID FIlE FORMAT
      this.ui.showSnack('Not a valid QuestNetwork Keychain!','Got it!',{duration:2000});
      this.ui.updateProcessingStatus(false);
      return false;
    }
    else if(typeof(parsedStringify) != 'undefined' && typeof(parsedStringify.version) != 'undefined' && typeof(parsedStringify.appId) != 'undefined' && parsedStringify.appId == "quest-messenger-js"){
      //IMPORTED A .KEYCHAIN FILE
      let importSettingsStatus = await this.attemptImportSettings(parsedStringify);
      console.log('Sign In: Import Settings Status:',importSettingsStatus);
      if(importSettingsStatus){this.ui.showSnack('Opening Messages...','Almost There',{duration:2000});await this.jumpToChannels();return true;}
      else{this.ui.showSnack('Error Importing Settings!','Oh No');}
    }
    return false;
  }

  async jumpToChannels(){
    this.router.navigate(['/messages']);
    this.ui.toTabIndex(1);
    this.ui.enableTab('channelTab');
    this.ui.disableTab('signInTab');

    if(this.q.os.channels.getSelectedChannel() == 'NoChannelSelected' ){
      this.ui.updateProcessingStatus(false);
    }

    return true;
  }

  async generateDefaultSettings(){
    this.ui.updateProcessingStatus(true);
    let importSettingsStatus = await this.attemptImportSettings({});
    console.log('Import Settings Status:',importSettingsStatus);
    importSettingsStatus = await this.attemptImportSettings({});

    if(importSettingsStatus){
      this.ui.showSnack('Default Settings Loaded...','Almost There', {duration: 2000});
      console.log("Default Settings Loaded...");
      await this.jumpToChannels();
    }
    else{this.ui.showSnack('Error Importing Settings!','Oh No');}
  }

  channelNameList = [];
  channelName;

  async attemptImportSettings(parsedStringify){
    try{
        await this.importSettings(parsedStringify);
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

  async importSettings(parsedStringify){
    console.log('Sign In: Importing Settings ...');
    this.DEVMODE && console.log(parsedStringify);
      this.ui.setElectronSize('0');
      this.ui.updateProcessingStatus(true);
      this.completeChallengeScreen = false;


      this.DEVMODE && console.log('SignIn: Reading Bee Config...')
      while(!this.q.os.isReady()){
        await this.ui.delay(2000);
      }
      this.q.os.signIn(parsedStringify);


      //wait for ipfs
      this.ui.showSnack('Discovering Swarm...','Yeh');

      console.log('SignIn: Waiting for Quest OS...');
      while(!this.q.os.isReady()){
        console.log('SignIn: Waiting for Quest OS...');
        await this.ui.delay(5000);
      }

      this.ui.showSnack('Swarm Discovered...','Cool',{duration:1000});

      let defaultChannel = this.q.os.channels.getSelectedChannel();
      console.log('SignIn: Selecting Channel: '+defaultChannel+'...');
      this.q.os.channels.selectChannel(defaultChannel);
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
