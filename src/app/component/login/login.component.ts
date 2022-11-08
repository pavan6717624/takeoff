import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as shajs from 'sha.js';
export class LoginStatus {
  userId: string = "";
  userType: string = "";
  loginStatus: boolean = false;
  loginId: string = "";
  jwt: string = '';
   subscriptionType: string = '';
}



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  userid: string = "";
  passwordVisible = false;
  passwordVisible1 = false;
  passwordVisible2 = false;
  password: string = "";
  logginStatus: boolean = false;
  loginStatus: LoginStatus = new LoginStatus();

  userId: string = "";
  email: string = "";
  city: string = "";
  otp: string= '';
  checkingOTP = false;
  checkedOTP = false;
  changepassword : string = '';
  confirmpassword: string ='';


  constructor(private router: Router, private loginService: LoginService, private msg: NzMessageService) {
  }


  passwordModalVisible = false;
  generating = false;

  ngOnInit(): void {

    
    this.getLoginDetails();


   // this.login();
  }

  getLoginDetails()
  {
    this.logginStatus=true;
    this.loginService.getLoginDetails().subscribe(
      (res:any) => {
       this.logginStatus=false;
        this.loginStatus=res;
        const token =    localStorage.getItem('token');
        if(this.loginStatus.loginStatus && token)
        {
        this.loginStatus.jwt=token;
        this.router.navigate(['user'],  { state: {loginStatus: res }}); 
        }
      },
      (err) => { this.logginStatus=false; }
    );
  }



  home() {
    this.router.navigate(['']);
  }

  login() {
    this.logginStatus = true;
    var formData = new FormData();
    formData.set("username", this.userid);

   this.password = (shajs('sha256').update(this.password).digest('hex'));

    formData.set("password", this.password);
    this.loginService.login(formData).subscribe(
      (res) => {
        this.loginStatus = res; 
        console.log(res);
        if (this.loginStatus.loginStatus) {
        this.logginStatus = false;


        let tokenStr= 'Bearer '+this.loginStatus.jwt;
        localStorage.setItem('token', tokenStr);

        this.router.navigate(['user'],  { state: {loginStatus: res }}); 
        }
        else {
          this.msg.create("error", res.message);
          this.password = "";
          this.logginStatus = false;
        }
      },

    

      (err) => {  this.password = ""; this.msg.create("error", "Could not Connect to Sever. Please Try After Some Time..."); this.logginStatus = false; }
    );

  }

  mailSent = false;

  generateMailPasscode()
  {
    
  if(
    this.userId == null || this.userId == undefined || this.userId.trim().length == 0 || 
    this.email == null || this.email == undefined || this.email.trim().length == 0 || 
    this.city == null || this.city == undefined || this.city.trim().length == 0  
  ) 
  
  {
    this.msg.create('error', 'Please provide your Full Details' + this.userId +" "+this.email+" "+this.city);
    return;
  }
    
    this.generating = true;
    var formData = new FormData();
    formData.set("userId",this.userId);
    formData.set("email", this.email);
    formData.set("city", this.city);


    this.loginService.generateMailPasscode(formData).subscribe(
      (res:any) => {
       this.generating=false;
        console.log(res);

        if(res)
        {
          this.mailSent = true;
        }
        else
        {
          this.msg.create('error', 'Provided Details are not Registered. Please provide Registered Details.');
        }
      },
      (err) => { this.generating=false; this.msg.create('error', 'Error Occured at Server. Please try again.');}
    );


  }

  changingpassword = false;
  changedpassword = false;

  forgetPassword()
  {
    

  

   if(this.changepassword && this.confirmpassword && this.changepassword === this.confirmpassword && this.changepassword.length > 8)
   {
     var changepassword=this.changepassword;
    this.changepassword = (shajs('sha256').update(this.changepassword).digest('hex'));
    this.confirmpassword = (shajs('sha256').update(this.confirmpassword).digest('hex'));
    this.passwordVisible1=false;
    this.passwordVisible2=false;

    this.changingpassword = true;
    var formData = new FormData();
    formData.set("userId", this.userId);
    formData.set("newpassword", this.changepassword);

    this.loginService.forgetPassword(formData).subscribe(
      (res:any) => {
       this.changingpassword=false;
        console.log(res);

        if(res)
        {
          this.changedpassword = true;
          this.userid=this.userId;
          this.password=changepassword;
          this.login();
        }
        else
        {
          this.msg.create('error', 'Could not Change password. Contact Admin.');
        }
      },
      (err) => { this.changingpassword=false; this.msg.create('error', 'Error Occured at Server. Please try again.');}
    );

   }
   else
   {
     this.msg.create('error', 'Provide Valid (Minimum 8 Characters) Passwords');
   }

   
  }

  checkPasswordOTP()
  {
    
     if(this.otp.trim().length == 0)
    {
      this.msg.create('error', 'Provide Valid OTP');
      return;
    }
    
    this.checkingOTP = true;
    var formData = new FormData();
    formData.set("userId",this.userId);
    formData.set("email", this.email);
    formData.set("city", this.city);
    formData.set("otp", this.otp.trim());
    


    this.loginService.checkPasswordOTP(formData).subscribe(
      (res:any) => {
       this.checkingOTP=false;
        console.log(res);

        if(res)
        {
          this.checkedOTP = true;
        }
        else
        {
          this.msg.create('error', 'Wrong OTP. Please provide Correct OTP');
        }
      },
      (err) => { this.checkingOTP=false; this.msg.create('error', 'Error Occured at Server. Please try again.');}
    );

  }
}
