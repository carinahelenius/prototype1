import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core'

@Component({
    template: `
     <ion-list-header align="center"><b>INFO</b></ion-list-header>
       <p align="center">Choose the venue you are currently visiting to get suggestions on routes
        to the nearest public transports!</p>
    `
  })
  
  export class VenueInfo {
    constructor(public viewCtrl: ViewController) {}

    close() {
      this.viewCtrl.dismiss();
    }
  }
