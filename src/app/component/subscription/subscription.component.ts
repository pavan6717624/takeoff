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
  ngOnInit(): void {

    this.getOrderId();
  }
payment()
{
  var options = {
    "key": "rzp_test_tqgJ9eimxluVhi", // Enter the Key ID generated from the Dashboard
    "amount": "119900", 
    "currency": "INR",
    "name": "TAKEOFF",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
   "order_id": this.orderid,
   
    "prefill": {
        "name": "adsfadsfadsf",
        "email": "adsfasdf",
        "contact": "asdfasdf"
          },
    "notes": {
        "address": "Razorpay Corporate Office"
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
 (res) => { this.orderid = res.id;},
 (err) => {this.msg.create("error","Error Occured at Sever...")}

  );
}

}
