import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { webphone } from '../webphone/webphone';

@Injectable({
  providedIn: 'root'
})
export class WebphoneService {

  constructor(private http: HttpClient, private router:Router) { }
  getMnosList() {
    let simboxid = localStorage.getItem('simboxid');
    console.log (simboxid);
    return this.http.get(`${environment.apiUrl}/MNO?simbox_id=${simboxid}` )
                .toPromise()
                .then(res => <webphone[]> res)
                .then(data => { 
                  
                  return data;
  });                
}
}