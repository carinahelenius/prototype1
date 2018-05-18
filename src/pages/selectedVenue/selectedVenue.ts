import { Component } from '@angular/core';
import { NavController, ViewController, PopoverController, NavParams } from 'ionic-angular';
import { TravelInfo } from '../travelInfo/travelInfo';
import { ApiProvider } from '../../providers/api/api';
import { SelectedRoute } from '../selectedRoute/selectedRoute';


@Component({
  selector: 'page-selectedVenue',
  templateUrl: 'selectedVenue.html'
})
export class SelectedVenue {
  stations;
  public venueName;

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public provider: ApiProvider, public navParams: NavParams) {
  this.venueName = navParams.get("venueName");
  this.ionLoadStations(this.venueName);
  }

  goToselectedRoute(routeName:string, siteId:string){
    this.navCtrl.push(SelectedRoute, {
      routeName: routeName,
      siteId: siteId,
    });
  }

  openInfo(myEvent) {   // Skapar en PopOver-sida när man trycker på "i"
    let popover = this.popoverCtrl.create(TravelInfo);
    popover.present({
      ev: myEvent
    });
  }

  ionLoadStations(venue:string) { // Kommer att hämta olika stationer från API
    this.provider.getStations(venue)
    .subscribe(
      (data)=> {
        this.stations=data["results"];
      },
      (error)=> {console.log("error: ", JSON.stringify(error));}
    )
  }
testLoader(){
  this.stations = [
    {name: 'Ericsson Globe', id: 1},
    {name: 'Hovet', id: 2},
    {name: 'Annexet', id: 3},
    {name: 'Tele2 Arena', id: 4},
    {name: 'Friends Arena', id: 5},
    {name: 'Stockholms Stadion', id: 6},
    {name: 'Berns', id: 7},
    {name: 'Cirkus', id: 8}
  ];
}
}
interface MyObj {
  name: string

}
