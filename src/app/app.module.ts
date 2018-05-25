import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { VenueList } from '../pages/venueList/venueList';
import { SelectedVenue } from '../pages/selectedVenue/selectedVenue';
import { VenueInfo } from '../pages/venueInfo/venueInfo';
import { SelectedRoute } from '../pages/selectedRoute/selectedRoute';
import { TravelInfo } from '../pages/travelInfo/travelInfo';
import { ApiProvider } from '../providers/api/api';
import { HttpClientModule } from '@angular/common/http';
import { JwtMaker } from '../providers/Jwt-maker/jwt';
import { DisturbanceInfo } from '../pages/disturbanceInfo/disturbanceInfo';
import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    MyApp,
    VenueList,
    AboutPage,
    SelectedVenue,
    VenueInfo,
    SelectedRoute,
    TravelInfo,
    DisturbanceInfo,
    TravelInfo,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    VenueList,
    SelectedRoute,
    SelectedVenue,
    VenueInfo,
    TravelInfo,
    DisturbanceInfo,
    TravelInfo,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    Geolocation,
    JwtMaker,
    InAppBrowser
  ]
})
export class AppModule {}
