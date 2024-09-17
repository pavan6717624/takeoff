import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SubscriptionService } from 'src/app/component/subscription/subscription.service';
import { CustomerAccount } from 'src/app/user/account/account.component';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(private adminService: AdminService, private msg: NzMessageService, private subService: SubscriptionService) { }

  customerDetails: CustomerAccount[] = [];

  ngOnInit(): void {
    this.getAllCustomerAccountDetails();
  }
  customerAdd = false;
  loading = false;
  JSON: any=JSON;
  customers: string = '';
  successCustomers: string[] = [];
  failedCustomers: string[] = [];
  createCustomerData: string = '';

  emailEditVisible = false;
  emailUserId = 0;
  userEmail = "";
  editFun() {
    var formData = new FormData();
    formData.set("email", this.userEmail);
    formData.set("userId", this.emailUserId + "");
    this.emailEditVisible = false;
    const id = this.msg.loading('Email Change in progress..', { nzDuration: 0 }).messageId;


    this.adminService.emailChange(formData).subscribe(
      (res: any) => {
        console.log(res);

        if (res) {
          this.msg.remove(id); this.msg.success("Email changed Succesfully.");
          this.ngOnInit();
        }
        else {
          this.msg.remove(id); this.msg.create('error', 'Error Occured at Server. Please try again.');
        }

      },
      (err) => { this.msg.remove(id); console.log(err); this.msg.create('error', 'Error Occured at Server. Please try again.'); }

    );

  }

  emailChange(userId: number, email: string) {
    this.emailUserId = userId;
    this.userEmail = email;
    this.emailEditVisible = true;
  }

  creating:Boolean =false;
  numbers : string[]=[];
  createCustomers() {
    this.successCustomers = [];
    this.failedCustomers = [];
    this.creating=true;
    this.createCustomerData = this.customers;
    this.customers = '';
    var data = this.createCustomerData.split(",")
    console.log(this.createCustomerData);


    var separators = [' ', ',', '\n'];

     this.numbers = this.createCustomerData.split(new RegExp(separators.join('|'), 'g'));
    for (var i = 0; i < this.numbers.length; i++)
      if (this.numbers[i].trim().length >= 10) {
        var number = this.numbers[i].trim()
        this.customerCreate(number);


        console.log(this.numbers[i].trim() + "\n");
      }
      else
        this.failedCustomers.push(this.numbers[i].trim());

      this.checkCreate();

  }

  customerCreate(number: any) {

    console.log("Number is "+number);
  
    var formData = new FormData();
    formData.set("mobileNumber", number);
    formData.set("email", number + "@gmail.com");

    this.subService.checkCustomerDetails(formData).subscribe(
      (result: any) => {
        console.log(number + " " + result.status);
        if (result.status) {
          var payload = {
            "password": number + "",
            "refererid": "TO100067",
            "name": number + "",
        "contact": number + "",
            "email": number + "@gmail.com",
            "profession": "Student",
            "gender": "Male",
            "city": "Tirupati",
            "razorpay_payment_id": "",
            "razorpay_order_id": "",
            "razorpay_signature": "",
            "message": "",
            "executiveId": "",
            "subscription": "Free"
          }
          
          this.subService.getSubscription(payload).subscribe(
            (result: any) => { this.successCustomers.push(number);  this.checkCreate(); console.log(result) },
            (error: any) => {  this.failedCustomers.push(number); this.checkCreate();  console.log(error); },
            
          );
        } else { this.failedCustomers.push(number);  this.checkCreate(); console.log("cant create.."+this.failedCustomers+" "+number); }
      },
      (error: any) => { this.failedCustomers.push(number);  this.checkCreate(); console.log(error);  }
    );


    console.log(number + "  is logging");

  }
  checkCreate()
{
  console.log(this.successCustomers.length+" "+this.failedCustomers.length +" "+this.numbers.length)
  if((this.successCustomers.length+this.failedCustomers.length) === this.numbers.length) 
  this.creating=false;
}
  addCustomerView() {
    this.customerAdd = true;
    this.customers = '';
  }

  getAllCustomerAccountDetails() {
    this.loading = true;
    this.adminService.getAllCustomerAccountDetails().subscribe(
      (res: any) => { console.log(res); this.customerDetails = res; this.loading = false; },
      (err) => { console.log(err); this.msg.create('error', 'Error Occured at Server. Please try again.'); this.loading = false; }

    );
  }

}
