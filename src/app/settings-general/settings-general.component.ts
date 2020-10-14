import { Component, ViewChild, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { UiService} from '../services/ui.service';
import { QuestOSService } from '../services/quest-os.service';
import { NbMenuItem } from '@nebular/theme';
import { NbMenuService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'qdesk-settings-general',
  templateUrl: './settings-general.component.html',
  styleUrls: ['./settings-general.component.scss']
})
export class SettingsGeneralComponent implements OnInit {

  constructor(private http: HttpClient, private menu: NbMenuService, private ui: UiService, private q: QuestOSService) {


    if(this.q.os.isSignedIn()){
      this.signIn();
    }
    this.q.os.onSignIn().subscribe( () => {
      this.signIn();
    });

    this.q.os.onSignIn().subscribe( () => {

      if(this.q.os.getSaveLock()){
        this.saveLockInactive = false;
      }else{
        this.saveLockInactive = true;
      }
    });



  }
  // @ViewChild('driveLockStatusField') driveLockStatusField;
sideBarFixed = { left:false}
autoSaveInterval = 30*10000;

  DEVMODE = true;


  ngOnInit(){

    setTimeout( () => {
      this.ui.updateProcessingStatus(false);
    },10000)

    if(this.q.os.getSaveLock()){
      this.saveLockInactive = false;
    }else{
      this.saveLockInactive = true;
    }




    this.autoSaveActive = this.q.os.getAutoSave();
    this.autoSaveInterval = this.q.os.getAutoSaveInterval();

    if(typeof this.q.os.getStorageLocation() != 'undefined'){
      this.storageLocation = this.q.os.getStorageLocation();
    }

    if(this.q.os.utilities.engine.detect() == 'electron'){
        this.isElectron = true;
    }



  }
  isElectron = false;

  reboot(){
    this.q.os.reboot();
  }

  autoSaveIntervalChanged(v){
     this.q.os.setAutoSaveInterval(v);
  }
  selectedSetting = "General";
  signedIn = false;
  signIn(){

    if(this.signedIn){
      return true;
    }

    this.signedIn = true;
  }

  saveLockInactive = true;
  saveLockInactiveToggled(){
    // console.log('toggled');
      let oldSaveLockStatus = this.q.os.getSaveLock();
      if(oldSaveLockStatus){
        this.q.os.disableSaveLock();
      }
      else{
        this.q.os.enableSaveLock();
      }
  }


  autoSaveActive = true;

  getAutoSave(){
    return this.q.os.getAutoSave();
  }
  autoSaveActiveToggled(){
    if(!this.q.os.getAutoSave()){
      this.q.os.enableAutoSave();
    }
    else{
      this.q.os.disableAutoSave();
    }
  }

  storageLocation = "LocalStorage";
  storageLocationChanged(v){
    this.q.os.setStorageLocation(v);
  }
  getStorageLocation(){
    this.q.os.getStorageLocation();
  }


}
