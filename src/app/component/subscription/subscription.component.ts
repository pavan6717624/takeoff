import { Component, OnInit, HostListener } from '@angular/core';
import { WindowRefService } from './window-ref.service';
import { SubscriptionService } from './subscription.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
declare var Razorpay: any;

export class SubscriptionDTO
{
  password: string = "";
 refererid: string="";
 name: string="";
 contact: string="";
 email: string="";
 profession: string="";
 gender: string="";
 city: string="";
 razorpay_payment_id: string="";
 razorpay_order_id: string="";
 razorpay_signature: string="";
 message: string="";
}

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  constructor(private router: Router, private subscriptionService: SubscriptionService,private msg: NzMessageService) { }
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
 paying: boolean=false;


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
  
 this.paying=true;
  var options = {
    "key": "rzp_test_tqgJ9eimxluVhi", // Enter the Key ID generated from the Dashboard
    "amount": "119900", 
    "currency": "INR",
    "name": "TAKEOFF",
    "description": "Subscription to TAKEOFF",
    "image": "https://thetakeoff.in/assets/images/logo-white1.png",
    "handler": function (response:any){
      var event = new CustomEvent("payment.success", 
          {
              detail: response,
              bubbles: true,
              cancelable: true
          }
      );    
      window.dispatchEvent(event);
  },
    //"callback_url": "https://takeoff-pavan.herokuapp.com/callBackUrl",
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
    },
    "modal": {
      "ondismiss": function(){
        var event = new CustomEvent("payment.closed", 
        {
            detail: "closed",
            bubbles: true,
            cancelable: true
        }
    );    
    window.dispatchEvent(event);
      }
  }

};

const rzp = new Razorpay(options);

rzp.open();

}


@HostListener('window:payment.success', ['$event']) 
onPaymentSuccess(event: any): void {
    
 var subscription = new SubscriptionDTO();
 subscription.razorpay_payment_id = event.detail.razorpay_payment_id;
 subscription.razorpay_order_id = event.detail.razorpay_order_id;
 subscription.razorpay_signature = event.detail.razorpay_signature;
 subscription.name=this.name;
 subscription.password=this.password;
 subscription.refererid=this.refererid;
 subscription.contact=this.contact;
 subscription.email=this.email;
 subscription.profession=this.profession;
 subscription.gender=this.gender;
 subscription.city=this.city;

 this.subscriptionService.getSubscription(subscription).subscribe(
  (res) => {     this.router.navigate(['paymentStatus'],  { state: {statusDTO: res }}); },
  (err) => {this.router.navigate(['paymentStatus'],  { state: {status: 'false', orderid: subscription.razorpay_order_id }});}
 
   );    
}


@HostListener('window:payment.closed', ['$event']) 
onPaymentClosed(event: any): void {
    this.paying=false;
}
getOrderId()
{
  this.subscriptionService.getOrderId().subscribe(
 (res) => { this.orderid = res.orderId; console.log(this.orderid);},
 (err) => {this.msg.create("error","Error Occured at Sever...")}

  );
}

}
