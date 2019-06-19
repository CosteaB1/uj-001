import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';
import * as SIP from 'sip.js/dist/sip';
import {session} from 'sip.js/dist/sip';
import { AuthService } from '../service/auth.service';
import { WebphoneService } from '../webphone/webphone.service';
import { webphone } from './webphone';




@Component({
  selector: 'app-webphone',
  templateUrl: './webphone.component.html',
  styleUrls: ['./webphone.component.css'],
  providers: [MessageService]

})

export class WebphoneComponent implements OnInit {
  configmno: webphone[];
  items: MenuItem[];
  selectconfig: webphone;
  ua;
  constructor(private authService: AuthService, private configList: WebphoneService, private router: Router,) {


  }


  ngOnInit() {
    this.configList.getMnosList().then(data => this.configmno = data);
  

  }
  simboxname = localStorage.getItem('simboxname');



  onClick(webphone) {
    this.ua = new SIP.UA({
      uri: webphone.URI,
      transportOptions: {
        wsServers: [webphone.wsServer],
        //  register: true,
        //  traceSip: true,
        hackWssInTransport: true,
      },
      sessionDescriptionHandlerOptions: {
        iceCheckingTimeout: 500
      },
      authorizationUser: webphone.auth,
      password: webphone.pass,
    });

  }



  
  callinvite(callnumber: string) {
    console.log (callnumber);
      let session = this.ua.invite(callnumber,{
      sessionDescriptionHandlerOptions: {
          constraints: {
              audio: true,
              video: false

          }

      }
    });
        //2. atach media to html tags
    let remoteAudio = <HTMLAudioElement>document.getElementById('remoteAudio');
    let localAudio = <HTMLAudioElement>document.getElementById('localAudio');
    this.ua.on('invite', (session) => session.accept());
    session.on('trackAdded', function() {
      // We need to check the peer connection to determine which track was added
      let pc = session.sessionDescriptionHandler.peerConnection;

      // Gets remote tracks
      let remoteStream = new MediaStream();
      pc.getReceivers().forEach(function(receiver) {
        remoteStream.addTrack(receiver.track);
      });
     remoteAudio.srcObject = remoteStream;
     remoteAudio.play();

      // Gets local tracks
      let localStream = new MediaStream();
      pc.getSenders().forEach(function(sender) {
        localStream.addTrack(sender.track);
      });
      localAudio.srcObject = localStream;
      localAudio.play();
    });

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


