import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { TravelInfo2 } from '../travelInfo2/travelInfo2';

@Component({
  selector: 'page-selectedRoute',
  templateUrl: 'selectedRoute.html'
})

export class SelectedRoute {

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController) {

  }

  openInfo(myEvent) {   // Skapar en PopOver-sida när man trycker på "i"
    let popover = this.popoverCtrl.create(TravelInfo2);
    popover.present({
      ev: myEvent
    });
  }

}
