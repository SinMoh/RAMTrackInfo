import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FlightstatusProvider } from '../../providers/flightstatus/flightstatus';
import { Storage } from '@ionic/storage';

import xml2js from 'xml2js';

@IonicPage()
@Component({
  selector: 'page-flight',
  templateUrl: 'flight.html',
})
export class FlightPage {

  flight: any;
  infos: {
    num_res: string,
    nom: string
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private flightstatusProvider: FlightstatusProvider,
    private storage: Storage) {
  }

  ionViewWillEnter(){
    this.storage.get('infos').then((val) => {
      if(val != null){
        this.infos = JSON.parse(val);        
      } else {
        //Generic
        this.infos = {
          num_res:'flight',
          nom:'flight'
        }
      }

      this.flightstatusProvider.getFlightInfos(this.infos.num_res, this.infos.nom)
      .subscribe(data => {        
        //this.flight = JSON.parse(amadeus);              
         this.parseXML(data)
         .then((data)=>
         {
            //this.xmlItems = data;  
            for (var i = 0; i<Object.keys(data).length; i++)
            {
              if (data[i].volno === this.infos.num_res)
              {
                //console.log(data[i]);
                var weekday = new Array(7);
                weekday[0] =  "Dimanche";
                weekday[1] = "Lundi";
                weekday[2] = "Mardi";
                weekday[3] = "Mercredi";
                weekday[4] = "Jeudi";
                weekday[5] = "Vendredi";
                weekday[6] = "Samedi";
                var month = new Array(12);
                month[0] =  "Janvier";
                month[1] = "Février";
                month[2] = "Mars";
                month[3] = "Avril";
                month[4] = "Mai";
                month[5] = "Juin";
                month[6] = "Juillet";
                month[7] =  "Août";
                month[8] = "Septembre";
                month[9] = "Octobre";
                month[10] = "Novembre";
                month[11] = "Décembre";          
                this.flight = data[i];  
                var d = new Date(this.flight.datemvt);
                this.flight.daymvt = weekday[d.getDay()];
                this.flight.monthmvt = month[d.getMonth()];
                this.flight.ndaymvt = d.getDate();
                break;
              }              
            }                       
         });
       
        //console.log(amadeus);
      });
      //this.flightstatusProvider.loadXML(this.infos.num_res)
      //.subscribe(a=>{
        //this.flight = JSON.parse(a);
      //})
      //console.log(this.flight);

    });
    
  }

  parseXML(data)
   {
      return new Promise(resolve =>
      {
         var k,
             arr    = [],
             parser = new xml2js.Parser(
             {
                trim: true,
                explicitArray: true
             });

         parser.parseString(data, function (err, result)
         {
            var obj = result.LISTE_VOLS;
            for(k in obj.Vol)
            {
               var item = obj.Vol[k];
               arr.push({
                  sens           : item.SENS[0],
                  volno        : item.VOLNO[0],
                  prov_dest : item.PROV_DEST[0],
                  escales        : item.ESCALES[0],
                  pkg : item.PKG[0],
                  typemat : item.TYPEMAT[0],
                  immat : item.IMMAT[0],
                  datemvt : item.DATEMVT[0],
                  heuremvt : item.HEUREMVT[0],
                  estime : item.ESTIME[0],
                  hall : item.HALL[0],
                  etat : item.ETAT[0],
                  typevol : item.TYPEVOL[0],
                  tapis : item.TAPIS[0],
                  porte : item.PORTE[0]
               });
            }

            resolve(arr);
         });
      });
   }
}