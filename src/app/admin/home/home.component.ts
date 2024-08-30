import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginStatus } from 'src/app/component/login/login.component';
import { LoginService } from 'src/app/component/login/login.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  loginStatus: LoginStatus = new LoginStatus();
  userType: string = '';
  loading = false;

  constructor(  private msg: NzMessageService,private loginService: LoginService,private router: Router, private route: ActivatedRoute,private deviceService: DeviceDetectorService) { 


    const navigation = this.router.getCurrentNavigation();
    this.loginStatus = (navigation?.extras?.state?.loginStatus);

    if (this.loginStatus) {
      this.userType = this.loginStatus.userType;
      if(this.userType==='Admin')
      this.startLoading();
      else
      {
        this.loading = false; this.msg.create('info', 'Logging in...');
        this.router.navigate(['login']);
        return;
      }
    }
    else {
      this.getLoginDetails();

    }
    console.log("customer login Status :: " + this.loginStatus);

  }


  getLoginDetails() {
    this.loading = true;
    this.loginService.getLoginDetails().subscribe(
      (res: any) => {
        this.loading = false;
        this.loginStatus = res;
        if(this.loginStatus.userType==='Admin')
        this.startLoading();
        else
        {
          this.loading = false; this.msg.create('info', 'Logging in...');
          this.router.navigate(['login']);
          return;
        }
      },
      (err) => {
        this.loading = false; this.msg.create('error', 'Session Expired. Please Login...');
        this.router.navigate(['login']);
        return;
      }
    );
  }

  isMobile = false;
  isCollapsed = false;

  ngOnInit(): void {
 
    
  }

  startLoading()
  {
    var loginButton = window.document.getElementById("loginButton")

    if (loginButton) {
      loginButton.innerHTML = "Logout";
      loginButton.setAttribute('href', '/login');
      loginButton.setAttribute('onClick', "localStorage.removeItem('token')");
    }
  }

 
}
