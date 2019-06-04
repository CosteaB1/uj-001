import { Component, OnInit, ElementRef } from '@angular/core';
import * as $ from 'jQuery';
import * as SIP from 'sip.js/dist/sip';
import { UA } from 'sip.js/dist/sip';


@Component({
  selector: 'app-webphone',
  templateUrl: './webphone.component.html',
  styleUrls: ['./webphone.component.css']
})
export class WebphoneComponent implements OnInit {
  userAgent: any;
  loadAPI: Promise<any>;
  url: string;

  constructor(private elementRef: ElementRef, ) { 
    
  };

  ngOnInit() {

    var userAgent = new SIP.UA({
      uri: '6003@192.168.1.161',
      transportOptions: {
        wsServers: ['ws://192.168.1.161:8088/ws']
      },
      authorizationUser: '6003',
      password: '1234',

    });
 


  }






  configuseragent() {
    var userAgent = new SIP.UA({
      uri: '6003@192.168.1.161',
      transportOptions: {
        wsServers: ['ws://192.168.1.161:8088/ws']
      },
      authorizationUser: '6003',
      password: '1234',

    });
    // var SIP = require("sip.js");
/* could also be 
var SIP = require("sip.js");
var UA = SIP.UA;
*/    // var UA = SIP.UA();


    // var test = SIP.UA();
    var session = userAgent.invite('6003@192.168.1.161', {
      sessionDescriptionHandlerOptions: {
          constraints: {
              audio: true,
              video: false
          }
      }
  });


    

  }

  addJsToElement(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    this.elementRef.nativeElement.appendChild(script);
    return script;
  }




  RegisterB() {

    this.userAgent.ua.start();
    this.userAgent.ua.on('message', onMessage);

    function onMessage(message) {
      alert(message.body);
    }


  }
}
