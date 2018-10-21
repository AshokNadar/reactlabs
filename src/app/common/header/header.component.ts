import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  userName:string;
  roleId:number;
  ngOnInit() {
    this.userName = localStorage.userName;
    this.roleId = localStorage.roleId;
  }

}
