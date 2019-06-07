import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { webphone } from '../webphone/webphone';

@Injectable({
  providedIn: 'root'
})
export class WebphoneService {

  constructor(private http: HttpClient, private router:Router) { }

  getConfigList() {
    let mnoconfig = localStorage.getItem('mnoid');
    console.log (mnoconfig);
    return this.http.get(`${environment.apiUrl}/MnoConfigPoint?mno_id=${mnoconfig}` )
                .toPromise()
                .then(res => <webphone[]> res)
                .then(data => { 
                  return data;
  });
}

}
