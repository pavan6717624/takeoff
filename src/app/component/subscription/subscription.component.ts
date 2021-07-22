import { Component, OnInit } from '@angular/core';
import { WindowRefService } from './window-ref.service';
import { SubscriptionService } from './subscription.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  constructor(private winRef: WindowRefService, private subscriptionService: SubscriptionService,private msg: NzMessageService) { }
 orderid: string = "";
 refererIdStatus: boolean = false;
 refererStatus : string = "";
 password: string = "";
 conpassword: string = "";
 refererid: string="";
 name: string="";
 contact: string="";
 email: string="";
 profession: string="";
 gender: string="";
 city: string="";
 paymentStatus: string="";


  ngOnInit(): void {

    this.getOrderId();
  }


  checkRefererId()
  {
    this.refererStatus = "loading";
    var formData = new FormData();
    formData.set("refererid",this.refererid)
    this.subscriptionService.checkRefererId(formData).subscribe(
      (res) => {  this.refererIdStatus = res.status; 

       if( this.refererIdStatus)
       this.refererStatus = "check";
       else
       this.refererStatus = "close";

      console.log(res);
      },
      (err) => {this.refererStatus = "stop"; console.log(err);this.msg.create("error","Error Occured at Sever...")}
     
       );
  }

payment()
{
  alert(this.orderid);
  var options = {
    "key": "rzp_test_tqgJ9eimxluVhi", // Enter the Key ID generated from the Dashboard
    "amount": "119900", 
    "currency": "INR",
    "name": "TAKEOFF",
    "description": "Subscription to TAKEOFF",
    "image": "https://thetakeoff.in/assets/images/logo-white1.png",
    //"callback_url": "http://localhost:8081/callBackUrl",
    "callback_url": "https://takeoff-pavan.herokuapp.com/callBackUrl",
   "order_id": this.orderid,
   
    "prefill": {
        "name": this.name,
        "email": this.email,
        "contact": this.contact
          },
    "notes": {
        "address": "TakeOff Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }


};

const rzp = new this.winRef.nativeWindow.Razorpay(options);
rzp.open();

}

getOrderId()
{
  this.subscriptionService.getOrderId().subscribe(
 (res) => { this.orderid = res.orderId; console.log(this.orderid);},
 (err) => {this.msg.create("error","Error Occured at Sever...")}

  );
}

}
