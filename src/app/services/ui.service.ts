import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';

declare var $: any;


@Injectable({
  providedIn: 'root'
})
export class UiService {
  headerOptions: any = null
  inElectron = false;

  isProcessing = true;
  processingSub = new Subject<any>();
  updateProcessingStatus(value) {
    if(value){
      $('body').addClass('beeProcessingBody');
    }
    else{
      $('body').removeClass('beeProcessingBody');
    }
    this.isProcessing = value
    this.processingSub.next(this.isProcessing);
    // localStorage.setItem('isLoggedIn', value ? "true" : "false");
  }


  settingsLoaded = false
  settingsLoadedSub = new Subject<any>();
  setSettingsLoaded(value) {
    this.settingsLoaded = value;
    this.settingsLoadedSub.next(value);
  }


  getProcessingStatus() {
    // this._isLoggedIn ? true : false;
    return this.isProcessing;
  }




  questPublishedFlag = false;
  public questPublished(){
    return this.questPublishedFlag;
  }
  public setQuestPublished(value){
    this.questPublishedFlag = value;
  }

  showPopupSub = new Subject<any>();
  public showPopup(value){
    this.showPopupSub.next(value);
  }

  signedInSub = new Subject<any>();
  public signIn(){
    this.signedInSub.next(true);
  }



    parseFolderStructureAndFlattenForMatTree(newData){
      let result = {};
      for(let i=0;i<newData.length;i++){
          result[newData[i]['data']['name']] = this.parseFolderStructureAndFlattenForMatTree(newData[i]['children']);
      }
      return result;
    }

  uiModeSub = new Subject<any>();
  public uiMode(value){
    this.uiModeSub.next(value);
  }



  changeStatusSub = new Subject<any>();
  public changeStatus(value){
    this.changeStatusSub.next(value);
  }


  publicKeyFlagValue = false;
  publicKeyFlagSub  = new Subject<any>();
  public publicKeyFlag(value){
    this.publicKeyFlagValue = value;
    this.publicKeyFlagSub.next(value);
  }
  public hasPublicKeyFlag(){
    return this.publicKeyFlagValue;
  }

  uploadCompleteSub = new Subject<any>();
  public uploadComplete(value){
    this.uploadCompleteSub.next(value);
  }

  initGenerateTicketSub = new Subject<any>();
  public initGenerateTicket(){
    this.initGenerateTicketSub.next(true);
  }

  initDownloadKeyScreenSub = new Subject<any>();
  public initDownloadKeyScreen(){
    this.initDownloadKeyScreenSub.next(true);
  }



  tosAcceptedChangedSub = new Subject<any>();
  public tosAcceptedChanged(value){
    this.tosAcceptedChangedSub.next(value);
  }

  initPerformanceScreenSub = new Subject<any>();
  public initPerformanceScreen(){
    this.initPerformanceScreenSub.next(true);
  }


  noJobLoadedFlagSub = new Subject<any>();
  public noJobLoadedFlag(value){
    this.noJobLoadedFlagSub.next(value);
  }

  isElectronSub = new Subject<any>();
  setElectron(value){
    this.inElectron = value;
    this.isElectronSub.next(value);
  }
  isElectron(){
    return this.inElectron;
  }


  ticketButtonWrapperShowing = false;
  ticketButtonWrapperShowingSub = new Subject<any>();
  public setTicketButtonWrapperShowing(value){
    this.ticketButtonWrapperShowing = value;
    this.ticketButtonWrapperShowingSub.next(value);
  }
  public getTicketButtonWrapperShowing(){
    return this.ticketButtonWrapperShowing;
  }

  ticketGeneratorSub = new Subject<any>();
  public ticketGenerator(value){
    this.ticketGeneratorSub.next(value);
  }

  enteringCodeSub = new Subject<any>();
  public enteringCode(value){
    this.enteringCodeSub.next(value);
  }

  toTabIndexSub = new Subject<any>();
  public toTabIndex(value){
    this.toTabIndexSub.next(value);
  }


  _snack = {};
  snackBar = new Subject<any>();
  public showSnack(left, right, object = {}){
    this._snack = {left, right, object};
    this.snackBar.next(this._snack);
  }
  snackBarDismissedSub = new Subject<any>();
  public snackBarDismiss(){
    this.snackBarDismissedSub.next(true);
  }

  screenLockedSub = new Subject<any>();

  public screenLocked(value){
    this.screenLockedSub.next(value);
  }

  toSectionSub = new Subject<any>();
  public toSection(value){
    this.toSectionSub.next(value);
  }


  public tabAccessibility = {
    signInTab: true, settingsTab: true
  }

  tabAccessibilitySub = new Subject<any>();
  public enableTab(tab){
    this.tabAccessibility[tab] = true;
    this.tabAccessibilitySub.next(this.tabAccessibility);
  }
  public addTab(tab){
    this.tabAccessibility[tab] = false;
    this.tabAccessibilitySub.next(this.tabAccessibility);
  }
  public disableTab(tab){
    this.tabAccessibility[tab] = false;
    this.tabAccessibilitySub.next(this.tabAccessibility);
  }
  public getTabs(){
    return Object.getOwnPropertyNames(this.tabAccessibility);
  }
  selectedTabChangedSub = new Subject<any>();
  public selectedTabChanged(index){
    setTimeout( () => {
      this.selectedTabChangedSub.next(index);
    },500);
  }

  public componentAccessibility = {
    processingEncryptionScreen: false, downloadKeyScreen: false
  }

  componentAccessibilitySub = new Subject<any>();
  public enableComponent(tab){
    this.componentAccessibility[tab] = true;
    this.componentAccessibilitySub.next(this.componentAccessibility);
  }
  public disableComponent(tab){
    this.componentAccessibility[tab] = false;
    this.componentAccessibilitySub.next(this.componentAccessibility);
  }

  hidePopupsSub = new Subject<any>();
  public hidePopups(){
    this.hidePopupsSub.next(true);
  }

  pushStartSub = new Subject<any>();
  public pushStart(){
    this.pushStartSub.next(true);
  }

  scrapeQuestSettingsSub = new Subject<any>();
  public scrapeQuestSettings(){
    this.scrapeQuestSettingsSub.next(true);
  }

  public delay(t, val = "") {
     return new Promise(function(resolve) {
         setTimeout(function() {
             resolve(val);
         }, t);
     });
  }




  public setElectronSize(size){
    this.changeElectronSize(size);
  }
  public changeElectronSize(size){
      $(function(){
        $('body').removeClass('electronSize0');
        $('body').removeClass('electronSize0-keyimport');
        $('body').removeClass('electronSize0-2');
        $('body').removeClass('electronSize1');
        $('body').removeClass('electronSize2');
        $('body').removeClass('electronSize3');
        $('body').removeClass('electronSize3-2');
        $('body').removeClass('electronSize4');
        $('body').addClass('electronSize'+size);
      });
  }

async fadeInHamburger(){
  setTimeout(() => {
    $('.mat-tab-list').prepend($('.mat-menu-trigger'));


  }, 500);
  setTimeout(() => {
    $('.mat-menu-trigger').fadeTo( "slow" , 0.71);
  }, 750);

  await this.delay(1250);
  return true;
}



}
