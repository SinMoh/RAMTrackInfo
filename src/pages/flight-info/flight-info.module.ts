import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FlightInfoPage } from './flight-info';

@NgModule({
  declarations: [
    FlightInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(FlightInfoPage),
  ],
})
export class FlightInfoPageModule {}
