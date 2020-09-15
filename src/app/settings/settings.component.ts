import { Component, ViewChild, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { UiService} from '../services/ui.service';
import { QuestOSService } from '../services/quest-os.service';
import { NbMenuItem } from '@nebular/theme';
import { NbMenuService } from '@nebular/theme';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private menu: NbMenuService, private ui: UiService, private q: QuestOSService) {

    this.menu.onItemClick().subscribe((e) => {
      if(e['item']['title'] == 'Export'){
          this.q.os.exportConfig();
      }
      else if(e['item']['title'] == 'Sign Out'){
        this.q.os.signOut();
      }
      else if(typeof e['item']['title'] != 'undefined'){
        this.selectedSetting = e['item']['title'];
      }
    });

    if(this.q.os.isSignedIn()){
      this.signIn();
    }
    this.q.os.onSignIn().subscribe( () => {
      this.signIn();
    });
    this.q.os.onReady().subscribe( () => {
      console.log('OS Ready');
      this.ipfsOnline = true;
      this.bootstrapIpfsPeers = this.q.os.getIpfsBootstrapPeers();
    });
    this.q.os.onSignIn().subscribe( () => {

      if(this.q.os.getSaveLock()){
        this.saveLockInactive = false;
      }else{
        this.saveLockInactive = true;
      }

      this.ipfsOnline = this.q.os.isReady();
      this.bootstrapIpfsPeers = this.q.os.getIpfsBootstrapPeers();``


    });



  }
  // @ViewChild('driveLockStatusField') driveLockStatusField;
sideBarFixed = { left:false}
autoSaveInterval = 30*10000;
  items: NbMenuItem[] = [
    {
      title: 'General',
      icon: 'browser-outline',

    },
    {
      title: 'IPFS',
      icon: "cube-outline"
    }

  ];

  DEVMODE = true;
  bootstrapIpfsPeers = [];

  ngOnInit(){

    if(this.q.os.getSaveLock()){
      this.saveLockInactive = false;
    }else{
      this.saveLockInactive = true;
    }

    this.autoSaveActive = this.q.os.getAutoSave();
    this.autoSaveInterval = this.q.os.getAutoSaveInterval();
    this.storageLocation = this.q.os.getStorageLocation();

    this.isElectron = this.q.os.isElectron();

  }
  isElectron = false;

  refreshIpfsSwarmPeerList(){
    this.bootstrapIpfsPeers = this.q.os.getIpfsBootstrapPeers();
  }
  newPeerField = "";
  addNewPeer(){
    let newPeer = this.newPeerField
    let peers = this.q.os.getIpfsBootstrapPeers();
    peers.push(newPeer);
    this.q.os.setIpfsBootstrapPeers(peers);
    this.refreshIpfsSwarmPeerList();
  }
  removePeer(peer){
    this.q.os.setIpfsBootstrapPeers(this.q.os.getIpfsBootstrapPeers().filter(e => e != peer));
    this.refreshIpfsSwarmPeerList();
  }
  reboot(){
    this.q.os.reboot();
  }
  newPeerFieldChanged(v){
    if(typeof v['target']['value'] != 'undefined'){
      this.newPeerField =  v['target']['value'];
    }
  }
  ipfsOnline = false;
  autoSaveIntervalChanged(v){
     this.q.os.setAutoSaveInterval(v);
  }
  selectedSetting = "General";
  signedIn = false;
  signIn(){

    if(this.signedIn){
      return true;
    }

    this.items.push({
      title: 'Export',
      icon:'code-download-outline'
    });
    this.items.push({
      title: 'Sign Out',
      icon:'person-remove-outline'
    });

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

  storageLocation = "Download";
  storageLocationChanged(v){
    this.q.os.setStorageLocation(v);
  }
  getStorageLocation(){
    this.q.os.getStorageLocation();
  }


}
