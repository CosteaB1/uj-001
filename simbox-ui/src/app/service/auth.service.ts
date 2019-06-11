import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Tokens} from '../models/tokens';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN= 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient,
    private router:Router) {

     }

  // login(username:string, password:string){
  //   let data = {auth: btoa(username.concat(':',password))};
  //   console.log("Invoke http post request",data);
  //   return this.http.post<any>(`${environment.apiUrl}/auth`,data).pipe(
  //     map(data => {
  //       let tmp = JSON.parse(data);
  //       console.log(tmp && tmp['"status"'],tmp , tmp['status'])
  //       if (tmp && tmp['status']) {
  //         console.log('token', JSON.stringify(tmp['token']));
  //         localStorage.setItem('authtoken', JSON.stringify(tmp['token']));
  //         //localStorage.setItem('user', JSON.stringify(data['user']));
  //        this.router.navigate(['']);

  //     }
      
  //     if (tmp && tmp['status']=="notok") {
  //       alert("Incorrect username or password");
  //       localStorage.removeItem("authtoken");
  //     return data;
  //     }
  //       console.log(data);
  //     })
  //   );
  // }


  // checktokeStatus(){
  //   if (localStorage.getItem("authtoken")) {
  //     return true;
  //   }
  //   return false;
  // }

  login(user: {username: string, password: string}):Observable<boolean>{
    return this.http.post<any>(`${environment.apiUrl}/login`, user)
    .pipe(
      tap(tokens => this.doLoginUser(user.username, tokens)),
      mapTo(true),
      catchError(error =>{
        alert(error.error);
        return of(false);
      })
    );
  }

  logout(){
    return this.http.post<any>(`${environment.apiUrl}/logout`,{
      'username': this.getloggedUsername()
    }).pipe(
      tap(()=> this.doLogoutUser()),
    mapTo(true),
    catchError(error => {alert(error.error);
    return of(false);
    }));
  }

  isLoggedIn(){
    return !!this.getJwtToken();
  }

  refreshToken(){
    return this.http.post<any>(`${environment.apiUrl}/refresh`,{
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens)=>{
      this.storeJwtToken(tokens.jwt);
    }));
  }

  getJwtToken(){
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getloggedUsername(){
    return localStorage.getItem("username");
  }

doLoginUser(username: string, tokens: Tokens){
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

   doLogoutUser(){
    this.loggedUser=null;
    localStorage.removeItem ("simboxid");
    localStorage.removeItem ("mnoid");
    localStorage.removeItem ("username");
    this.removeTokens();


  }

  private getRefreshToken(){
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string){
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens){
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this. REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens(){
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
  
}
