import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController, PopoverController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import {DisturbanceInfo} from '../disturbanceInfo/disturbanceInfo';
import { TravelInfo2 } from '../travelInfo2/travelInfo2';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser, InAppBrowserOptions, InAppBrowserObject } from '@ionic-native/in-app-browser';
declare var google;
@Component({
  selector: 'page-selectedRoute',
  templateUrl: 'selectedRoute.html'
})

export class SelectedRoute {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  private route;
private routeId;
  private venueId;
  public transport_type;
  departures;
  public routeName;
  public siteId;
  public icon;
  public aColor: string;
  public bColor: string;
  public destinationString: string;
  stationInformation;
  stationTypeString;
  public venueName;
  private venueAddress;
  private color;

  constructor(public navCtrl: NavController, public provider: ApiProvider, public popoverCtrl: PopoverController, public navParams: NavParams, public geo: Geolocation, public inAppBrowser: InAppBrowser) {
    this.routeName = navParams.get("routeName");
    this.color = navParams.get("color_hex");
    this.bColor=this.color;
    this.aColor=this.color;
    this.routeId = navParams.get("routeId");
    this.getRouteInformation(this.routeId);
    this.siteId = navParams.get("siteId");
    this.transport_type = navParams.get("transport_type");
    this.venueId = navParams.get("venueId");
    this.venueName = navParams.get("venueName");
    this.venueAddress = navParams.get("venueAddress");
    this.icon = navParams.get("icon");


    this.getDepartures(this.siteId);
    setInterval(() => {
      console.log('timer');
      this.getDepartures(this.siteId);
    },60000);
this.destinationString = this.routeName+", "+ this.transport_type;

this.getRouteInformation(this.routeId);

  }

  ionViewDidLoad(){
    this.calculateAndDisplayRoute();
  }

  openTicketPage() {
const options: InAppBrowserOptions = {
      toolbar: 'yes',
      footer: 'yes',
    }

    const browser = this.inAppBrowser.create('https://sl.se/sv/kop-biljett/', '_system', options);

  }

  calculateAndDisplayRoute() {
    let that = this;
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
    });
    directionsDisplay.setMap(map);

    var image = {
      url: '/assets/imgs/pos_icon.png',
      scaledSize: new google.maps.Size(30, 48),
    };

    this.geo.getCurrentPosition().then((position) => {
      var myLatLng =  {lat: position.coords.latitude, lng: position.coords.longitude};
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon :image,
      });
    }, (err) => {
      console.log(err);
    });

    directionsService.route({

      // byt myLocation = Venue;
      origin: this.venueAddress,
      // byt Destination = "routeName,Transport_type_name";
      destination: this.destinationString,
      travelMode: 'WALKING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  getDepartures(siteId:string) {
    console.log("Uppdaterar");
    this.provider.getDepartures(siteId)
.subscribe(
 (data) => {

if(this.transport_type == '1') {
  try{
 this.departures = data["ResponseData"].Metros;
}catch( err){console.log("errormessage");
alert("There is a problem with loading the departures at this time, please try again!");
}
} else if(this.transport_type == '2') {
  try{
 this.departures = data["ResponseData"].Trams;
 }catch( err){console.log("errormessage");
alert("There is a problem with loading the departures at this time, please try again!");}
} else if(this.transport_type == '3') {
  try{
 this.departures = data["ResponseData"].Buses;
 }catch( err){console.log("errormessage");
alert("There is a problem with loading the departures at this time, please try again!");
}
} else if(this.transport_type == '4') {
  try{
 this.departures = data["ResponseData"].Trains;
 }catch( err){console.log("errormessage");
alert("There is a problem with loading the departures at this time, please try again!");
}
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


getRouteInformation(venue:string) { // Kommer att hÃ¤mta olika stationer frÃ¥n API
  this.provider.getRoute(venue)
  .subscribe(
    (data)=> {
      this.route=data["results"];
      console.log("getRoute:", JSON.stringify(data["results"]));
    },
    (error)=> {console.log("error: ", JSON.stringify(error));}
  )
}
loadSelectedRoute(route){

}

}
