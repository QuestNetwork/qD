import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { UiService} from './services/ui.service';
import { QuestOSService } from './services/quest-os.service';
import { LoadHexComponent } from './load-hex/load-hex.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsAccountComponent } from './settings-account/settings-account.component';
import { SettingsGeneralComponent } from './settings-general/settings-general.component';
import { SettingsIPFSComponent } from './settings-ipfs/settings-ipfs.component';

import { SignInComponent } from './sign-in/sign-in.component';

import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbTabsetModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbIconModule,    NbCardModule, NbTooltipModule } from '@nebular/theme';
import { NbThemeModule, NbContextMenuModule, NbMenuService, NbMenuModule,     NbDialogModule} from '@nebular/theme';

import { MatTabsModule,MatTabNav } from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NgxFileDropModule } from 'ngx-file-drop';

import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {ClipboardModule} from '@angular/cdk/clipboard';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatTreeModule} from '@angular/material/tree';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [


    AppComponent,
    LoadHexComponent,
    SettingsComponent,
    SignInComponent,
SettingsAccountComponent,
SettingsGeneralComponent,
SettingsIPFSComponent
  ],
  imports: [
    NbTabsetModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
     NbIconModule,    NbCardModule,
     NbEvaIconsModule,
      NbThemeModule.forRoot({name:'dark'}),
      NbContextMenuModule,
      NbMenuModule.forRoot(),
      NbDialogModule,
      MatTabsModule,
      MatIconModule,
      NgxFileDropModule,
      MatSnackBarModule,
      FlexLayoutModule,
      NbSidebarModule.forRoot(),
      MatFormFieldModule,
      MatSelectModule,
      MatSlideToggleModule,
      CdkTableModule,
      CdkTreeModule,
      ClipboardModule,
      HttpClientModule,
      MatCardModule,
      MatSelectModule,
      MatButtonModule,
      MatCheckboxModule,
      MatMenuModule,
      CommonModule,
      FontAwesomeModule,
      NbLayoutModule,
      NbTabsetModule,
      NbEvaIconsModule,
      NbIconModule,
      FormsModule,
      NbContextMenuModule,
      NbDialogModule.forRoot(),
      NbCardModule,
      MatTreeModule,
      DragDropModule,
      MatButtonModule,
      MatInputModule,
     MatCheckboxModule,
     MatInputModule,
     MatFormFieldModule,
     ZXingScannerModule,
     MatSliderModule,
     FlexLayoutModule,
     NbTooltipModule

  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSelectModule,

  ],
  providers: [
    UiService,
    QuestOSService,
    MatTabNav,
      NbSidebarService,NbMenuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
