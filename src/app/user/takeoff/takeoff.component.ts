import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Coupon } from 'src/app/component/editcoupons/editcoupons.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '../user.service';
import { LoginStatus } from 'src/app/component/login/login.component';
import { LoginService } from 'src/app/component/login/login.service';
import { Category, SubCategory } from 'src/app/component/uploadcoupons/uploadcoupons.component';
import { UploadcouponsService } from 'src/app/component/uploadcoupons/uploadcoupons.service';
import { AdminService } from 'src/app/admin/admin.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

export class RedemptionDTO {



  id: number = 0;


  couponId: number = 0;


  vendorId: number = 0;


  customerId: number = 0;

  passcode: string = '';


  validTill: string = '';

  status: Boolean = true;

  message: string = '';
}

export class SendCouponsRequest {
  userId: number = 0;
  couponIds: number[] = [];
  category: number = 0;
  subCategory: number = 0;
  keywords: string = '';
  city: string = '';
  vendorSelected: number = 0;


}

export class VendorList
{
  userId: number = 0;
  name: string = '';
  address: string = '';
}

@Component({
  selector: 'app-takeoff',
  templateUrl: './takeoff.component.html',
  styleUrls: ['./takeoff.component.css']
})
export class TakeoffComponent implements OnInit {

  loginStatus: LoginStatus = new LoginStatus();

  userType: string = '';

  noMoreImages: Boolean = false;
  offsetTop = 150;

  filterVisible = false;

  constructor(private notification: NzNotificationService,private modal: NzModalService,private uploadcouponsService: UploadcouponsService, private adminServie: AdminService, private loginService: LoginService, private router: Router, private route: ActivatedRoute, private msg: NzMessageService, private userService: UserService) {

    const navigation = this.router.getCurrentNavigation();
    this.loginStatus = (navigation?.extras?.state?.loginStatus);

    if (this.loginStatus) {
      this.userType = this.loginStatus.userType;
      
      if(this.userType!='Customer')
      {
        this.msg.create('info', 'Logging in...');
        this.router.navigate(['login']);
        return;
      }
      this.startLoading();
    }
    else {
      this.getLoginDetails();

    }
    console.log("customer login Status :: " + this.loginStatus);

  }

  
  visitStore(vendorId: number)
  {
    this.vendorSelected=vendorId;
   this.filterCoupons();
  }

  getLoginDetails() {
    this.loading = true;
    this.loginService.getLoginDetails().subscribe(
      (res: any) => {
        this.loading = false;
        this.loginStatus = res;
        if(this.userType!='Customer')
        {
          this.msg.create('info', 'Logging in...');
          this.router.navigate(['login']);
          return;
        }
        else
        this.startLoading();
      },
      (err) => {
        this.loading = false; this.msg.create('error', 'Session Expired. Please Login...');
        this.router.navigate(['login']);
      }
    );
  }


  qrResultString: string = '';

  clearResult(): void {
    this.qrResultString = '';
  }
 
  onCodeResult(resultString: string) {
    this.qrResultString = resultString;

 
    this.sendRedemptionCode();


  }

  @ViewChild('scrollMe') private eleRef: ElementRef = new ElementRef('');

  @ViewChild('scanner') private eleRefScan: ElementRef = new ElementRef('');

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
  
    showAddress(item:Coupon)
  {
    this.modal.info({
      nzTitle: 'Location of '+item.vendorName,
      nzContent: '<p>'+item.address+'<br/>Mobile: '+item.contact+'</p>',
      nzMaskClosable: true,
    });
  }

  downloading: Boolean = false;

downloadCoupon(item:Coupon)
  {

    item.download=true;

    var formData= new FormData();
    formData.set('couponId',item.id+"")
    this.userService.downloadCoupon(formData).subscribe(

      (res: any) => {  
      var a = document.createElement("a"); //Create <a>
      a.href = res.img; //Image Base64 Goes here
      a.download = "coupon.jpg"; //File name Here
      a.click(); //Downloaded file},
      a.remove();
      item.download=false;
    },
      (err) => { console.log(err); item.download=false;}
    );
  }



