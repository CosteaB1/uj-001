import { Component, OnInit } from '@angular/core';

import * as SIP from 'sip.js/dist/sip';
import * as accept from 'sip.js/dist/sip';
import * as UA from 'sip.js/dist/sip';
import * as MediaStream from 'sip.js/dist/sip';


import {
  Logger, on, start, invite, call, shouldAcceptRefer, config, session, srcObject, play, remoteAudio, sessionDescriptionHandler, peerConnection, getReceivers, answer, trackAdded, forEach,
  receiver, addTrack, track,sender
} from 'sip.js/dist/sip';
import { AuthService } from '../service/auth.service';
import { WebphoneService } from '../webphone/webphone.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { MenuItem } from 'primeng/api';

import { Router } from '@angular/router';
import { webphone } from './webphone';
@Component({
  selector: 'app-webphone',
  templateUrl: './webphone.component.html',
  styleUrls: ['./webphone.component.css'],
  providers: [MessageService]

})

export class WebphoneComponent implements OnInit {
  userAgent: UA;
  loadAPI: Promise<any>;
  url: string;
  peerConnection: peerConnection;
  configmno: webphone[];
  items: MenuItem[];
  selectconfig: webphone;
  public logger: Logger;
  on: on;
  start: start;
  ua: UA;
  call: call;
  simple: any;
  invite: invite;
  session: session;
  config: config;
  srcObject: srcObject;
  // play: play; 
  sessionDescriptionHandler: sessionDescriptionHandler;
  getReceivers: getReceivers;
  answer: answer;
  trackAdded: trackAdded;
  forEach: forEach;
  receiver: receiver;
  addTrack: addTrack;
  remoteVideo;localVideo:HTMLElement;
  track: track;
  sender:sender ; 
  constructor(private authService: AuthService, private configList: WebphoneService, private router: Router) {


  }


  ngOnInit() {
    this.configList.getMnosList().then(data => this.configmno = data);
  }

  simboxname = localStorage.getItem('simboxname');


  onClick(webphone) {
    this.userAgent = new SIP.UA({
      uri: webphone.URI,
      transportOptions: {
        wsServers: [webphone.wsServer],
        register: true,
        traceSip: true,
      },
      authorizationUser: webphone.auth,
      password: webphone.pass,
    });

  }


  configuseragent(callnumber: string) {
    console.log(callnumber)
    // this.userAgent.start(),
    this.session = this.userAgent.invite(callnumber + '@192.168.1.161', {
      sessionDescriptionHandlerOptions: {
        constraints: {
          audio: true,
          video: false
        },

      },

    });




    //   session.on('invite');
    // session.accept('invite');
    this.remoteVideo = document.getElementById('remoteVideo');
    this.localVideo = document.getElementById('localVideo');

    this.session.on(this.trackAdded, function () {

      var pc = this.session.sessionDescriptionHandler.peerConnection;
      var remoteStream = new MediaStream();
      pc.this.getReceivers().this.forEach(function (this: receiver) {
        this.remoteStream.addTrack(receiver.track);
      });
      this.remoteVideo.srcObject = remoteStream;
      this.remoteVideo.play();

      var localStream = new MediaStream();
      pc.this.getSenders().this.forEach(function (this:sender) {
        this.localStream.addTrack(sender.track);
      });
      this.localVideo.srcObject = localStream;
      this.localVideo.play();

    })
    this.session.on('invite', function () { this.session.answer() });


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


