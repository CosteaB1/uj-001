import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SimBox } from '../navigation/SimBox';
import { defineComponent, defineNgModule } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class SimBoxListService {
  

  constructor(private http: HttpClient, private router:Router) { }


 

  getSimBoxsList() {
    return this.http.get(`${environment.apiUrl}/SimboxList`)
                .toPromise()
                .then(res => <SimBox[]> res)
                .then(data => { 
                  
                  return data; });
}


// SimBoxList() {
//   if (localStorage.getItem("authtoken")==null ) {
//     this.router.navigate(['login']);
//   }
//     else {
//       this.router.navigate(['']);

//     // this.router.navigate(['']); 
//   }

// }



}
