import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/user/user.service';

export class CustomerAccount
{
userId : number =0;
name : string = "";
contact: string= "";
email: string= "";
city: string= "";

profession: string= "";
gender	: string= "";
razorpay_payment_id : string= "";
razorpay_order_id	: string= "";

refererId: number=0; 
referCode	: string= "";
paymentStatus: Boolean = false;
mappingStatus: Boolean = false;
walletAmount: number =0;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private msg: NzMessageService, private userService: UserService) 
  {
    
  }

  customerAccount: CustomerAccount =new CustomerAccount();

  loading: Boolean = false;

  ngOnInit(): void {

    this.getCustomerAccountDetails();

    var heading = window.document.getElementById("displayHeader");
    
      if(heading)
      heading.innerHTML= "Account Details";
    
  }

  getCustomerAccountDetails()
  {
    this.loading = true;
    var formData = new FormData();
    formData.set("userId","10004");
    this.userService.getCustomerAccountDetails(formData).subscribe(

      (res: any) => { console.log(res);this.customerAccount = res; this.loading = false; },
      (err) => { console.log(err);this.loading = false; }

    );
  }

}
