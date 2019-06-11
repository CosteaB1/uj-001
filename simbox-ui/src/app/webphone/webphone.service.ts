import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { webphone } from '../webphone/webphone';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebphoneService {

  constructor(private http: HttpClient, private router:Router) { }
configUrl = 'http://localhost:8080/MnoConfigPoint'; 
//   getConfigList() {
//     let mnoconfig = localStorage.getItem('mnoid');
//     console.log (mnoconfig);
//     return this.http.get(`${environment.apiUrl}/MnoConfigPoint?mno_id=${mnoconfig}` )
//                 .toPromise()
//                 .then(res => <webphone[]> res)
//                 .then(data => { 
//                   return data;
//   });
// }



getconfig() {

  return this.http.get(`${environment.apiUrl}/MnoConfigPoint` )
              .toPromise()
              .then(res => <webphone[]> res)
              .then(data => { 
                
                return data;
});                
}
}