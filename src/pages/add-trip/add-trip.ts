import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FlightPage } from '../flight/flight';

@IonicPage()
@Component({
  selector: 'page-add-trip',
  templateUrl: 'add-trip.html',
})
export class AddTripPage {

  num_res: string;
  nom: string;
  
  constructor(
    public navCtrl: NavController, 
    public storage: Storage) {

      this.storage.get('infos').then((val) => {
        if(val != null){
          let infos = JSON.parse(val);
          this.num_res = infos.num_res;
          this.nom = infos.nom;
        } else {
          this.num_res = 'add trip';
          this.nom = 'add trip';
        }
      }); 
  }

  saveForm(){
    let infos = {
      num_res: this.num_res,
      nom: this.nom
    }

    //console.log(location);
    this.storage.set('infos', JSON.stringify(infos));
    this.navCtrl.push(FlightPage);
  }

}
