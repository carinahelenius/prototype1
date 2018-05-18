import { Component } from '@angular/core';
import { NavController, PopoverController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import {DisturbanceInfo} from '../disturbanceInfo/disturbanceInfo';
import { TravelInfo2 } from '../travelInfo2/travelInfo2';

@Component({
  selector: 'page-selectedRoute',
  templateUrl: 'selectedRoute.html'
})

export class SelectedRoute {

  departures;
  public routeName;
  public siteId;
  public transport_type;
  
  constructor(public navCtrl: NavController, public provider: ApiProvider, public popoverCtrl: PopoverController, public navParams: NavParams) {
    this.routeName = navParams.get("routeName");
    this.siteId = navParams.get("siteId");
    this.transport_type = navParams.get("transport_type");
    this.getDepartures(this.siteId);
  
  }
  
  getDepartures(siteId:string) {
this.provider.getDepartures(siteId)
.subscribe(
  (data) => {

if(this.transport_type == '1') {
  this.departures = data["ResponseData"].Metros;
} else if(this.transport_type == '2') {
  this.departures = data["ResponseData"].Trams;
} else if(this.transport_type == '3') {
  this.departures = data["ResponseData"].Buses;
}

  },
  (error) => {console.log("Error: ", JSON.stringify(error));}
)
  }

 
  openDisturbanceInfo(myEvent) { // Skapar popup-sida med störningsinfo.
    
    let popover = this.popoverCtrl.create(DisturbanceInfo, {siteId: this.siteId});
    popover.present({
      ev: myEvent
    });
  }


  openInfo(myEvent) {   // Skapar en PopOver-sida när man trycker på "i"
  let popover = this.popoverCtrl.create(TravelInfo2);
  popover.present({
    ev: myEvent
  });
}
}
