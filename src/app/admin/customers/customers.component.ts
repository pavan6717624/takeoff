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

  emailEditVisible=false;
  emailUserId=0;
  userEmail = "";
  editFun()
  {
      var formData=new FormData();
      formData.set("email",this.userEmail);
      formData.set("userId",this.emailUserId+"");
      this.emailEditVisible=false;
      const id = this.msg.loading('Email Change in progress..', { nzDuration: 0 }).messageId;
   

      this.adminService.emailChange(formData).subscribe(
        (res : any) => { console.log(res);
          
          if(res)
          {
          this.msg.remove(id); this.msg.success("Email changed Succesfully.");
          this.ngOnInit();
        }
        else
        {
          this.msg.remove(id); this.msg.create('error','Error Occured at Server. Please try again.'); 
        }
      
      },
        (err) => { this.msg.remove(id); console.log(err); this.msg.create('error','Error Occured at Server. Please try again.'); }
      
         );

  }

  emailChange(userId:number, email: string)
  {
    this.emailUserId=userId;
    this.userEmail=email;
    this.emailEditVisible=true;

    

  }

  getAllCustomerAccountDetails()
  {
    this.loading=true;
    this.adminService.getAllCustomerAccountDetails().subscribe(
      (res : any) => { console.log(res);   this.customerDetails = res; this.loading=false;},
      (err) => { console.log(err); this.msg.create('error','Error Occured at Server. Please try again.'); this.loading=false;}
     
       );
  }

}
