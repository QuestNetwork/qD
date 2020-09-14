import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
  { path: '',   redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', component: SignInComponent },

  { path: 'settings', component: SettingsComponent },
 { path: 'messages', loadChildren: () => import('../../../quest-messenger-js/src/qd-messages-ts.module').then(m => m.QuestMessengerJSModule) }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
