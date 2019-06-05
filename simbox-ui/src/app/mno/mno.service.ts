import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { mno } from '../Mno/mno';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MNOService {

  constructor(private http: HttpClient, private router:Router) { }

  getMnosList() {
    let simboxid = localStorage.getItem('simboxid');
    console.log (simboxid);
    return this.http.get(`${environment.apiUrl}/MNO?simbox_id=${simboxid}` )
                .toPromise()
                .then(res => <mno[]> res)
                .then(data => { 
                  
                  return data;
  });
                 


                  
}


//  activeTestSession(): Observable<boolean> {
//   return this.http.get<any>('api' + '/is_there_already_an_active_session' + `${environment.apiUrl}/MNO` , { observe: 'body', responseType: 'json' });

// }

MnoId () {
 let data =this.MnoId ;
 return this.http.post<any>(`${environment.apiUrl}/MNO`,data).pipe(
  map(data => {
    let tmp = JSON.parse(data);
    console.log(tmp && tmp['"Muhaha"'],tmp , tmp['Muhaha'])  })); 
  
  } 
  

}
