import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KoersPage } from './koers';

@NgModule({
  declarations: [
    KoersPage,
  ],
  imports: [
    IonicPageModule.forChild(KoersPage),
  ],
})
export class KoersPageModule {}