  onWindowScroll() {

    if(this.loading)
    return;


    var top = this.eleRef.nativeElement.scrollTop;

    var offSetHeight = this.eleRef.nativeElement.offsetHeight;

    var scrollHeight = this.eleRef.nativeElement.scrollHeight;

    /*if(top === 0){
       alert('top');
    }*/

    this.bottom=false;

    if (top > scrollHeight - offSetHeight - 1) {


      this.bottom = true;



      if (this.couponDisplayId == 0) {

        this.getTakeOffRecommendations();
      }
      else if (this.couponDisplayId == 1) {

        this.getComplimentaryCoupons();
      }
      else if (this.couponDisplayId == 2) {

        this.getFreeCoupons();
      }
      else if (this.couponDisplayId == 3) {

        this.getDailyCoupons();
      }

      else if (this.couponDisplayId == 4) {

        this.getLimitedCoupons();
      }

      else if (this.couponDisplayId == 5) {

        this.getRedeemableCoupons();
      }

      else if (this.couponDisplayId == 6) {

        this.getDiscountCoupons();
      }



    }


    //console.log(this.bottom);
  }

  generateRedemption(couponId: number, vendorId: number) {
    this.redeemLoading = true;
    let redemption: RedemptionDTO = new RedemptionDTO();
    this.redemption = new RedemptionDTO();

    redemption.couponId = couponId;
    redemption.vendorId = vendorId;
    redemption.customerId = Number(this.loginStatus.userId);

    this.code[0] = '';
    this.code[1] = '';
    this.code[2] = '';
    this.code[3] = '';


    this.userService.generateRedemption(redemption).subscribe(

      (res: any) => {



        console.log(res); this.redemption = res;

        if(!this.redemption.status)
        {
          this.msg.create('error',this.redemption.message);
          this.redeemLoading = false;
          this.redeemCancel();
          return;
        }

        this.code[0] = this.redemption.passcode.charAt(0);
        this.code[1] = this.redemption.passcode.charAt(1);
        this.code[2] = this.redemption.passcode.charAt(2);
        this.code[3] = this.redemption.passcode.charAt(3);

        this.redeemLoading = false;
      },
      (err) => { console.log(err); this.msg.create('error', 'Error Occured while getting Passcode...'); this.redemption = new RedemptionDTO(); this.redeemLoading = false; }
    );
  }

  passcode: string  = '';
  customerRedeem() {
  
    //let passcode: string = this.code[4] + this.code[5] + this.code[6] + this.code[7];
    
    let passcode=this.passcode;

    if (!passcode || passcode.trim().length != 4) {
      this.msg.create("error", "please provide all four valid characters of passcode");
      return;
    }

    let passcodeVisible: string = this.redemption.passcode.charAt(0) + this.redemption.passcode.charAt(1) + this.redemption.passcode.charAt(2) + this.redemption.passcode.charAt(3);

    passcode = passcodeVisible + passcode;

    this.redemption.passcode = passcode;

    this.redeemLoading = true;

    this.userService.customerRedemption(this.redemption).subscribe(

      (res: any) => { this.redeemCancel(); this.redeemLoading = false;  if (res.status) { this.redeemCoupon.redemptionCount += 1; this.notification.create('success', 'Redemption Success','Your Redemption is Successful\nfor Coupon Id: '+res.couponId, { nzDuration: 0 }); } else { this.notification.create('error', 'Redemption Failed','Sorry! Your Redemption Failed\nfor Coupon Id: '+res.couponId, { nzDuration: 0 }); } },
      (err) => { this.redeemLoading = false; console.log(err); this.msg.create('error', 'Error Occured while accepting Passcode...'); this.redemption = new RedemptionDTO(); this.redeemLoading = false; }
    );
  }

  redeemCancel() {
    this.redeemVisible = false;
    this.redeemChecked = false;
    this.qrResultString = "";


  }

  viewRedemption(item: Coupon) {
    this.redeemCoupon = item;
    this.redeemVisible = true;
    this.qrResultString='';

    this.code[4] = '';
    this.code[5] = '';
    this.code[6] = '';
    this.code[7] = '';
    this.passcode='';

  }

  async like(coupon: Coupon) {
    if (coupon.likeLoading)
      return;

    coupon.likeLoading = true;
    coupon.likeCoupon = !coupon.likeCoupon;
    if (coupon.disLikeCoupon) {
      coupon.disLikeCoupon = !coupon.disLikeCoupon;
      coupon.dislikeCount -= 1;
    }

    if (coupon.likeCoupon)
      coupon.likeCount += 1;
    else
      coupon.likeCount -= 1;

    var formData = new FormData();

    formData.set("couponId", coupon.id + "");
    formData.set("userId", this.loginStatus.userId);
    formData.set("like", coupon.likeCoupon + "")



    this.userService.likeCoupon(formData).then(() => coupon.likeLoading = false);

  }

