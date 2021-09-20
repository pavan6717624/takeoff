import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '../user.service';
import { LoginService } from 'src/app/component/login/login.service';
import { LoginStatus } from 'src/app/component/login/login.component';

export class KYCDetails
{
  id: number = 0;
  customerId: number = 0;
  name: string = '';
  contact: number = 0;
  pan: string = '';
  cname: string = '';
  bname: string = '';
  ifsc: string = '';
  account: string = '';
  walletAmount: number = 0;
  referals: number = 0;
  panStatus: string= '';
  kycStatus: string = '';
}

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})

export class WalletComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute, private msg: NzMessageService, private userService: UserService) { 

  this.getLoginDetails();

  }

  loading: Boolean = false;

  ngOnInit(): void {

    var loginButton = window.document.getElementById("loginButton")
    
    if(loginButton)
    {
      loginButton.innerHTML="Logout";
      loginButton.setAttribute('href','/login');
      loginButton.setAttribute('onClick',"localStorage.removeItem('token')");
    }
    
    var couponsheader = window.document.getElementById("displayHeader");

    if (couponsheader) {
      couponsheader.innerHTML = 'Wallet Amount'
    }

    
  }

  kycDetails: KYCDetails = new KYCDetails();

  getKYCDetails()
  {
    this.loading=true;
    this.userService.getKYCDetails().subscribe(
      (res : any) => { console.log(res); this.kycDetails=res[0]; if(!this.kycDetails) this.kycDetails = new KYCDetails(); this.loading=false;},
      (err) => { console.log(err); this.msg.create('success','Error Occured at Server. Please try again.'); this.loading=false;}
     
       );
  }

  loginStatus: LoginStatus = new LoginStatus();
  
  getLoginDetails() {
    this.loading = true;
    this.loginService.getLoginDetails().subscribe(
      (res: any) => {
        this.loading = false;
        this.loginStatus = res;

      this.getKYCDetails();
      },
      (err) => {
        this.loading = false; this.msg.create('error', 'Session Expired. Please Login...');
        this.router.navigate(['login']);
      }
    );
  }
 
  updatePAN()
  {
    if(!this.kycDetails.pan || this.kycDetails.pan.trim().length ==0 )
{
  this.msg.create('success', 'Please provide PAN Details..')
  return;
}
    var formData = new FormData();
    formData.set("pan",this.kycDetails.pan);

    this.loading=true;
    this.userService.updatePan(formData).subscribe(
      (res : any) => { console.log(res);  this.kycDetails = res; this.loading=false;},
      (err) => { console.log(err); this.msg.create('success','Error Occured at Server. Please try again.'); this.loading=false;}
     
       );
  }

  updateKYC()
  {
    // this.msg.create("info","In Development. Will Inform you Soon on Updates");
    // if(1==1)
    // return;

    if(!this.kycDetails.cname || !this.kycDetails.bname || !this.kycDetails.account || !this.kycDetails.ifsc || 
      this.kycDetails.cname.trim().length ==0 || this.kycDetails.bname.trim().length ==0 || this.kycDetails.account.trim().length ==0 || this.kycDetails.ifsc.trim().length ==0)
{
  this.msg.create('success', 'Please provide Full KYC Details..')
  return;
}
    var formData = new FormData();
  
    formData.set("cname",this.kycDetails.cname);
    formData.set("bname",this.kycDetails.bname);
    formData.set("account", this.kycDetails.account);
    formData.set("ifsc", this.kycDetails.ifsc);

    this.loading=true;
    this.userService.updateKYC(formData).subscribe(
      (res : any) => { console.log(res);   this.kycDetails = res; this.loading=false;},
      (err) => { console.log(err); this.msg.create('success','Error Occured at Server. Please try again.'); this.loading=false;}
     
       );


  }

}
