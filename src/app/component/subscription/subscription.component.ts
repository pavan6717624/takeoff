import { Component, OnInit, HostListener, Input } from '@angular/core';
import { WindowRefService } from './window-ref.service';
import { SubscriptionService } from './subscription.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router, ActivatedRoute } from '@angular/router';
import * as shajs from 'sha.js';
import { NzNotificationService } from 'ng-zorro-antd/notification';
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
 executiveId: string = '';
 subscription: string = '';
}

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router, private subscriptionService: SubscriptionService,private msg: NzMessageService,private notification: NzNotificationService) { 


    this.route.data.subscribe(v => this.subscription = v.subscription);
  }

  subscription : string = "Pay";
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
 noReferralCodeVisible=false;
 loading = false;
 @Input() executiveId: string | undefined ;

  ngOnInit(): void {

    this.recordHits();

    if(this.executiveId == null || this.executiveId == undefined || this.executiveId.trim() === '' || this.executiveId.trim().length == 0)
    localStorage.removeItem("token");

    this.getOrderId();
    
  }

  recordHits()
  {
   var formData =  new FormData();
   var referer = document.referrer;

   if(referer == null || referer === null || referer == undefined || referer === undefined)
   referer = "";

   formData.set("referer",referer);

    this.subscriptionService.recordHits(formData).subscribe(

      (res) => { console.log(res);},
      (err) => { console.log(err);}

    );


  }

  noReferralCode()
  {
    this.noReferralCodeVisible=true;
  }

  confirmContacts = false;

  getContacts()
  {
    
    var provided=false;

    var name1='',name2='',name3='',contact1='',contact2='',contact3='';
    
    
    if(this.name1.trim().length > 0 || this.contact1.trim().length > 0)
    {
    if(this.name1.trim().length > 0 && this.contact1.trim().length == 10)
    {
    name1 = this.name1;
    contact1 = this.contact1;
    provided=true;
    }
    else
    {
      this.msg.create('info', 'Please Provide Valid Information of Your First Friend.');
      return;
    }
    }

    if(this.name2.trim().length > 0 || this.contact2.trim().length > 0)
    {
    if(this.name2.trim().length > 0 && this.contact2.trim().length == 10)
    {
      name2 = this.name2;
      contact2 = this.contact2;
      provided=true;  
    }
    else
    {
      this.msg.create('info', 'Please Provide Valid Information of Your Second Friend.');
      return;
    }
    }


    if(this.name3.trim().length > 0 || this.contact3.trim().length > 0)
    {
    if(this.name3.trim().length > 0 && this.contact3.trim().length == 10)
    {
      name3 = this.name3;
    contact3 = this.contact3;
    provided=true;  
    }
    else
    {
      this.msg.create('info', 'Please Provide Valid Information of Your Third Friend.');
      return;
    }
    }

    if(!provided)
    {
      this.msg.create('info', 'Please Share Atleast One Contact Details of your Friends.');
      return;
    }
    
    var formData = new FormData();

    formData.set("name1",name1);
    formData.set("name2",name2);
    formData.set("name3",name3);
    formData.set("contact1",contact1);
    formData.set("contact2",contact2);
    formData.set("contact3",contact3);

    
this.loading=true;
    this.subscriptionService.addContacts(formData).subscribe(
      (res: any) => { this.refererid = res.refererid; this.checkRefererId(); this.confirmContacts=true; this.noReferralCodeVisible=false; this.notification.create('success','Congratulations...','Referral Code:'+this.refererid+' activated.<br/> Continue with your Subscription.<br/>Enjoy the Experience of TakeOff.',{ nzDuration: 0 }); console.log(this.refererid); this.loading=false;},
      (err) => {this.msg.create("error","Error Occured at Sever...");  this.loading=false;}
     
       );



  }

  name1: string = '';
  contact1: string = '';

  name2: string = '';
  contact2: string = '';
  
  name3: string = '';
  contact3: string = '';
  
    check(val: any)
  {
    let isnum = /^\d+$/.test(val);
    return isnum;
  }
  
  async checkRefererId()
  {
    this.refererStatus = "loading";
    var formData = new FormData();
    formData.set("refererid",this.refererid)
    await this.subscriptionService.checkRefererId(formData).then(
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
 
  if(this.orderid == undefined || null || '')
  {
    this.msg.create("error","No Server Connection ..Please try again...");
    return;
  }
 this.paying=true;
  var options = {
   // "key": "rzp_test_WJFhmfMmFRxETB", // Enter the Key ID generated from the Dashboard
   "key": "rzp_live_nWA6UVrzTQFr9W",
   // "amount": "100", 
   // "amount" : 119900,
    "amount" : 99900,
    "currency": "INR",
    "name": "TAKEOFF",
    "description": "Subscription to TAKEOFF",
    "image": "https://thetakeoff.in/assets/img/logo-white.png",
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
 subscription.subscription='Pay';
 if(this.executiveId)
 subscription.executiveId=this.executiveId;
 else
 subscription.executiveId='';

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
  if(this.subscription === 'Pay')
{
  this.subscriptionService.getOrderId().subscribe(
 (res) => { this.orderid = res.orderId; console.log(this.orderid);},
 (err) => {this.msg.create("error","Error Occured at Sever...")}

  );
}
}


freeSubscription()
{
  this.paying=true;
  var subscription = new SubscriptionDTO();
  subscription.name=this.name;
  subscription.password=this.password;
  subscription.refererid=this.refererid;
  subscription.contact=this.contact;
  subscription.email=this.email;
  subscription.profession=this.profession;
  subscription.gender=this.gender;
  subscription.city=this.city;
  subscription.subscription='Free';
  if(this.executiveId)
  subscription.executiveId=this.executiveId;
  else
  subscription.executiveId='';
 
  this.subscriptionService.getSubscription(subscription).subscribe(
   (res) => {  this.paying=false;    this.router.navigate(['paymentStatus'],  { state: {statusDTO: res }}); },
   (err) => {this.paying=false; this.router.navigate(['paymentStatus'],  { state: {status: 'false', orderid: 404 }});}
  
    );    
}

}