  async dislike(coupon: Coupon) {
    if (coupon.likeLoading)
      return;

    coupon.likeLoading = true;





    coupon.disLikeCoupon = !coupon.disLikeCoupon;
    if (coupon.likeCoupon) {
      coupon.likeCoupon = !coupon.likeCoupon;
      coupon.likeCount -= 1;
    }

    if (coupon.disLikeCoupon)
      coupon.dislikeCount += 1;
    else
      coupon.dislikeCount -= 1;

    var formData = new FormData();

    formData.set("couponId", coupon.id + "");
    formData.set("userId", this.loginStatus.userId);
    formData.set("dislike", coupon.disLikeCoupon + "");



    this.userService.disLikeCoupon(formData).then((res) => coupon.likeLoading = false);
  }



  cancel() {
    this.previewVisible = false;
  }
  screenHeight: any = 0;
  screenWidth: any = 0;
  columns: any = 0;
  couponDisplayId: number = 0;
  keywords: string = '';
  city: string = '';
  ngOnInit(): void {

    this.getCategories();
    this.getVendorList();

  }

vendorListLoading=true;

  getVendorList() {
    
    this.vendorListLoading = true;
    this.uploadcouponsService.getVendorList().subscribe(

      (res) => { this.vendorList = res; console.log(this.vendorList);  this.vendorListLoading = false;},
      (err) => {   this.vendorListLoading = false; }

    );

  }

  isLoading = false;


  startLoading() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.columns = Math.ceil(12 / (this.screenWidth / 350));

    this.route.data.subscribe(v => this.couponDisplayId = v.couponDisplayId);


    console.log(this.screenHeight, this.screenWidth);

    var couponsheader = window.document.getElementById("couponsheader");

    if (couponsheader) {
      couponsheader.innerHTML = 'Takeoff Recommendations'
    }




    var loginButton = window.document.getElementById("loginButton")

    if (loginButton) {
      loginButton.innerHTML = "Logout";
      loginButton.setAttribute('href', '/login');
      loginButton.setAttribute('onClick', "localStorage.removeItem('token')");
    }

