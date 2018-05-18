import { ViewController} from  'ionic-angular';
import { Component } from '@angular/core'

@Component({
    template: `
     <ion-list-header align="center"><b>INFO</b></ion-list-header>
       <p align="center" margin=3px>
       The background color on the screen indicates the color of the street light you are supposed to follow.
       </p>
       <p align="center" margin=3px>
     The button with the <ion-icon name="md-warning"></ion-icon> icon
       gives you details about realtime disturbances on the metro lines that cross the displayed stations.
     </p>
    `
})
export class TravelInfo2 {
    constructor(public viewCtrl: ViewController) { }

    close() {
        this.viewCtrl.dismiss();
    }
}
