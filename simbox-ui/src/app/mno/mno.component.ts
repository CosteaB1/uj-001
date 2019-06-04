import { Component, OnInit } from '@angular/core';
import { MNOService } from './mno.service';
import {MessageService} from 'primeng/components/common/messageservice';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { mno } from './mno';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as SIP from 'sip.js/dist/sip';

@Component({
  selector: 'app-mno',
  templateUrl: './mno.component.html',
  styleUrls: ['./mno.component.css'],
  providers: [MessageService]

})
export class MNOComponent implements OnInit {


  mnos:mno[];
  selectmno:mno;
  items: MenuItem[];
  http: any;
  userAgent: any;


  constructor(private mList:MNOService,private messageService: MessageService,private router:Router) { }

  ngOnInit() {
   
    this.mList.getMnosList().then(data=>this.mnos = data);
     this.items = [
       { label: 'View', icon: 'pi pi-search', command: (event) => console.log("view", event,this.selectmno) },
       { label: 'Delete', icon: 'pi pi-times', command: (event) => console.log("delete", event, this.selectmno) }
   ];

  }
  Logout() {
    localStorage.removeItem('authtoken');
    this.router.navigate(['/login']);
    console.log ('authtoken is removed');
  }
  MainPage () {
    this.router.navigate(['']);

  }
  webphoneroute(event, mno){
    console.log("On click",event,mno);
    this.router.navigate(['/webphone']);
  

   

    

  }

  configuseragent () {
    var userAgent = new SIP.UA({
      uri: '6003@192.168.1.161',
      transportOptions: {
        wsServers: ['ws://192.168.1.161:8088/ws']
      },
      authorizationUser: '6003',
      password: '1234',
 
     });
     this.router.navigate(['/webphone']);
  

 }

}
