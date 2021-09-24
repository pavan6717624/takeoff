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
  creditTime: string = this.creditDate.getHours() + ":" + this.creditDate.getMinutes();
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


  previewVisible = false;

  kycDetails: KYCDetails[] = [];

  previewImage: string = '';

  payVisible = false;

  selectedKyc: KYCDetails = new KYCDetails();


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
