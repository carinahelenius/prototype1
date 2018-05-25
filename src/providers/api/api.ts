import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JwtMaker } from '../../providers/Jwt-maker/jwt';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient, private jwt:JwtMaker) {
    console.log('Hello ApiProvider Provider');
  }
  getVenues(str:string) {
    var response = this.http.get("https://pvt.dsv.su.se/Group9/api/v1/venues",{
  params: new HttpParams().set('user_value', str),
        headers: new HttpHeaders().set('Authorization', 'Bearer '+this.jwt.makeToken(str))
      })
    console.log("resp: ", JSON.stringify(response));
      return response;
}
getStations(str:string) {
  var response = this.http.get("https://pvt.dsv.su.se/Group9/api/v1/routes",{
params: new HttpParams().set('user_value', str),
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.jwt.makeToken(str))
    })
  console.log("resp: ", JSON.stringify(response));
    return response;
}
getEvents(str:string) {
  var response = this.http.get("https://pvt.dsv.su.se/Group9/api/v1/venueHasEvent",{
params: new HttpParams().set('user_value', str),
      headers: new HttpHeaders().set('Authorization', 'Bearer '+this.jwt.makeToken(str))
    })
  console.log("resp: ", JSON.stringify(response));
    return response;
}

getDepartures(siteId:string) {
  var response = this.http.get("https://api.sl.se/api2/realtimedeparturesV4.json?key=7df6053ebb6048dd8a125ac80c38d1fe&timewindow=15&Ship=false&siteId=" + siteId)

  return response;
}

}
