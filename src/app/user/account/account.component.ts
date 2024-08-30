import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/user/user.service';
import { LoginService } from 'src/app/component/login/login.service';
import { LoginStatus } from 'src/app/component/login/login.component';
import * as shajs from 'sha.js';
import { VendoraccountService } from 'src/app/component/vendoraccount/vendoraccount.service';
export class CustomerAccount
{
userId : number =0;
name : string = "";
contact: string= "";
email: string= "";
city: string= "";
type: string = '';
profession: string= "";
gender	: string= "";
razorpay_payment_id : string= "";
razorpay_order_id	: string= "";

refererId: number=0; 
referCode	: string= "";
paymentStatus: Boolean = false;
mappingStatus: Boolean = false;
walletAmount: number =0;
  
  joinDate: string = '';
  
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor( private vendoraccountService: VendoraccountService,private loginService: LoginService,private router: Router, private route: ActivatedRoute, private msg: NzMessageService, private userService: UserService) 
  {
    
  }
  loginStatus: LoginStatus = new LoginStatus();
  customerAccount: CustomerAccount =new CustomerAccount();

  loading: Boolean = false;

  ngOnInit(): void {


    this.getLoginDetails();

   
    
  }

toWallet()
{
  this.router.navigate(['wallet']);
}

  getLoginDetails()
  {
    this.loading=true;
    this.loginService.getLoginDetails().subscribe(
      (res:any) => {
       this.loading=false;
        this.loginStatus=res;

        this.startLoading();
      },
      (err) => { this.loading=false; //this.msg.create('error','Session Expired. Please Login...');
      this.router.navigate(['login']);
      }
    );
  }

  startLoading()
  {
  this.getCustomerAccountDetails();

  var loginButton = window.document.getElementById("loginButton")
    
    if(loginButton)
    {
      loginButton.innerHTML="Logout";
      loginButton.setAttribute('href','/login');
      loginButton.setAttribute('onClick',"localStorage.removeItem('token')");
    }
    

  var heading = window.document.getElementById("displayHeader");
  
    if(heading)
    heading.innerHTML= "Account Details";
  }

  getCustomerAccountDetails()
  {
    this.loading = true;
    var formData = new FormData();
    formData.set("userId",this.loginStatus.userId);
    this.userService.getCustomerAccountDetails(formData).subscribe(

      (res: any) => { console.log(res);this.customerAccount = res; this.loading = false; },
      (err) => { console.log(err);this.loading = false; }

    );
  }

  password: string = '';
  newpassword: string = '';
  conpassword: string = '';
  editVisible=false;

  changePassword()
  {
   if(!this.loginStatus)
    {
     // this.msg.create('error', 'Session Expired. Please Login');
      this.router.navigate(['login']);
      return;
    }
    if(this.password.length >= 8 && this.newpassword.length >= 8 && this.conpassword == this.newpassword && this.loginStatus)
    {
      this.password = (shajs('sha256').update(this.password).digest('hex'));
      this.newpassword = (shajs('sha256').update(this.newpassword).digest('hex'));
      this.conpassword = (shajs('sha256').update(this.conpassword).digest('hex'));
  
      var formData = new FormData();
      formData.set("password",this.password);
      formData.set("newpassword",this.newpassword);
      formData.set("userId",this.loginStatus.userId);
      this.loading=true;
      this.editVisible=false;
      this.vendoraccountService.changePassword(formData).subscribe(
        (res) => { this.loading=false; if(res) this.msg.create('success','Password Changed.'); else this.msg.create('error','Invalid Current Password.'); console.log(res); },
        (err) => { this.loading=false; console.log(err); }
  
      );
  
    }
    else
    {
      this.msg.create('error', 'Invalid Password. Please provide Correct Password of atleast 8 characters.');
    }
  }
}
