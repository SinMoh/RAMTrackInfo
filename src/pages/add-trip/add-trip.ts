import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FlightInfoPage } from '../flight-info/flight-info';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the AddTripPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-trip',
  templateUrl: 'add-trip.html',
})
export class AddTripPage {

  num_res: string;
  nom: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private alertCtrl: AlertController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTripPage');
    this.storage.get('infos').then((val) => {
      if(val!=null){
        let infos = JSON.parse(val);
        this.num_res = infos.num_res;
        this.nom = infos.nom;
      }else{
        this.num_res = "";
        this.nom = "";
      }
    });
  }

  NAVTO_FlightInfo() {
    //this.navCtrl.push(FlightInfoPage)
    if(this.num_res!=undefined && this.num_res.length!=0 && this.num_res!=""){
      if(this.nom!=undefined && this.nom.length!=0 && this.nom!=""){
        let infos={
          num_res: this.num_res,
          nom: this.nom
        }
        this.storage.set('infos', JSON.stringify(infos));
        this.navCtrl.push(FlightInfoPage);
      }else{
        let alert = this.alertCtrl.create({
          title: 'nom vide',
          subTitle: 'Veuillez entrer votre nom',
          buttons: ['Dismiss']
        });
        alert.present();
      }
    }else{
      let alert = this.alertCtrl.create({
        title: 'numéro de réservation vide',
        subTitle: 'Veuillez entrer votre numéro de réservation',
        buttons: ['Dismiss']
      });
      alert.present();      
    }  
  }

}
