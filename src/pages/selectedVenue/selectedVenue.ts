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
  eventUrl;
  timeEl;
  eventLink;
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
    setInterval(() => {
      this.ionLoadStations(this.venueId);
    }, 10000);

  this.loadEvents();
console.log("VenueUrl: ", this.venueView);
  }

  openBrowserPage(id) {

    const eventUrl = this.eventUrl;
    const restaurantUrl = 'https://www.google.com/maps/search/' + this.venueName + '+Restaurants+Bars';
    const overviewUrl = this.venueView;

    const options: InAppBrowserOptions = {
      toolbar: 'yes',
      footer: 'yes',
    }

    if(id == 'eventPage') {
      this.inAppBrowser.create(eventUrl, '_self', options);

    } else if(id == 'restaurantPage') {
      this.inAppBrowser.create(restaurantUrl, '_system', options);

    } else if(id == 'overviewPage') {
      this.inAppBrowser.create(overviewUrl, '_system', options);
    }

  }
 goToselectedRoute(routeName:string, siteId:string, tType, icon, sType, colorHex, colorString){
    this.navCtrl.push(SelectedRoute, {
      routeName: routeName,
      siteId: siteId,
      venueId: this.venueId,
      transport_type: tType,
      venueName: this.venueName,
      icon: icon,
      venueAddress: this.venueAddress,
      stationType: sType,
      color_hex: colorHex,
      color: colorString
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
  loadEvents() { // Kommer att hämta olika stationer från API
    this.provider.getEvents(this.venueId)
    .subscribe(
      (data)=> {
        let events = data["results"];

        var count = Object.keys(events).length;
        if(count==0){
        console.log("<1");
          this.eventLink="There is no event today at " + this.venueName}
        else{
        this.eventUrl = events[0].event_url;
          this.eventLink=events[0].name;
          let date = new Date(events[0].start_time);

          let hours: string|number = date.getHours();
          let minutes: string|number = date.getMinutes();
          
          if(hours<10){hours="0"+hours;}
          if(minutes<10){minutes = minutes+"0";}
          this.timeEl=hours+":"+minutes;


          this.eventLink = "Today the event " + events[0].name + " will be at kl "+this.timeEl+" at "+this.venueName;
          document.getElementById("myHeader").innerHTML = this.eventLink;
          console.log("timeEl:", this.timeEl);
          console.log("event: ",events[0].name);
      }
        console.log("EventList: ", JSON.stringify(data));
      },
      (error)=> {console.log("eventListError: ", JSON.stringify(error));}
    )
  }
}
interface MyObj {
  name: string

}
