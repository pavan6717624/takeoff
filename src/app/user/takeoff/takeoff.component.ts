import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Coupon } from 'src/app/component/editcoupons/editcoupons.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '../user.service';

export class RedemptionDTO {



  id: number = 0;


  couponId: number = 0;


  vendorId: number = 0;


  customerId: number = 0;

  passcode: string = '';


  validTill: string = '';
}


@Component({
  selector: 'app-takeoff',
  templateUrl: './takeoff.component.html',
  styleUrls: ['./takeoff.component.css']
})
export class TakeoffComponent implements OnInit {


  constructor(private router: Router, private route: ActivatedRoute, private msg: NzMessageService, private userService: UserService) { }

  @ViewChild('scrollMe') private eleRef: ElementRef = new ElementRef('') ;
  
  coupons: Coupon[] = [];


  coupon: Coupon = new Coupon();

  loading: Boolean = false;

  previewVisible = false;

  redeemVisible = false;

  redeemCoupon: Coupon = new Coupon();

  redeemChecked: Boolean = false;

  redeemLoading: Boolean = false;

  redemption: RedemptionDTO = new RedemptionDTO();


  code: string[] = [];

  bottom: Boolean = false;


    
  onWindowScroll() {
  

   
 
    var top=this.eleRef.nativeElement.scrollTop;

    var offSetHeight=this.eleRef.nativeElement.offsetHeight;

    var scrollHeight=this.eleRef.nativeElement.scrollHeight; 
 
    /*if(top === 0){
       alert('top');
    }*/
   
    if(top>scrollHeight-offSetHeight-1){
     

      this.bottom=true;

      
      if(this.couponDisplayId == 0)
    {
     
    this.getTakeOffRecommendations();
    }
    else if(this.couponDisplayId == 1)
    {
     
    this.getComplimentaryCoupons();
    }
    else if(this.couponDisplayId == 2)
    {
     
      this.getFreeCoupons();
    }
    else if(this.couponDisplayId == 3)
    {
      
      this.getDailyCoupons();
    }
  

    }
   

  //console.log(this.bottom);
}
  
  generateRedemption(couponId: number, vendorId: number) {
    this.redeemLoading = true;
    let redemption : RedemptionDTO =new RedemptionDTO();
    this.redemption=new RedemptionDTO();

    redemption.couponId = couponId;
    redemption.vendorId = vendorId;
    redemption.customerId = 10004;

    this.code[0]='';
    this.code[1]='';
    this.code[2]='';
    this.code[3]='';


    this.userService.generateRedemption(redemption).subscribe(

      (res: any) => { console.log(res); this.redemption = res; 
        this.code[0]=this.redemption.passcode.charAt(0);
        this.code[1]=this.redemption.passcode.charAt(1);
        this.code[2]=this.redemption.passcode.charAt(2);
        this.code[3]=this.redemption.passcode.charAt(3);

        this.redeemLoading = false; },
      (err) => { console.log(err); this.msg.create('error', 'Error Occured while getting Passcode...'); this.redemption = new RedemptionDTO(); this.redeemLoading = false; }
    );
  }

  customerRedeem()
  {

    let passcode: string = this.code[4]+this.code[5]+this.code[6]+this.code[7];
    if(!passcode || passcode.trim().length!=4)
    {
      this.msg.create("error", "please provide all four valid characters of passcode");
      return;
    }
   
    let passcodeVisible: string = this.redemption.passcode.charAt(0)+this.redemption.passcode.charAt(1)+this.redemption.passcode.charAt(2)+this.redemption.passcode.charAt(3);

    passcode=passcodeVisible+passcode;

    this.redemption.passcode=passcode;



    this.userService.customerRedemption(this.redemption).subscribe(

      (res: any) => {  if(res) { this.msg.create('success', 'Your Redemption is Successful.');} else {this.msg.create('error','Sorry! Your Redemption Failed.'); }  },
      (err) => { console.log(err); this.msg.create('error', 'Error Occured while accepting Passcode...'); this.redemption = new RedemptionDTO(); this.redeemLoading = false; }
    );
  }

