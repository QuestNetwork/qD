import { Component, ViewChild, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { UiService} from '../services/ui.service';
import { QuestOSService } from '../services/quest-os.service';
import { NbMenuItem } from '@nebular/theme';
import { NbMenuService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'qdesk-settings-ipfs',
  templateUrl: './settings-ipfs.component.html',
  styleUrls: ['./settings-ipfs.component.scss']
})
export class SettingsIPFSComponent implements OnInit {

  signIn(){

    try{
      this.pinFrom = this.q.os.bee.comb.get('/settings/ipfs/pin-from');
      if(typeof this.pinFrom != 'string'){
        this.pinFrom  = "Everyone";
      }
    }catch(e){
      this.pinFrom  = "Everyone";
    }

        if(this.signedIn){
          return true;
        }


        this.signedIn = true;


  }

  constructor(private http: HttpClient, private menu: NbMenuService, private ui: UiService, private q: QuestOSService) {


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

      this.ipfsOnline = this.q.os.isReady();
      this.bootstrapIpfsPeers = this.q.os.getIpfsConfig()['Swarm'];``


    });

    this.ipfsOnline = this.q.os.isReady();


  }
  // @ViewChild('driveLockStatusField') driveLockStatusField;
sideBarFixed = { left:false}
autoSaveInterval = 30*10000;

  DEVMODE = true;
  bootstrapIpfsPeers = [];


  ngOnInit(){

    setTimeout( () => {
      this.ui.updateProcessingStatus(false);
    },10000)


    if(this.q.os.isSignedIn()){
      try{
        this.pinFrom = this.q.os.bee.comb.get('/settings/ipfs/pin-from');
        if(typeof this.pinFrom != 'string'){
          this.pinFrom  = "Everyone";
        }
      }catch(e){
        this.pinFrom  = "Everyone";
      }
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


  pinFrom;
  pinFromChanged(v){
    this.q.os.bee.comb.set('/settings/ipfs/pin-from',v);
  }


}
