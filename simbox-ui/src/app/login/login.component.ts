import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { first, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
// export class LoginComponent implements OnInit {
//   loginForm: FormGroup
//   errorMessage = ""

//   constructor(private formBuilder:FormBuilder,
//     private authServhice:AuthService, 
//     private router:Router) { }

//   ngOnInit() {
//     this.loginForm = this.formBuilder.group({
//       username:['', Validators.required],
//       password:['',Validators.required]
//     });
//   }
//   get f(){
//     return this.loginForm.controls;
//   }
//   onSubmit(){
//     console.log("We do submit");
//     if(this.loginForm.invalid){
//       console.log("Form is not valid");
//       //alert("Please enter user name or password");
//       return;
//     }
//     console.log(this.loginForm.value);
//     this.authServhice.login(this.f.username.value, this.f.password.value).pipe(
//       first()).subscribe(
//         data =>{
//           this.router.navigate(['']);
//         },
//         error => {
//           this.errorMessage = error;
//         }
//       );
//   }

// }

export class LoginComponent implements OnInit{
  
  loginForm: FormGroup;
  errorMessage = ""

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router){}

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username:['', Validators.required],
      password:['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls;}

  login() {

    this.authService.login({
      username: this.f.username.value,
      password: this.f.password.value
    })
 
    .subscribe(success =>{
     
      if (success) {
        this.router.navigate(['']);
      }
      
    });
   
  }

}
