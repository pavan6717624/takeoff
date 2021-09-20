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
  walletAmount: number = 0;
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
    
  }

  kycDetails: KYCDetails = new KYCDetails();

  getKYCDetails()
  {
    this.userService.getKYCDetails().subscribe(
      (res) => { console.log(res);},
      (err) => { console.log(err);}
     
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
 
  updateKYC()
  {
    this.msg.create("info","In Development. Will Inform you Soon on Updates");
    if(1==1)
    return;
    var formData = new FormData();
    formData.set("pan",this.kycDetails.pan);
    formData.set("bname",this.kycDetails.bname);

  }

}
