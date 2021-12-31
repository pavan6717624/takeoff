import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private deviceService: DeviceDetectorService) { }

  isMobile = false;
  isCollapsed = false;

  ngOnInit(): void {
 var loginButton = window.document.getElementById("loginButton")

    if (loginButton) {
      loginButton.innerHTML = "Logout";
      loginButton.setAttribute('href', '/login');
      loginButton.setAttribute('onClick', "localStorage.removeItem('token')");
    }
    
  }

 
}
