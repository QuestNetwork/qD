import { Component, ViewChild, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { QuestOSService } from '../services/quest-os.service';
import { NbMenuService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'qdesk-settings-account',
  templateUrl: './settings-account.component.html',
  styleUrls: ['./settings-account.component.scss']
})
export class SettingsAccountComponent implements OnInit {

    signin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(8) ])
  });

  hide = {};

  oldPassword = "";
  newPassword = "";
  newPasswordRepeat = "";
  error = "";
  username = "";

  async changeOrSetPassword(){
    if(this.q.os.hasPassword()){
      //old pw set
    }

    if(this.newPassword != this.newPasswordRepeat){
      this.error = "Password don't match!";
      return false;
    }

    if(this.newPassword.length < 8){
      this.error = "Password too short!";
      return false;
    }

    try{
      await this.q.os.setPassword(this.oldPassword,this.newPassword);
    }
    catch(e){
      console.log(e);
      this.error = "Current Password Incorrect!"
      return false;
    }

    this.q.os.ui.showSnack('Password Changed','Yeah!',{duration: 2000});
    this.oldPasswordSet = true;
    this.error = "";



  }

  constructor(private http: HttpClient, private menu: NbMenuService, private q: QuestOSService) {

  }
  // @ViewChild('driveLockStatusField') driveLockStatusField;
sideBarFixed = { left:false}


  DEVMODE = true;

  oldPasswordSet = false;

  ngOnInit(){

    this.hide['oldPassword'] = true;
    this.hide['newPassword'] = true;
    this.hide['newPasswordRepeat'] = true;


    if(typeof this.q.os.bee.comb.get('/settings/account/passwordSet') == 'boolean' && this.q.os.bee.comb.get('/settings/account/passwordSet') == true){
      //password is set
      this.oldPasswordSet = true;

    }

    this.username = this.q.os.getUsername();

    if(this.q.os.utilities.engine.detect() == 'electron'){
        this.isElectron = true;
    }

  }
  isElectron = false;

  reboot(){
    this.q.os.reboot();
  }

}
