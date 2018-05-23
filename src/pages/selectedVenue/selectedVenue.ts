import { Component } from '@angular/core';
import { NavController, ViewController, PopoverController, NavParams } from 'ionic-angular';
import { TravelInfo } from '../travelInfo/travelInfo';
import { ApiProvider } from '../../providers/api/api';
import { SelectedRoute } from '../selectedRoute/selectedRoute';
import { InAppBrowser, InAppBrowserOptions, InAppBrowserObject } from '@ionic-native/in-app-browser';


@Component({
  selector: 'page-selectedVenue',
  templateUrl: 'selectedVenue.html'
})
export class SelectedVenue {
  stations;
  public venueName;
  public venueId;
  private venueAddress;
private venueView;
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, public provider: ApiProvider, public navParams: NavParams, public inAppBrowser: InAppBrowser) {
  this.venueName = navParams.get("venueName");
  this.venueId = navParams.get("venueId");
  this.venueAddress = navParams.get("venueAddress");
  this.venueView = navParams.get("venueView");
  this.ionLoadStations(this.venueId);
console.log("VenueUrl: ", this.venueView);
  }

  openBrowserPage(id) {

    const eventUrl = 'https://www.stockholmlive.com/evenemang/alla-evenemang'; // Byt ut till db_event/event_url
    const restaurantUrl = 'https://www.google.com/maps/search/' + this.venueName + '+Restaurants+Bars';
    const overviewUrl = this.venueView; // Byt ut till db_venue_arenaview_url

    const options: InAppBrowserOptions = {
      toolbar: 'yes',
      footer: 'yes',
    }

    if(id == 'eventPage') {
      this.inAppBrowser.create(eventUrl, '_system', options);

    } else if(id == 'restaurantPage') {
      this.inAppBrowser.create(restaurantUrl, '_system', options);

    } else if(id == 'overviewPage') {
      this.inAppBrowser.create(overviewUrl, '_system', options);
    }

  }
 goToselectedRoute(routeName:string, siteId:string, tType, icon, sType, colors_hex){
    this.navCtrl.push(SelectedRoute, {
      routeName: routeName,
      siteId: siteId,
      venueId: this.venueId,
      transport_type: tType,
      venueName: this.venueName,
      icon: icon,
      venueAddress: this.venueAddress,
      stationType: sType,
      colors: colors_hex
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
        console.log("SpecificVenue: ", JSON.stringify(this.stations));
      },
      (error)=> {console.log("error: ", JSON.stringify(error));}
    )
  }
}
interface MyObj {
  name: string

}
