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
      let headers = new HttpHeaders();
    let other_headers = headers.append('Authorization', 'Bearer ' + this.jwt.makeToken(str));
      console.log("headers: ",JSON.stringify(headers));
    var response = this.http.get("https://pvt.dsv.su.se/Group9/venues");
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



// Metod för att hämta både avgångar och störningsinfo. (Störningsinfo fanns i Realtidsinfo API:t också nämligen)

getDepartures(siteId:string) {
  var response = this.http.get("https://api.sl.se/api2/realtimedeparturesV4.json?key=5393f7fca4684dbbb848a9eb35cf70c0&timewindow=15&Ship=false&Train=false&siteId=" + siteId)

  return response;
}

  obtainVenues(){
    return this.http.get('https://my-json-server.typicode.com/piiy/dbtest/posts')
  }

  obtainStations(){
    return this.http.get('https://my-json-server.typicode.com/piiy/testdb/posts')
  }

}