  redeemCancel() {
    this.redeemVisible = false;
    this.redeemChecked = false;

 
  }

  viewRedemption(item: Coupon) {
    this.redeemCoupon = item;
    this.redeemVisible = true;

    this.code[4]='';
    this.code[5]='';
    this.code[6]='';
    this.code[7]='';
    
  }

  like(coupon: Coupon)
  {
    coupon.like=!coupon.like;
    if(coupon.dislike)
    coupon.dislike=!coupon.dislike;
  }

  dislike(coupon: Coupon)
  {
    coupon.dislike=!coupon.dislike;
    if(coupon.like)
    coupon.like=!coupon.like;
  }



  cancel() {
    this.previewVisible = false;
  }
  screenHeight:any=0;
  screenWidth:any=0;
  columns:any = 0;
  couponDisplayId: number = 0;
  
  ngOnInit(): void {

    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.columns = Math.ceil(12/(this.screenWidth/400));

    this.route.data.subscribe(v => this.couponDisplayId = v.couponDisplayId);

   
    console.log(this.screenHeight, this.screenWidth);

    var couponsheader = window.document.getElementById("couponsheader");

    if (couponsheader) {
      couponsheader.innerHTML = 'Takeoff Recommendations'
    }


    var heading = window.document.getElementById("displayHeader")
    
 
    
    if(this.couponDisplayId == 0)
    {
      if(heading)
      heading.innerHTML= "TakeOff Recommendations";
    this.getTakeOffRecommendations();
    }
    else if(this.couponDisplayId == 1)
    {
      if(heading)
      heading.innerHTML= "Complimentary Coupons";
    this.getComplimentaryCoupons();
    }
    else if(this.couponDisplayId == 2)
    {
      if(heading)
      heading.innerHTML= "Free Coupons";
      this.getFreeCoupons();
    }
    else if(this.couponDisplayId == 3)
    {
      if(heading)
      heading.innerHTML= "Daily Coupons";
      this.getDailyCoupons();
    }

   
  }

  getTakeOffRecommendations() {
    if(!this.bottom)
    this.loading = true;
    var formData = new FormData();


    this.userService.getTakeOffRecommendations().subscribe(

      (res: any) => {  this.coupons=this.coupons.concat(res); console.log(this.coupons);  if(!this.bottom) this.loading = false; },
      (err) => { console.log(err); this.msg.create('error', 'Could not Connect to Server...'); this.coupons = [];  if(!this.bottom) this.loading = false; }
    );
  }


  getComplimentaryCoupons() {
    if(!this.bottom)
    this.loading = true;
    var formData = new FormData();


    this.userService.getComplimentaryCoupons().subscribe(

      (res: any) => { console.log(res); this.coupons=this.coupons.concat(res); if(!this.bottom) this.loading = false; },
      (err) => { console.log(err); this.msg.create('error', 'Could not Connect to Server...'); this.coupons = []; if(!this.bottom) this.loading = false; }
    );
  }

  getFreeCoupons() {
    if(!this.bottom)
    this.loading = true;
    var formData = new FormData();


    this.userService.getFreeCoupons().subscribe(

      (res: any) => { console.log(res); this.coupons=this.coupons.concat(res); if(!this.bottom) this.loading = false; },
      (err) => { console.log(err); this.msg.create('error', 'Could not Connect to Server...'); this.coupons = []; if(!this.bottom) this.loading = false; }
    );
  }

  getDailyCoupons() {
    if(!this.bottom)
    this.loading = true;
    var formData = new FormData();


    this.userService.getDailyCoupons().subscribe(

      (res: any) => { console.log(res); this.coupons=this.coupons.concat(res); if(!this.bottom) this.loading = false; },
      (err) => { console.log(err); this.msg.create('error', 'Could not Connect to Server...'); this.coupons = []; if(!this.bottom) this.loading = false; }
    );
  }

}


