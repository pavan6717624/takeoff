import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

import { LoginService } from 'src/app/component/login/login.service';
import { UserService } from 'src/app/user/user.service';
import { KYCDetails } from 'src/app/user/wallet/wallet.component';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-update-kyc',
  templateUrl: './update-kyc.component.html',
  styleUrls: ['./update-kyc.component.css']
})
export class UpdateKycComponent implements OnInit {

  constructor(private adminService: AdminService, private loginService: LoginService, private router: Router, private route: ActivatedRoute, private msg: NzMessageService, private userService: UserService) 
  {
  } 


  loading = false;

  time: string[] = [];

  creditDate: Date = new Date();
  creditTime: string = (this.creditDate.getHours()<10?'0'+this.creditDate.getHours: this.creditDate.getHours()) + ":" + (this.creditDate.getMinutes() < 10 ? '0'+this.creditDate.getMinutes() : this.creditDate.getMinutes());
  credit : number = 0;

  ngOnInit(): void {

    this.getKYCDetails();

    for (var i = 0; i < 24; i++)
    for (var j = 0; j < 60; j++) {
      var time = '';
      if (i < 10)
        time += '0' + i;
      else
        time += i;

      var time1 = '';
      if (j < 10)
        time1 += '0' + j;
      else
        time1 += j;

      this.time.push(time + ":" + time1);
    }



  }


  resetPayValues()
  {
  this.creditDate = new Date();
  this.creditTime = (this.creditDate.getHours()<10?'0'+this.creditDate.getHours: this.creditDate.getHours()) + ":" + (this.creditDate.getMinutes() < 10 ? '0'+this.creditDate.getMinutes() : this.creditDate.getMinutes());
  this.credit = 0;
  }

  previewVisible = false;

  kycDetails: KYCDetails[] = [];

  previewImage: string = '';

  payVisible = false;

  selectedKyc: KYCDetails = new KYCDetails();

  selectedId: number = 0;

  crediting= false;

  creditAmount()
{
  if(Number(this.credit) <=0)
  {
    this.msg.create('error', 'Please Provide Valid Credit Amount');
    return;
  }
  else if(Number(this.credit) > this.kycDetails[this.selectedId].walletAmount)
  {
  this.msg.create('error', 'Cannot Credit more than the Wallet Amount');
  return;
  }
 
  this.crediting=true;
  var formData = new FormData();
  var datePipe = new DatePipe('en-US');
  let creditDate = datePipe.transform(new Date(this.creditDate), 'yyyy-MM-dd');

  formData.set("customerId", this.selectedKyc.customerId+"");
  formData.set("creditAmount", this.credit+"");
  formData.set("creditDate",creditDate+" "+this.creditTime);
  

  this.adminService.creditAmount(formData).subscribe(
    (res : any) => { console.log(res); this.payVisible=false; this.kycDetails[this.selectedId]=res; this.msg.create('info',this.kycDetails[this.selectedId].message); this.crediting=false;},
    (err) => { console.log(err); this.msg.create('success','Error Occured at Server. Please try again.'); this.crediting=false;}
   
     );

}

  getKYCDetails()
  {
    this.loading=true;
    this.userService.getKYCDetails().subscribe(
      (res : any) => { console.log(res); this.kycDetails=res; this.loading=false;},
      (err) => { console.log(err); this.msg.create('success','Error Occured at Server. Please try again.'); this.loading=false;}
     
       );
  }

  verifyPanStatus(id: number, customerId: number, status: string)
  {
    this.loading=true;
    var formData = new FormData();
    formData.set("customerId", customerId+"");
    formData.set("status",status);

    this.adminService.verifyPanStatus(formData).subscribe(
      (res : any) => { console.log(res); this.kycDetails[id]=res; this.loading=false;},
      (err) => { console.log(err); this.msg.create('success','Error Occured at Server. Please try again.'); this.loading=false;}
     
       );
  }

  verifyKycStatus(id: number, customerId: number, status: string)
  {
    this.loading=true;

    var formData = new FormData();
    formData.set("customerId", customerId+"");
    formData.set("status",status);

    this.adminService.verifyKycStatus(formData).subscribe(
      (res : any) => { console.log(res); this.kycDetails[id]=res; this.loading=false;},
      (err) => { console.log(err); this.msg.create('success','Error Occured at Server. Please try again.'); this.loading=false;}
     
       );
  }


}
