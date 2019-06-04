import { Component, OnInit, ElementRef,Inject  } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 

import * as $ from 'jQuery';
import * as SIP from 'sip.js/dist/sip';
import { UA } from 'sip.js/dist/sip';


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


  constructor(private elementRef: ElementRef, ) { 
    
  };

  ngOnInit() {

    this.userAgent = new SIP.UA({
      uri: '6003@192.168.1.161',
      transportOptions: {
        wsServers: ['ws://192.168.1.161:8088/ws']
      },
      authorizationUser: '6003',
      password: '1234',

    });
 


  }



 


  configuseragent(callnumber: string) {
    console.log(callnumber)

    var session = this.userAgent.invite(callnumber + '@192.168.1.161', {
      sessionDescriptionHandlerOptions: {
          constraints: {
              audio: true,
              video: false
          }
      }
  });


  

  }

  // stopseesion () {
  //   this.configuseragent().session.terminate();

  // }





  RegisterB() {

    this.userAgent.ua.start();
    this.userAgent.ua.on('message', onMessage);

    function onMessage(message) {
      alert(message.body);
    }


  }
}
