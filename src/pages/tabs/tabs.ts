import { Component } from '@angular/core';

/* Change these to change the pages in the tabcontroller*/
import { AboutPage } from '../about/about';
/*import { HomePage } from '../home/home';*/
import { VenueList } from '../venueList/venueList';
import { SelectedVenue } from '../selectedVenue/selectedVenue';
import { SelectedRoute } from '../selectedRoute/selectedRoute';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = VenueList; /*Change to change first page, I think */
  tab2Root = SelectedRoute;

  constructor() {

  }
}
