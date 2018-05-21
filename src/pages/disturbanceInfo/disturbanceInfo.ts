import { ViewController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core'
import { ApiProvider } from '../../providers/api/api';

@Component({  
    template: `
     <ion-list-header align="center"><b>DISTURBANCE INFO</b></ion-list-header>
       <p *ngFor="let deviation of deviations" align="center">
       {{deviation.Deviation.Text}}
     </p>
    `
  })
  
  export class DisturbanceInfo {

    deviations;
    public siteId;

    constructor(public viewCtrl: ViewController, public provider: ApiProvider, public navParams: NavParams) {
      this.siteId = navParams.get("siteId");
      this.getDeviations(this.siteId);
    }

    close() {
      this.viewCtrl.dismiss();
    }
    
    getDeviations(siteId:string) {
        
        this.provider.getDepartures(siteId)
        .subscribe(
          (data) => {
            this.deviations = data["ResponseData"].StopPointDeviations;
            console.log(this.deviations);
          },
          (error) => {console.log("Error: ", JSON.stringify(error));}
        )
      }
  }