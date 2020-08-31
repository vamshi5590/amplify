import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseUrl: string;

  constructor( private http : HttpClient) {

   this.baseUrl = `${environment.serviceUrl}`;
   }

  
// postfile( postdata) {
//   return this.http.post(this.baseUrl + 'incentatives/search' , postdata);
// }
//


  
postfile( postdata) {
  return this.http.post('https://iottemp.cfapps.io/', postdata);
}
}
