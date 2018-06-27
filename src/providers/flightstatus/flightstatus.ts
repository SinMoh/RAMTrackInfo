import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { HttpHeaders } from '@angular/common/http';
import xml2js from 'xml2js';
import { ResponseType } from '@angular/http';


@Injectable()
export class FlightstatusProvider {

  token='jwltAfBozeRJ3T6tWkhkrMgmK6ZIo48A2Z1fVBV3DdjwbjQwP';
  url='http://hack-ws.royalairmaroc.com/HackathonService/services/FlightStatus/getPNRInfors';
  xurl='http://hack-ws.royalairmaroc.com/HackathonService/services/FlightStatus/getPNRInfors?PNR=KEFGSZ&token=jwltAfBozeRJ3T6tWkhkrMgmK6ZIo48A2Z1fVBV3DdjwbjQwP';
  public xmlItems: any;
  public jsobj: any;

  constructor(public http: HttpClient) {
    console.log('Hello FlightstatusProvider Provider');
  }

  getFlightInfos(pnr, nom){
    this.jsobj = this.http.get('/assets/data/vols.xml',
    {
      headers: new HttpHeaders()
      .set('Content-Type', 'text/xml')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*')
      .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
      responseType:'text'
    });

    return this.jsobj;
  }

}
