import { Component } from '@angular/core';
import { NavController, PopoverController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import {DisturbanceInfo} from '../disturbanceInfo/disturbanceInfo';
import { TravelInfo2 } from '../travelInfo2/travelInfo2';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
@Component({
  selector: 'page-selectedRoute',
  templateUrl: 'selectedRoute.html'
})

export class SelectedRoute {
  private venueId;
  public transport_type;
  departures;
  public routeName;
  public siteId;
  public aColor: string;
public bColor: string;
stationInformation;

  constructor(public navCtrl: NavController, public provider: ApiProvider, public popoverCtrl: PopoverController, public navParams: NavParams) {
    this.routeName = navParams.get("routeName");
    this.siteId = navParams.get("siteId");
   this.transport_type = navParams.get("transport_type");
  this.venueId = navParams.get("venueId");

    this.getDepartures(this.siteId);
    setInterval(() => {
          console.log('timer');
          this.getDepartures(this.siteId);
    },5000);
    this.getStationInformation(this.venueId);

  }

  getDepartures(siteId:string) {
    console.log("Uppdaterar");
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
getStationInformation(venue:string) { // Kommer att hÃ¤mta olika stationer frÃ¥n API
    this.provider.getStations(venue)
    .subscribe(
      (data)=> {
        this.stationInformation=data["results"];
this.changeColors();
      },
      (error)=> {console.log("error: ", JSON.stringify(error));}
    )
  }
  changeColors(){
    var size = Object.keys(this.stationInformation).length;
    for(let i = 0; i < size; i++){
      console.log("Transport_type: ", this.stationInformation[i].transport_type);
        if(this.stationInformation[i].e_name==this.routeName&&this.stationInformation[i].transport_type==this.transport_type){
          console.log("Ja!");
          this.aColor = this.stationInformation[i].color_hex;
          this.bColor = this.stationInformation[i].color_hex;
        }
    }
  }

}
