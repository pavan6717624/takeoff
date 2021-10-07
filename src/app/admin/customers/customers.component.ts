import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomerAccount } from 'src/app/user/account/account.component';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(private adminService: AdminService, private msg: NzMessageService) { }

  customerDetails: CustomerAccount[]=[];

  ngOnInit(): void {
    this.getAllCustomerAccountDetails();
  }

  loading=false;

  getAllCustomerAccountDetails()
  {
    this.loading=true;
    this.adminService.getAllCustomerAccountDetails().subscribe(
      (res : any) => { console.log(res);   this.customerDetails = res; this.loading=false;},
      (err) => { console.log(err); this.msg.create('error','Error Occured at Server. Please try again.'); this.loading=false;}
     
       );
  }

}
