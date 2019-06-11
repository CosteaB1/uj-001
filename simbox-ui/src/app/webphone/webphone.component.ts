import { Component, OnInit, ElementRef,Inject, Input  } from '@angular/core';

import * as SIP from 'sip.js/dist/sip';
import { AuthService } from '../service/auth.service';
import { WebphoneService } from '../webphone/webphone.service';
import {MessageService} from 'primeng/components/common/messageservice';
import { MenuItem } from 'primeng/api';

import { Router } from '@angular/router';
import { webphone } from './webphone';
import { subscribeOn } from 'rxjs/operators';
import { Subscriber } from 'rxjs';
@Component({
  selector: 'app-webphone',
  templateUrl: './webphone.component.html',
  styleUrls: ['./webphone.component.css']
})

export class WebphoneComponent implements OnInit {
  userAgent: SIP.UA;
  loadAPI: Promise<any>;
  url: string;
  session: any;
  peerConnection: any;
  element: HTMLElement;

  config:webphone[];
  items: MenuItem[];
  selectconfig:webphone;


  constructor(private authService: AuthService,private configList:WebphoneService,private router:Router) { }


  ngOnInit() {
    this.configList.getconfig().then(data=>this.config = data);

  
  
      // console.log ( this.config.values() ); 
    // this.userAgent = new SIP.UA({
    //   uri: '6003@192.168.1.161',
    //   transportOptions: {
    //     wsServers: ['ws://192.168.1.161:8088/ws']
    //   },
    //   authorizationUser: '6003',
    //   password: '1234',
    // });
 
  }

test () {
let x = localStorage.getItem ('test')
  console.log (x);
}

onClick(event, webphone){
  console.log("On click",event,webphone);
}


  configuseragent(callnumber: string) {
    console.log(callnumber)
   var session = this.userAgent.invite(callnumber + '@192.168.1.24', {
      sessionDescriptionHandlerOptions: {
          constraints: {
              audio: true,
              video: false

          }

      }

  });

  }
  RegisterB() {
    this.userAgent.ua.start();
    this.userAgent.ua.on('message', onMessage);
    function onMessage(message) {
      alert(message.body);
    }
  }

  button(b){
   (<HTMLInputElement>document.getElementById("target")).value = 
   (<HTMLInputElement>document.getElementById("target")).value + b;
  }
  clear_button(callnumber: string){
    callnumber = callnumber.substring(0, callnumber.length-1);
    (<HTMLInputElement>document.getElementById("target")).value =  callnumber;
  }

  logout(){
    this.authService.logout().subscribe(success =>{
      if (success){
        this.router.navigate(['/login']);
      }
    })
  }

  MainPage () {
    this.router.navigate(['']);
  }

  
  
}