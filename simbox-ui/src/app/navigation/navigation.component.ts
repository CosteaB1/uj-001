import { Component, OnInit } from '@angular/core';
import { SimBox } from './SimBox';
import { SimBoxListService } from '../service/sim-box-list.service';
import { MenuItem } from 'primeng/api';
import {MessageService} from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [MessageService]
})
export class NavigationComponent implements OnInit {

  simBoxes:SimBox[];
  selectedSimBox:SimBox;
  items: MenuItem[];


  constructor(private authService: AuthService,private sList:SimBoxListService,private messageService: MessageService,private router:Router) { }
  

  ngOnInit() {
    this.sList.getSimBoxsList().then(data=>this.simBoxes = data);
    this.items = [
      { label: 'View', icon: 'pi pi-search', command: (event) => console.log("view", event,this.selectedSimBox) },
      { label: 'Delete', icon: 'pi pi-times', command: (event) => console.log("delete", event, this.selectedSimBox) }
  ];

  }

  onClick(event, simbox){
    console.log("On click",event,simbox);
    localStorage.setItem('simboxid',simbox.id);
    this.router.navigate(['/MnoList']);
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
    /*alert("function is called");*/
  }
  
}
