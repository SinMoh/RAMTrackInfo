import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

//import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
//import 'rxjs/add/operator/map';
import xml2js from 'xml2js';


@Injectable()
export class FlightstatusProvider {

  apikey='';
  url;
  public xmlItems: any;
  public jsobj: any;

  constructor(public http: HttpClient) {
    console.log('Hello FlightstatusProvider Provider');
    //this.url=url+apikey;
  }

  getFlightInfos(num_res, nom){
    //let sc;
    let sc1 = {
      destination:"paris",
      flightDate:"11/07/2018",
      flightNumber:"ATRY487",
      origine:"casablanca",
      realArrival:"11/07/2018 21:25",
      realDeparter:"11/07/2018 17:30",
      schedueldArrival:"11/07/2018 21:25",
      schedueldDeparter:"11/07/2018 17:30",
      statut:"statut",
      timezoneDestination:"GMT",
      timezoneOrigine:"GMT"
    };

    if(nom === "KARCHI"){
      //sc = sc1;
    } else {
      //sc = sc1;
    }
    this.jsobj = this.http.get('/assets/data/onda.xml',
    {
      headers: new HttpHeaders()
      .set('Content-Type', 'text/xml')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*')
      .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
      responseType:'text'
    });
    //console.log(this.jsobj);
    return this.jsobj;

    //return Observable.of(this.jsobj).map(o => JSON.stringify(o));
    
    //return sc1;
    //return this.http.get(this.url+'&latitude='+num_res+'&longitude='+nom)
      //.map(res => res.json());
  }

  loadXML(num_res)
   {     
      this.http.get('/assets/data/onda.xml',
      {
        headers: new HttpHeaders()
        .set('Content-Type', 'text/xml')
        .append('Access-Control-Allow-Methods', 'GET')
        .append('Access-Control-Allow-Origin', '*')
        .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
        responseType:'text'
      })
      .subscribe((data)=>
      {
         this.parseXML(data)
         .then((data)=>
         {
            this.xmlItems = data;  
            for (var i = 0; i<Object.keys(data).length; i++)
            {
              if (data[i].volno === num_res)
              {
                console.log(data[i])       
                return Observable.of(data[i]).map(o => JSON.stringify(o));         
              }              
            }                       
         });
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
