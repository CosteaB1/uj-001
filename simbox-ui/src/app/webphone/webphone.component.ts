import { Component, OnInit, ElementRef, Inject, Input } from '@angular/core';

import * as SIP from 'sip.js/dist/sip';
import { AuthService } from '../service/auth.service';
import { WebphoneService } from '../webphone/webphone.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { MenuItem } from 'primeng/api';

import { Router } from '@angular/router';
import { webphone } from './webphone';
import { subscribeOn } from 'rxjs/operators';
import { Subscriber } from 'rxjs';
@Component({
  selector: 'app-webphone',
  templateUrl: './webphone.component.html',
  styleUrls: ['./webphone.component.css'],
  providers: [MessageService]

})

export class WebphoneComponent implements OnInit {
  userAgent: SIP.UA;
  loadAPI: Promise<any>;
  url: string;
  session: any;
  peerConnection: any;
  element: HTMLElement;

  config: webphone[];
  items: MenuItem[];
  selectconfig: webphone;


  constructor(private authService: AuthService, private configList: WebphoneService, private router: Router) { }


  ngOnInit() {
    this.configList.getMnosList().then(data => this.config = data);
  }

simboxname = localStorage.getItem ('simboxname');


onClick(webphone){

  this.userAgent = new SIP.UA({
    uri: webphone.URI,
    transportOptions: {
      wsServers: [webphone.wsServer]
    },
    authorizationUser: webphone.auth,
    password: webphone.pass,

  });
}


  configuseragent(callnumber: string) {
    console.log(callnumber)
      this.userAgent.invite(callnumber + '@192.168.1.161', {
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
  
  button(b) {
    (<HTMLInputElement>document.getElementById("target")).value =
      (<HTMLInputElement>document.getElementById("target")).value + b;
  }

  clear_button(callnumber: string) {
    callnumber = callnumber.substring(0, callnumber.length - 1);
    (<HTMLInputElement>document.getElementById("target")).value = callnumber;
  }

  logout() {
    this.authService.logout().subscribe(success => {
      if (success) {
        this.router.navigate(['/login']);
      }
    })
  }

  MainPage() {
    this.router.navigate(['']);
  }

}