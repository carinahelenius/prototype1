import { Component } from '@angular/core';
import { PopoverController, ViewController, NavController } from 'ionic-angular';
import { VenueInfo } from '../venueInfo/venueInfo';
import { SelectedVenue} from '../selectedVenue/selectedVenue';
import { ApiProvider } from '../../providers/api/api';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'venueList.html'
})

export class VenueList {
  venues;
  downloadedVenues;
  splash = true;

  //tabBarElement: any;

  constructor(public popoverCtrl: PopoverController, public navCtrl: NavController, public provider: ApiProvider, public alertCtrl: AlertController) {
    /*this.initializeVenues();*/
    this.ionLoadVenues();
  //  this.tabBarElement = document.querySelector('.tabbar');

  }
  isEvent(venueName: string, venue, address, view) {
      this.provider.getEvents(venue)
      .subscribe(
        (data)=> {
          let events = data["results"];
  
          var count = Object.keys(events).length;
          if(count==0){ 

            let alert = this.alertCtrl.create({
              title: "Evide",
              subTitle: "There is no event at " + venueName + " today!",
              buttons: ["OK"],
            });
            alert.present();
          }
          
          else{
          this.goToPage(venueName, venue, address, view);
        }
          console.log("EventList: ", JSON.stringify(data));
        },
        (error)=> {console.log("eventListError: ", JSON.stringify(error));}
      )
    }
  

  goToPage(venueName: string, venue, address, view){
    this.navCtrl.push(SelectedVenue, {
    venueName: venueName,
    venueId:venue,
    venueAddress: address,
venueView: view
    })
  }

  ionLoadVenues() { // Kommer att hämta olika arenor info från API
    this.provider.getVenues("str")
    .subscribe(
      (data)=> {this.downloadedVenues = data["results"];
               this.venues=this.downloadedVenues;

               },
      (error)=> {console.log(error);}
    )
  }

  ionViewDidLoad(){
    //  this.tabBarElement.style.display = 'none';
      setTimeout(() => {
        this.splash = false;
  //      this.tabBarElement.style.display = 'flex';

      }, 4000);
    }



  getVenues(ev) {
    this.venues=this.downloadedVenues;  // Återställer lista till alla arenor

    let val = ev.target.value;  // Sätter 'val' till värdet av 'ev'

    if(val && val.trim() != '') {  // Filtrerar så länge det inte är en tom sträng
      this.venues = this.venues.filter((item) => {
        if(val[0].toLowerCase()==item.name[0]||val[0].toUpperCase()==item.name[0]){
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);}
      })
    }
  }

  openInfo(myEvent) {   // Skapar en PopOver-sida när man trycker på "i"
    let popover = this.popoverCtrl.create(VenueInfo);
    popover.present({
      ev: myEvent  // Skickar med klick-eventet så att rutan dyker upp
    });            // där man klickar.
  }


}
