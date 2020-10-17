import { Component, ViewChild, OnInit, ChangeDetectionStrategy, OnDestroy, NgZone} from '@angular/core';
import { UiService} from '../services/ui.service';
import { QuestOSService } from '../services/quest-os.service';
import { NbMenuItem } from '@nebular/theme';
import { NbMenuService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {



  constructor(private ngZone:NgZone,private router:Router, private http: HttpClient, private menu: NbMenuService, private ui: UiService, private q: QuestOSService) {



    if(this.q.os.isSignedIn()){
      this.signIn();
    }
    this.q.os.onSignIn().subscribe( () => {
      this.signIn();
    });



  }

  menuClass = "settingsMenu";
  // @ViewChild('driveLockStatusField') driveLockStatusField;
sideBarFixed = { left:false}
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

  goToMenu(){
    this.menuClass = 'settingsMenu';
  }

  DEVMODE = true;
  bootstrapIpfsPeers = [];

  itemClickSub;
  ngOnDestroy(){
    this.itemClickSub.unsubscribe();
  }

  ngOnInit(){

    this.itemClickSub = this.menu.onItemClick().subscribe((e) => {


      if(e['item']['title'] == 'Backup'){
          this.q.os.exportConfig();
      }
      else if(e['item']['title'] == 'Sign Out'){
        this.q.os.reboot();
      }
      else if(typeof e['item']['title'] != 'undefined'){
          this.menuClass = "settingsSection";

        console.log('navigating to: '+'/settings/'+e['item']['title'].toLowerCase());

        this.ngZone.run(() => this.router.navigate(['/settings/'+e['item']['title'].toLowerCase()]));

      }
    });


    setTimeout( () => {
      this.ui.updateProcessingStatus(false);
    },10000)


    if(this.q.os.utilities.engine.detect() == 'electron'){
        this.isElectron = true;
    }

  }
  isElectron = false;

  reboot(){
    this.q.os.reboot();
  }

  selectedSetting = "General";
  signedIn = false;
  signIn(){

    if(this.signedIn){
      return true;
    }

    this.items.push({
      title: 'Account',
      icon:'person-outline'
    });
    this.items.push({
      title: 'Backup',
      icon:'code-download-outline'
    });
    this.items.push({
      title: 'Sign Out',
      icon:'person-remove-outline'
    });

    this.signedIn = true;
  }

}
