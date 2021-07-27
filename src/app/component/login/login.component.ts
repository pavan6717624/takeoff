import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  userid: string="";
  password: string = "";
  logginStatus: boolean = false;

  constructor(private router: Router,private loginService: LoginService,private msg: NzMessageService) { 
  }

  ngOnInit(): void {
  }

  home()
{
  this.router.navigate(['']);
}

login()
{
  this.logginStatus=true;
  var formData = new FormData();
  formData.set("userid",this.userid);
  formData.set("password",this.password);
  this.loginService.login(formData).subscribe(
    (res) => { if(res) {   this.router.navigate(['display']);}   else { this.msg.create("error","Invalid Credientails..");this.logginStatus=false;}},
    (err) => {this.logginStatus=false;this.msg.create("error","Could not Connect to Sever. Please Try After Some Time...");}
  );

}
}
