import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddTripPage } from "../add-trip/add-trip";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  NAVTO_AddTrip() {
    this.navCtrl.push(AddTripPage)
  }

}
