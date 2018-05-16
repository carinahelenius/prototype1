import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    let headers = new HttpHeaders();
  let other_headers = headers.append('Authorization', 'Bearer ' + this.jwt.makeToken(str));
    console.log("headers: ",JSON.stringify(headers));
  var response = this.http.get("https://pvt.dsv.su.se/Group9/api/v1/endpoints");
    return response;
}

  obtainVenues(){
    return this.http.get('https://my-json-server.typicode.com/piiy/dbtest/posts')
  }

  obtainStations(){
    return this.http.get('https://my-json-server.typicode.com/piiy/testdb/posts')
  }

}