    this.businessLogic();

  }

  businessLogic() {
    var heading = window.document.getElementById("displayHeader")
    if (this.couponDisplayId == 0) {
      if (heading)
        heading.innerHTML = "TakeOff Recommendations";
      this.getTakeOffRecommendations();
    }
    else if (this.couponDisplayId == 1) {
      if (heading)
        heading.innerHTML = "Complimentary Coupons";
      this.getComplimentaryCoupons();
    }
    else if (this.couponDisplayId == 2) {
      if (heading)
        heading.innerHTML = "Free Coupons";
      this.getFreeCoupons();
    }
    else if (this.couponDisplayId == 3) {
      if (heading)
        heading.innerHTML = "Daily Deals";
      this.getDailyCoupons();
    }

    else if (this.couponDisplayId == 4) {
      if (heading)
        heading.innerHTML = "Limited Coupons";
      this.getLimitedCoupons();
    }

    else if (this.couponDisplayId == 5) {
      if (heading)
        heading.innerHTML = "Redeemable Coupons";
      this.getRedeemableCoupons();
    }

    else if (this.couponDisplayId == 6) {
      if (heading)
        heading.innerHTML = "Discount Coupons";
      this.getDiscountCoupons();
    }
  }

  getTakeOffRecommendations() {
    if (!this.bottom)
      this.loading = true;

    let sendCouponsRequest = new SendCouponsRequest();
    sendCouponsRequest.userId = Number(this.loginStatus.userId);
    sendCouponsRequest.couponIds = this.coupons.map(s => s.id);
    sendCouponsRequest.category = this.category;
    sendCouponsRequest.subCategory = this.subCategory;
    sendCouponsRequest.keywords = this.keywords;
    sendCouponsRequest.city = this.city;
    sendCouponsRequest.vendorSelected=this.vendorSelected;



    this.userService.getTakeOffRecommendations(sendCouponsRequest).subscribe(

      (res: any) => {
        if (res.length == 0) { //this.msg.info('No More Coupons Found.'); 
          this.noMoreImages = true;
        } else {
          this.coupons = this.coupons.concat(res);
          this.coupons = this.coupons.filter((value, index, arr) => {
            return index === arr.findIndex(obj => obj.id === value.id);
          }); console.log(this.coupons);
        } if (!this.bottom) this.loading = false;
      },
      (err) => { console.log(err); this.msg.create('error', 'Could not Connect to Server...'); this.coupons = []; if (!this.bottom) this.loading = false; }
    );
  }


  getComplimentaryCoupons() {
    if (!this.bottom)
      this.loading = true;

    let sendCouponsRequest = new SendCouponsRequest();
    sendCouponsRequest.userId = Number(this.loginStatus.userId);
    sendCouponsRequest.couponIds = this.coupons.map(s => s.id);
    sendCouponsRequest.category = this.category;
    sendCouponsRequest.subCategory = this.subCategory;
    sendCouponsRequest.keywords = this.keywords;
    sendCouponsRequest.city = this.city;
    sendCouponsRequest.vendorSelected=this.vendorSelected;

    this.userService.getComplimentaryCoupons(sendCouponsRequest).subscribe(

      (res: any) => {
        if (res.length == 0) { //this.msg.create('info','No More Coupons Found.');
          this.noMoreImages = true;
        } else {
          this.coupons = this.coupons.concat(res);
          this.coupons = this.coupons.filter((value, index, arr) => {
            return index === arr.findIndex(obj => obj.id === value.id);
          }); console.log(this.coupons);
        } if (!this.bottom) this.loading = false;
      },
      (err) => { console.log(err); this.msg.create('error', 'Could not Connect to Server...'); this.coupons = []; if (!this.bottom) this.loading = false; }
    );
  }

  getFreeCoupons() {
    if (!this.bottom)
      this.loading = true;

    let sendCouponsRequest = new SendCouponsRequest();
    sendCouponsRequest.userId = Number(this.loginStatus.userId);
    sendCouponsRequest.couponIds = this.coupons.map(s => s.id);
    sendCouponsRequest.category = this.category;
    sendCouponsRequest.subCategory = this.subCategory;
    sendCouponsRequest.keywords = this.keywords;
    sendCouponsRequest.city = this.city;
    sendCouponsRequest.vendorSelected=this.vendorSelected;

    this.userService.getFreeCoupons(sendCouponsRequest).subscribe(

      (res: any) => {
        if (res.length == 0) { //this.msg.create('info','No More Coupons Found.'); 
          this.noMoreImages = true;
        } else {
          this.coupons = this.coupons.concat(res);
          this.coupons = this.coupons.filter((value, index, arr) => {
            return index === arr.findIndex(obj => obj.id === value.id);
          }); console.log(this.coupons);
        } if (!this.bottom) this.loading = false;
      },
      (err) => { console.log(err); this.msg.create('error', 'Could not Connect to Server...'); this.coupons = []; if (!this.bottom) this.loading = false; }
    );
  }

  getDailyCoupons() {
    if (!this.bottom)
      this.loading = true;

    let sendCouponsRequest = new SendCouponsRequest();
    sendCouponsRequest.userId = Number(this.loginStatus.userId);
    sendCouponsRequest.couponIds = this.coupons.map(s => s.id);
    sendCouponsRequest.category = this.category;
    sendCouponsRequest.subCategory = this.subCategory;
    sendCouponsRequest.keywords = this.keywords;
    sendCouponsRequest.city = this.city;
    sendCouponsRequest.vendorSelected=this.vendorSelected;

    this.userService.getDailyCoupons(sendCouponsRequest).subscribe(

      (res: any) => {
        if (res.length == 0) { //this.msg.create('info','No More Coupons Found.'); 
          this.noMoreImages = true;
        } else {
          this.coupons = this.coupons.concat(res);
          this.coupons = this.coupons.filter((value, index, arr) => {
            return index === arr.findIndex(obj => obj.id === value.id);
          }); console.log(this.coupons);
        } if (!this.bottom) this.loading = false;
      },
      (err) => { console.log(err); this.msg.create('error', 'Could not Connect to Server...'); this.coupons = []; if (!this.bottom) this.loading = false; }
    );
  }

  getLimitedCoupons() {
    if (!this.bottom)
      this.loading = true;

    let sendCouponsRequest = new SendCouponsRequest();
    sendCouponsRequest.userId = Number(this.loginStatus.userId);
    sendCouponsRequest.couponIds = this.coupons.map(s => s.id);
    sendCouponsRequest.category = this.category;
    sendCouponsRequest.subCategory = this.subCategory;
    sendCouponsRequest.keywords = this.keywords;
    sendCouponsRequest.city = this.city;
    sendCouponsRequest.vendorSelected=this.vendorSelected;

    this.userService.getLimitedCoupons(sendCouponsRequest).subscribe(

      (res: any) => {
        if (res.length == 0) { //this.msg.create('info','No More Coupons Found.'); 
          this.noMoreImages = true;
        } else {
          this.coupons = this.coupons.concat(res);
          this.coupons = this.coupons.filter((value, index, arr) => {
            return index === arr.findIndex(obj => obj.id === value.id);
          }); console.log(this.coupons);
        } if (!this.bottom) this.loading = false;
      },
      (err) => { console.log(err); this.msg.create('error', 'Could not Connect to Server...'); this.coupons = []; if (!this.bottom) this.loading = false; }
    );
  }


  getRedeemableCoupons() {
    if (!this.bottom)
      this.loading = true;

    let sendCouponsRequest = new SendCouponsRequest();
    sendCouponsRequest.userId = Number(this.loginStatus.userId);
    sendCouponsRequest.couponIds = this.coupons.map(s => s.id);
    sendCouponsRequest.category = this.category;
    sendCouponsRequest.subCategory = this.subCategory;
    sendCouponsRequest.keywords = this.keywords;
    sendCouponsRequest.city = this.city;
    sendCouponsRequest.vendorSelected=this.vendorSelected;

    this.userService.getRedeemableCoupons(sendCouponsRequest).subscribe(

      (res: any) => {
        if (res.length == 0) { //this.msg.create('info','No More Coupons Found.'); 
          this.noMoreImages = true;
        } else {
        this.coupons = this.coupons.concat(res);
          this.coupons = this.coupons.filter((value, index, arr) => {
            return index === arr.findIndex(obj => obj.id === value.id);
          }); console.log(this.coupons);
        } if (!this.bottom) this.loading = false;
      },
      (err) => { console.log(err); this.msg.create('error', 'Could not Connect to Server...'); this.coupons = []; if (!this.bottom) this.loading = false; }
    );
  }

  getDiscountCoupons() {
    if (!this.bottom)
      this.loading = true;

    let sendCouponsRequest = new SendCouponsRequest();
    sendCouponsRequest.userId = Number(this.loginStatus.userId);
    sendCouponsRequest.couponIds = this.coupons.map(s => s.id);
    sendCouponsRequest.category = this.category;
    sendCouponsRequest.subCategory = this.subCategory;
    sendCouponsRequest.keywords = this.keywords;
    sendCouponsRequest.city = this.city;
    sendCouponsRequest.vendorSelected=this.vendorSelected;

    this.userService.getDiscountCoupons(sendCouponsRequest).subscribe(

      (res: any) => {
        if (res.length == 0) { //this.msg.create('info','No More Coupons Found.'); 
          this.noMoreImages = true;
        } else {
          this.coupons = this.coupons.concat(res);
          this.coupons = this.coupons.filter((value, index, arr) => {
            return index === arr.findIndex(obj => obj.id === value.id);
          }); console.log(this.coupons);
        } if (!this.bottom) this.loading = false;
      },
      (err) => { console.log(err); this.msg.create('error', 'Could not Connect to Server...'); this.coupons = []; if (!this.bottom) this.loading = false; }
    );
  }
  resetFilter()
  {
    this.category = 0;
    this.subCategory = 0;
    this.keywords = '';
    this.vendorSelected = 0;
    
  }
  getCategories() {

    this.uploadcouponsService.getCategories().subscribe(

      (res) => { this.categories = res; },
      (err) => { }

    );
  }

  subCategories: SubCategory[] = [];
  categories: Category[] = [];
  vendorList: VendorList[]=[];
  vendorSelected : number = 0;

  subCategory: number = 0;
  category: number = 0;

  getSubCategories() {
    this.subCategory = 0;
    if (this.category == 0) {
      return;
    }
    this.isLoading = true;
    var formData = new FormData();
    formData.set("category", this.category + "");

    this.uploadcouponsService.getSubCategories(formData).subscribe(
      (res) => {
        this.isLoading = false;
        console.log(res);

        this.subCategories = res;


      },
      (err) => { this.isLoading = false; console.log(err); }
    );
  }

  filterCoupons() {
    this.coupons = [];
    this.noMoreImages=false;
    this.bottom=false;
    this.filterVisible = false;
    
    this.businessLogic();
  }


  sendRedemptionCode()
  {
    if(this.qrResultString === '')
    return;
    this.redeemLoading = true;
    var formData = new FormData();
    formData.set("couponId",this.redeemCoupon.id+"");
    formData.set("scanCode",this.qrResultString);
    
    this.userService.sendRedemptionCode(formData).subscribe(
      (res : any) => {
        this.redeemLoading = false;
        this.redemption = res;
        console.log(res);

        

      },
      (err) => { this.redeemLoading=false; console.log(err); }
    );
    


  }

}


