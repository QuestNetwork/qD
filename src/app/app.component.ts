import { Component, ViewChild, ElementRef, Inject, AfterContentInit,ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from  '@angular/material/snack-bar';
import { UiService} from './services/ui.service';
import { QuestOSService } from './services/quest-os.service';
import swarmJson from './swarm.json';
declare var $: any;
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, private cd: ChangeDetectorRef,private q:QuestOSService, private ui: UiService,private snackBar: MatSnackBar ){}

  private DEVMODE = swarmJson['dev'];
  @ViewChild('menuTabGroup') menuTabGroup;

  isElectron = false;
  noChannelSelected = "NoChannelSelected";
  selectedChannel = "NoChannelSelected";

  public popupVisible = "0";
  public hidePopups(){
   this.popupVisible = "0";
  }
  //
  public showPopup(name){
    // if(this.isElectron){
    //   let modal = window.open(document.getElementById('clusterPopup').outerHTML);
    //   let clusterPopupHTML = ;
    //   modal.document.write(clusterPopupHTML);
    // }
    // else{
      this.popupVisible = name;
    // }
  }

  public screenLocked = false;

  public jqueryInit(){
    $(function() {
      $('.mat-tab-label-active').css('opacity',1);
      $('.mat-tab-label').on('click', function(){
        $('.mat-tab-label').css('opacity',0.6);
        $('.mat-tab-label-active').css('opacity',1);
      });
    });
  }




  public async ngOnInit(){

    //gather up all the channels we got put em in this.channels

    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf(' electron/') > -1) {
      this.ui.setElectron(true);
    }
    else{
      $(function(){
          $('body').css('background-color','#91d370');
          $('body').css('background-image','linear-gradient(319deg, #91d370 0%, #bca0ff 37%, #f2cd54 100%)');
        });

    }

    if(this.ui.isElectron()){
      this.ui.changeElectronSize(0);
      this.isElectron = true;
      $(function(){
          $('.container').css('top','0px');
          $('body').addClass('isElectron');
      });
    }


    this.jqueryInit();

    this.ui.snackBar.subscribe( (object) => {
        this.showSnack(object.left, object.right, object.object);
    });

    this.q.os.ui.snackBar.subscribe( (object) => {
        this.showSnack(object.left, object.right, object.object);
    });

    this.ui.snackBarDismissedSub.subscribe( (value) => {
      this.snackBar.dismiss();
    });

    this.q.os.ui.snackBarDismissedSub.subscribe( (value) => {
      this.snackBar.dismiss();
    });

    this.ui.screenLockedSub.subscribe( (value) => {
      this.screenLocked = value;
    });

    this.ui.hidePopupsSub.subscribe( (value) => {
      this.hidePopups();
    });



    this.ui.tabAccessibilitySub.subscribe( (tabAccessibility) => {
      this.tabAccessibility = tabAccessibility;
    });

    this.ui.showPopupSub.subscribe( (v) => {
      this.showPopup(v);
    });

    this.ui.componentAccessibilitySub.subscribe( (componentAccessibility) => {
      this.componentAccessibility = componentAccessibility;
    });

    this.ui.signedInSub.subscribe( (value) => {
      this.signedIn = value;
    });

    console.log("App: Booting Quest Network Operating System...");
    let noPeers = false;
    try{
      await this.q.boot();
    }
    catch(e){
      console.log(e);
      if(e = 'Transport (WebRTCStar) could not listen on any available address'){
        noPeers = true;
        this.ui.showSnack('No IPFS Peer','Oh Wow');
      }
    }

    if(noPeers){
      this.ui.updateProcessingStatus(false);
      alert('IPFS Caused Boot Termination, Check Bootstrap Peers!');
    }

    this.swarmPeers = this.q.os.ocean.getPeers();
    this.cd.detectChanges();


    this.q.os.ui.onTabChange().subscribe( (value) => {
      this.toTabIndex(value);
    });

    this.q.os.ocean.swarmPeersSub.subscribe( (value:number) => {
      this.swarmPeers = value;
      this.cd.detectChanges();
    });

    this.q.os.ocean.dolphin.channelNameListSub.subscribe( (value) => {
      // this.ui.showSnack('Channel Update ','Dismiss', {duration:2000});
      // this.q.os.sendBootMessage('Feeding The DAG...');
      this.channelNameList = value;
    });

    this.q.os.channel.onSelect().subscribe( (value) => {
      this.selectedChannel = value;
      console.log('App: Selected Channel: >>'+this.selectedChannel+'<<');
      console.log('App: noChannelSelected: >>'+this.noChannelSelected+"<<")
    });

    let psPS = this.q.os.ocean.dolphin.getPubSubPeersSub();
    psPS.subscribe( (value:number) => {
      this.pubSubPeers = value;
      this.cd.detectChanges();
    });

    console.log('App: Boot Complete');

  }

  public swarmPeers = 0;
  public pubSubPeers = 0;

  public signedIn;
  public channelNameList;

  public componentAccessibility = {
    processingEncryptionScreen: false, downloadKeyScreen: false
  }

  public tabAccessibility = {
    signInTab: true, settingsTab: true, channelTab:false
  }

  public enableTab(channel){
    this.ui.enableTab(channel+'Tab');
  }
  public disableTab(channel){
    this.ui.disableTab(channel+'Tab');
  }

  tabClicked(event){
    if(event.index == 3){
      //go to settings
         this.router.navigate(['/settings']);
    }
    else if(event.index == 0){
      this.router.navigate(['/signin']);
    }
    else if(event.index == 1){
      this.router.navigate(['/messages']);
    }
    else if(event.index == 2){
      this.router.navigate(['/social']);
    }
  }

  snackBarRef;
  showSnack(left, right, options = {}){

    if(Object.keys(options).length > 0){
      console.log('App: Opening snackbar with options');
      this.snackBarRef = this.snackBar.open(left,right,options);
    }else{
      console.log('App: Oopening snackbar');
     this.snackBarRef = this.snackBar.open(left,right);
   }

   return this.snackBarRef;
  }

  closeWindow(){
    window.close();
  }

  public selectedTabChanged(event){
    $(function() {
      $('.mat-tab-label').css('opacity',0.6);
      setTimeout( () => {
        $('.mat-tab-label-active').css('opacity',1);
      }, 500);
    });
      this.ui.changeElectronSize(event.index);
      this.ui.selectedTabChanged(event.index);
  }

  public nextTabIndex(){
    this.menuTabGroup.selectedIndex = this.menuTabGroup.selectedIndex + 1;
     this.ui.changeElectronSize(this.menuTabGroup.selectedIndex+1);
    $(function() {
      $('.mat-tab-label').css('opacity',0.6);
      setTimeout( () => {
        $('.mat-tab-label-active').css('opacity',1);
      }, 500);
    });
  }

  public toTabIndex(index){
    this.menuTabGroup.selectedIndex = index;
    $(function() {
      $('.mat-tab-label').css('opacity',0.6);
      setTimeout( () => {
        $('.mat-tab-label-active').css('opacity',1);
      }, 500);
    });
  }



}
