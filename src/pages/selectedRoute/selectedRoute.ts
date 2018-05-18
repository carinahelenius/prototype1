import { Component } from '@angular/core';
import { NavController, PopoverController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import {DisturbanceInfo} from '../disturbanceInfo/disturbanceInfo';
import { NavController, PopoverController } from 'ionic-angular';
import { TravelInfo2 } from '../travelInfo2/travelInfo2';

@Component({
  selector: 'page-selectedRoute',
  templateUrl: 'selectedRoute.html'
})

export class SelectedRoute {

  departures;
  public routeName;
  public siteId;
  
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController) {

  constructor(public navCtrl: NavController, public provider: ApiProvider, public popoverCtrl: PopoverController, public navParams: NavParams) {
    this.routeName = navParams.get("routeName");
    this.siteId = navParams.get("siteId");
    this.getDepartures(this.siteId);
  
  }
  
  getDepartures(siteId:string) {
this.provider.getDepartures(siteId)
.subscribe(
  (data) => {
    
    this.departures = data["ResponseData"].Metros;
    console.log(this.departures);
  },
  (error) => {console.log("Error: ", JSON.stringify(error));}
)
  }

 
  openDisturbanceInfo(myEvent) { // Skapar popup-sida med störningsinfo.
    let popover = this.popoverCtrl.create(DisturbanceInfo, {siteId: this.siteId});

  openInfo(myEvent) {   // Skapar en PopOver-sida när man trycker på "i"
    let popover = this.popoverCtrl.create(TravelInfo2);

    popover.present({
      ev: myEvent
    });
  }
  }
}
