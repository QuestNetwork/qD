import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsGeneralComponent } from './settings-general/settings-general.component';
import { SettingsIPFSComponent } from './settings-ipfs/settings-ipfs.component';
import { SettingsAccountComponent } from './settings-account/settings-account.component';

import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '',   redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: SignInComponent },

 { path: 'messages', canActivate: [AuthGuard], loadChildren: () => import('../../../qd-messages-ts/src/qd-messages-ts.module').then(m => m.QDMessagesModule) },
 { path: 'social', canActivate: [AuthGuard], loadChildren: () => import('../../../qd-social-ts/src/qd-social-ts.module').then(m => m.QDSocialModule) },

 { path: 'settings', redirectTo: 'settings/general', pathMatch:'full' },
 { path: 'settings', component: SettingsComponent, children: [
        { path: 'general', component: SettingsGeneralComponent },
        { path: 'ipfs', component: SettingsIPFSComponent },
        { path: 'account', component: SettingsAccountComponent, canActivate: [AuthGuard] }

 ] }



];
@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
