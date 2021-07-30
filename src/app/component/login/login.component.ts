import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { NzMessageService } from 'ng-zorro-antd/message';

export class LoginStatus {
  userId: string = "";
  userType: string = "";
  loginStatus: boolean = false;
}



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  userid: string = "";
  password: string = "";
  logginStatus: boolean = false;
  loginStatus: LoginStatus = new LoginStatus();
  constructor(private router: Router, private loginService: LoginService, private msg: NzMessageService) {
  }

  ngOnInit(): void {
  }

  home() {
    this.router.navigate(['']);
  }

  login() {
    this.logginStatus = true;
    var formData = new FormData();
    formData.set("userid", this.userid);
    formData.set("password", this.password);
    this.loginService.login(formData).subscribe(
      (res) => {
        this.loginStatus = res; 
        console.log(res);
        if (this.loginStatus.loginStatus) {
        this.logginStatus = false;
        this.router.navigate(['user'],  { state: {loginStatus: res }}); 
        }
        else {
          this.msg.create("error", "Invalid Credientails..");
          this.logginStatus = false;
        }
      },

    

      (err) => { this.msg.create("error", "Could not Connect to Sever. Please Try After Some Time..."); this.logginStatus = false; }
    );

  }
}
