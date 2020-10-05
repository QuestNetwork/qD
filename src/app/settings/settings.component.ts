import { Component, ViewChild, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { UiService} from '../services/ui.service';
import { QuestOSService } from '../services/quest-os.service';
import { NbMenuItem } from '@nebular/theme';
import { NbMenuService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private http: HttpClient, private menu: NbMenuService, private ui: UiService, private q: QuestOSService) {

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
      this.bootstrapIpfsPeers = this.q.os.getIpfsConfig()['Swarm'];
    });
    this.q.os.onSignIn().subscribe( () => {

      if(this.q.os.getSaveLock()){
        this.saveLockInactive = false;
      }else{
        this.saveLockInactive = true;
      }

      this.ipfsOnline = this.q.os.isReady();
      this.bootstrapIpfsPeers = this.q.os.getIpfsConfig()['Swarm'];``


    });

    this.ipfsOnline = this.q.os.isReady();


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

    this.bootstrapIpfsPeers = this.q.os.getIpfsConfig()['Swarm'];


  }
  isElectron = false;

  refreshIpfsSwarmPeerList(){
    console.log( this.q.os.getIpfsConfig());
    this.bootstrapIpfsPeers = this.q.os.getIpfsConfig()['Swarm'];
  }

   downloadIpfsSwarmPeerList(){
    this.http.get('https://raw.githubusercontent.com/QuestNetwork/qDesk/0.9.4/src/app/swarm.json').subscribe( (data) => {
      let config = this.q.os.getIpfsConfig();
      config['Swarm'] = data['ipfs']['Swarm'];
      this.q.os.setIpfsConfig(config);
      this.refreshIpfsSwarmPeerList();
    });
  }
  newPeerField = "";
  addNewPeer(){
    let newPeer = this.newPeerField
    let config = this.q.os.getIpfsConfig();
    let peers = config['Swarm'];
    peers.push(newPeer);
    config['Swarm'] = peers;
    this.q.os.setIpfsConfig(config);
    this.refreshIpfsSwarmPeerList();
  }
  removePeer(peer){
    let config = this.q.os.getIpfsConfig();
    config['Swarm'] = config['Swarm'].filter(e => e != peer);
    this.q.os.setIpfsConfig(config);
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

  storageLocation = "LocalStorage";
  storageLocationChanged(v){
    this.q.os.setStorageLocation(v);
  }
  getStorageLocation(){
    this.q.os.getStorageLocation();
  }


}
