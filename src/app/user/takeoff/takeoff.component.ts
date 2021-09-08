import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Coupon } from 'src/app/component/editcoupons/editcoupons.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '../user.service';
import { LoginStatus } from 'src/app/component/login/login.component';
import { LoginService } from 'src/app/component/login/login.service';

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

  loginStatus: LoginStatus = new LoginStatus();

  userType: string = '';


  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute, private msg: NzMessageService, private userService: UserService) 
  {

    const navigation = this.router.getCurrentNavigation();
    this.loginStatus =  (navigation?.extras?.state?.loginStatus); 

    if(this.loginStatus)
    {
      this.userType=this.loginStatus.userType;
      this.startLoading();
    }
    else
    {
      this.getLoginDetails();
      
    }
    console.log("customer login Status :: "+this.loginStatus);

   }


   getLoginDetails()
   {
     this.loading=true;
     this.loginService.getLoginDetails().subscribe(
       (res:any) => {
        this.loading=false;
         this.loginStatus=res;
 
         this.startLoading();
       },
       (err) => { this.loading=false; this.msg.create('error','Session Expired. Please Login...');
       this.router.navigate(['login']);
       }
     );
   }

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

    else if(this.couponDisplayId == 4)
    {
      
      this.getLimitedCoupons();
    }

    else if(this.couponDisplayId == 5)
    {
      
      this.getRedeemableCoupons();
    }

    else if(this.couponDisplayId == 6)
    {
      
      this.getDiscountCoupons();
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
    redemption.customerId = Number(this.loginStatus.userId);

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
    this.redeemLoading = true;
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

      (res: any) => { this.redeemCancel(); if(res) { this.redeemLoading = false;this.redeemCoupon.redemptionCount+=1; this.msg.create('success', 'Your Redemption is Successful.');} else {this.msg.create('error','Sorry! Your Redemption Failed.'); }  },
      (err) => { this.redeemLoading = false; console.log(err); this.msg.create('error', 'Error Occured while accepting Passcode...'); this.redemption = new RedemptionDTO(); this.redeemLoading = false; }
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

  async like(coupon: Coupon)
  {
    if(coupon.likeLoading)
    return;
    
    coupon.likeLoading=true;
    coupon.likeCoupon=!coupon.likeCoupon;
    if(coupon.disLikeCoupon)
    {
      coupon.disLikeCoupon=!coupon.disLikeCoupon;
      coupon.dislikeCount-=1;
    }

    if(coupon.likeCoupon)
    coupon.likeCount+=1;
    else
    coupon.likeCount-=1;

    var formData = new FormData();

    formData.set("couponId",coupon.id+"");
    formData.set("userId",this.loginStatus.userId);
    formData.set("like",coupon.likeCoupon+"")

    

    this.userService.likeCoupon(formData).then(() => coupon.likeLoading=false);

  }

  async dislike(coupon: Coupon)
  {
    if(coupon.likeLoading)
    return;

    coupon.likeLoading=true;





    coupon.disLikeCoupon=!coupon.disLikeCoupon;
    if(coupon.likeCoupon)
    {
      coupon.likeCoupon=!coupon.likeCoupon;
      coupon.likeCount-=1;
    }

    if(coupon.disLikeCoupon)
    coupon.dislikeCount+=1;
    else
    coupon.dislikeCount-=1;

    var formData = new FormData();

    formData.set("couponId",coupon.id+"");
    formData.set("userId",this.loginStatus.userId);
    formData.set("dislike",coupon.disLikeCoupon+"");

    

    this.userService.disLikeCoupon(formData).then((res) => coupon.likeLoading=false);
  }



  cancel() {
    this.previewVisible = false;
  }
  screenHeight:any=0;
  screenWidth:any=0;
  columns:any = 0;
  couponDisplayId: number = 0;
  
  ngOnInit(): void {

    

   
  }


  startLoading()
  {
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
    
    var loginButton = window.document.getElementById("loginButton")
    
    if(loginButton)
    {
      loginButton.innerHTML="Logout";
      loginButton.setAttribute('href','/login');
      loginButton.setAttribute('onClick',"localStorage.removeItem('token')");
    }
    
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

    else if(this.couponDisplayId == 3)
    {
      if(heading)
      heading.innerHTML= "Daily Coupons";
      this.getDailyCoupons();
    }

    else if(this.couponDisplayId == 3)
    {
      if(heading)
      heading.innerHTML= "Daily Coupons";
      this.getDailyCoupons();
    }

    else if(this.couponDisplayId == 3)
    {
      if(heading)
      heading.innerHTML= "Daily Coupons";
      this.getDailyCoupons();
    }

    else if(this.couponDisplayId == 4)
    {
      if(heading)
      heading.innerHTML= "Limited Coupons"; 
      this.getLimitedCoupons();
    }

    else if(this.couponDisplayId == 5)
    {
      if(heading)
      heading.innerHTML= "Redeemable Coupons";
      this.getRedeemableCoupons();
    }

    else if(this.couponDisplayId == 6)
    {
      if(heading)
      heading.innerHTML= "Discount Coupons";
      this.getDiscountCoupons();
    }
  }

  getTakeOffRecommendations() {
    if(!this.bottom)
    this.loading = true;
    var formData = new FormData();
    formData.set("userId",this.loginStatus.userId)

    this.userService.getTakeOffRecommendations(formData).subscribe(

      (res: any) => {  this.coupons=this.coupons.concat(res); console.log(this.coupons);  if(!this.bottom) this.loading = false; },
      (err) => { console.log(err); this.msg.create('error', 'Could not Connect to Server...'); this.coupons = [];  if(!this.bottom) this.loading = false; }
    );
  }


  getComplimentaryCoupons() {
    if(!this.bottom)
    this.loading = true;
    var formData = new FormData();

    formData.set("userId",this.loginStatus.userId)

    this.userService.getComplimentaryCoupons(formData).subscribe(

      (res: any) => { console.log(res); this.coupons=this.coupons.concat(res); if(!this.bottom) this.loading = false; },
      (err) => { console.log(err); this.msg.create('error', 'Could not Connect to Server...'); this.coupons = []; if(!this.bottom) this.loading = false; }
    );
  }

  getFreeCoupons() {
    if(!this.bottom)
    this.loading = true;
    var formData = new FormData();
    formData.set("userId",this.loginStatus.userId)


    this.userService.getFreeCoupons(formData).subscribe(

      (res: any) => { console.log(res); this.coupons=this.coupons.concat(res); if(!this.bottom) this.loading = false; },
      (err) => { console.log(err); this.msg.create('error', 'Could not Connect to Server...'); this.coupons = []; if(!this.bottom) this.loading = false; }
    );
  }

  getDailyCoupons() {
    if(!this.bottom)
    this.loading = true;
    var formData = new FormData();
    formData.set("userId",this.loginStatus.userId)


    this.userService.getDailyCoupons(formData).subscribe(

      (res: any) => { console.log(res); this.coupons=this.coupons.concat(res); if(!this.bottom) this.loading = false; },
      (err) => { console.log(err); this.msg.create('error', 'Could not Connect to Server...'); this.coupons = []; if(!this.bottom) this.loading = false; }
    );
  }

  getLimitedCoupons() {
    if(!this.bottom)
    this.loading = true;
    var formData = new FormData();

    formData.set("userId",this.loginStatus.userId)

    this.userService.getLimitedCoupons(formData).subscribe(

      (res: any) => { console.log(res); this.coupons=this.coupons.concat(res); if(!this.bottom) this.loading = false; },
      (err) => { console.log(err); this.msg.create('error', 'Could not Connect to Server...'); this.coupons = []; if(!this.bottom) this.loading = false; }
    );
  }

  
  getRedeemableCoupons() {
    if(!this.bottom)
    this.loading = true;
    var formData = new FormData();
    formData.set("userId",this.loginStatus.userId)


    this.userService.getRedeemableCoupons(formData).subscribe(

      (res: any) => { console.log(res); this.coupons=this.coupons.concat(res); if(!this.bottom) this.loading = false; },
      (err) => { console.log(err); this.msg.create('error', 'Could not Connect to Server...'); this.coupons = []; if(!this.bottom) this.loading = false; }
    );
  }

  getDiscountCoupons() {
    if(!this.bottom)
    this.loading = true;
    var formData = new FormData();
    formData.set("userId",this.loginStatus.userId)

    this.userService.getDiscountCoupons(formData).subscribe(

      (res: any) => { console.log(res); this.coupons=this.coupons.concat(res); if(!this.bottom) this.loading = false; },
      (err) => { console.log(err); this.msg.create('error', 'Could not Connect to Server...'); this.coupons = []; if(!this.bottom) this.loading = false; }
    );
  }

}


