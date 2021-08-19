import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';
import { LoginStatus } from 'src/app/component/login/login.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private msg: NzMessageService, private router: Router,private deviceService: DeviceDetectorService) { }

  isCollapsed = false;
  collapseWidth = 64;
  isMobile=false;
  loginStatus: LoginStatus = new LoginStatus();
  userType: string = '';

  onCollapse()
  {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();


  }

}
