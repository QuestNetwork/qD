import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '',   redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: SignInComponent },

  { path: 'settings', component: SettingsComponent },
 { path: 'messages', canActivate: [AuthGuard], loadChildren: () => import('../../../quest-messenger-js/src/qd-messages-ts.module').then(m => m.QDMessagesModule) },
 { path: 'social', canActivate: [AuthGuard], loadChildren: () => import('../../../qd-social-ts/src/qd-social-ts.module').then(m => m.QDSocialModule) }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
