import { Component, OnInit, ViewChild, ElementRef, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { EditcouponsService } from './editcoupons.service';
import { ImageStatusDTO, Category } from '../uploadcoupons/uploadcoupons.component';
import { VendorService } from '../vendor/vendor.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoginStatus } from '../login/login.component';
import { Router } from '@angular/router';
import { VendoraccountService } from '../vendoraccount/vendoraccount.service';
import { UploadcouponsService } from '../uploadcoupons/uploadcoupons.service';
import { DatePipe, Time } from '@angular/common';

export class SendImagesRequest {
  vendorId: number = 0;
  imageIds: number[] = [];

}

export class Coupon {

  header: string = "";
  body: string = "";
  footer: string = "";

  header_color: string = '';
  body_color: string = '';
  footer_color: string = '';

  header_align: string = "top-center";
  body_align: string = "centered-left";
  footer_align: string = "bottom-left";


  header_size: number = 10;
  body_size: number = 10;
  footer_size: number = 10;


  footer_font: string = "Times New Roman";
  header_font: string = "Times New Roman";
  body_font: string = "Times New Roman";

  footer_bold: string = "normal";
  header_bold: string = "normal";
  body_bold: string = "normal";


  footer_style: string = "normal";
  header_style: string = "normal";
  body_style: string = "normal";

  image_align: string = 'top-left';


  footer_decoration: string = "";
  header_decoration: string = "";
  body_decoration: string = "";



  profession: string = '';
  gender: string = '';


  couponType: string = '';
  keywords: string = '';



  imageId: number = 0;
  image: string = '';


  fromDate: string = '';
  toDate: string = '';

  logo: string = '';

  vendorId: number = 0;

  description: string = '';

  id: number = 0;
  vendorName: string = '';

  coupon: string = '';

  expireTime: string = '';

  likeCoupon: Boolean = false;

  disLikeCoupon: Boolean = false;

  likeCount: number = 200;

  dislikeCount: number = 250;

  likeLoading: Boolean = false;

  redemptionCount: number = 0;

  expired: Boolean = false;
  
   address: string = '';

   contact: number = 0;

   download: Boolean = false;

}

export class CouponType {
  id: number = 0;
  couponType: string = '';
  couponTypeVisibility: Boolean = true;

}

@Component({
  selector: 'app-editcoupons',
  templateUrl: './editcoupons.component.html',
  styleUrls: ['./editcoupons.component.css']
})
export class EditcouponsComponent implements OnInit {


  @Input() loginStatus: LoginStatus | undefined;
  @Input() uploaded: Boolean | undefined;
  @Input() logo: string | undefined;
  @Input() addImage: string | undefined;
  @Output() onUploadCoupon: EventEmitter<Coupon> = new EventEmitter();
  @Output() onCouponTypes: EventEmitter<CouponType[]> = new EventEmitter();

  couponTypes: CouponType[] = [];

  time: string[] = [];

  userType: string = '';

  fromDate: Date = new Date();
  fromTime: string = this.fromDate.getHours() + ":" + this.fromDate.getMinutes();

  toDate: Date = new Date();
  toTime: string = this.toDate.getHours() + ":" + this.toDate.getMinutes();
  checked: Boolean[] = [];

  selectAll: Boolean = false;

  screenHeight: number = 500;



  ngOnChanges(changes: SimpleChanges) {






    if (this.addImage) {
      this.images = [];
      this.ngOnInit();
      this.addImage = undefined;
    }





  }

  constructor(private uploadcouponsService: UploadcouponsService, private vendoraccountService: VendoraccountService, private router: Router, private msg: NzMessageService, private vendorService: VendorService, private editcouponsService: EditcouponsService) { }

  loading: boolean = false;
  loading1: boolean = false;


  header: string = "";
  body: string = "";
  footer: string = "";

  header_color: string = '';
  body_color: string = '';
  footer_color: string = '';

  header_align: string = "top-center";
  body_align: string = "centered-left";
  footer_align: string = "bottom-left";


  header_size: number = 10;
  body_size: number = 10;
  footer_size: number = 10;


  footer_font: string = "Times New Roman";
  header_font: string = "Times New Roman";
  body_font: string = "Times New Roman";

  footer_bold: string = "normal";
  header_bold: string = "normal";
  body_bold: string = "normal";


  footer_style: string = "normal";
  header_style: string = "normal";
  body_style: string = "normal";

  image_align: string = 'top-left';


  footer_decoration: string = "";
  header_decoration: string = "";
  body_decoration: string = "";

  previewImage: string | undefined;
  previewVisible = false;

  profession: string = '';
  gender: string = '';


  couponType: string = '';
  keywords: string = '';


  description: string = '';

  imageId: number = 0;

  ngOnInit(): void {
    this.screenHeight = window.innerHeight;
    this.getCouponTypes();
    this.getImages();

    for (var i = 0; i < 24; i++)
      for (var j = 0; j < 60; j++) {
        var time = '';
        if (i < 10)
          time += '0' + i;
        else
          time += i;

        var time1 = '';
        if (j < 10)
          time1 += '0' + j;
        else
          time1 += j;

        this.time.push(time + ":" + time1);
      }

  }
  images: ImageStatusDTO[] = [];

  bottom: Boolean = false;

  noMoreImages: Boolean = false;


  @ViewChild('scrollMe') private eleRef: ElementRef = new ElementRef('');


  onWindowScroll() {




    var top = this.eleRef.nativeElement.scrollTop;

    var offSetHeight = this.eleRef.nativeElement.offsetHeight;

    var scrollHeight = this.eleRef.nativeElement.scrollHeight;

    /*if(top === 0){
       alert('top');
    }*/

    if (top > scrollHeight - offSetHeight - 1) {


      this.bottom = true;
      this.getImages1();
    }
  }

  getCouponTypes() {
    this.editcouponsService.getCouponTypes().subscribe(

      (res) => {  console.log(res); this.couponTypes = res; this.onCouponTypes.emit(this.couponTypes);  },
      (err) => {  console.log(err); this.couponTypes = [];  }
    );
  }

  getAllCouponTypes() {
    this.editcouponsService.getAllCouponTypes().subscribe(

      (res) => {  console.log(res); this.couponTypes = res; this.onCouponTypes.emit(this.couponTypes);  },
      (err) => {  console.log(err); this.couponTypes = [];  }
    );
  }

  saveId(id: number) {
    this.imageId = id;

  }


  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.fromDate) {
      return false;
    }

    var datePipe = new DatePipe('en-US');
    let endValueStr = datePipe.transform(endValue, 'yyyyMMdd');
    let fromDateStr = datePipe.transform(this.fromDate, 'yyyyMMdd');

    if (!endValueStr || !fromDateStr) {
      return false;
    }

    return endValueStr.localeCompare(fromDateStr) < 0;
  };

  getImages() {



    this.loading = true;
    var formData = new FormData();
    if (this.loginStatus) {
      formData.set("vendorId", this.loginStatus.userId);
      this.userType = this.loginStatus.userType;
    }
    else {
      //this.msg.create('error', 'Session Expired. Please Login');
      this.router.navigate(['login']);
      this.loading=false;
      return;
    }



    if (this.userType === 'Vendor' && this.loginStatus) {
      this.vendoraccountService.getVendorDetails(formData).subscribe(
        (res) => {

          this.logo = res.logo;
          this.getImages1();
        },
        (err) => { this.loading = false; console.log(err); }

      );
    }
    else if (this.userType === 'Designer') {
      this.getImages1();
    }

  }

  deleteImage(id: number) {
    this.loading = true;
    var formData = new FormData();
    formData.set("imageId", id + "");

    let image = this.images.find(i => i.id = id);
    if (image) {
      let index = this.images.indexOf(image);

      this.editcouponsService.deleteImage(formData).subscribe(

        (res) => { this.loading = false; console.log(res); if (res) this.images.splice(index, 1); else this.msg.create('error', 'Unable to Delete Image. Please try Again.'); this.loading = false; },
        (err) => { this.loading = false; console.log(err); this.loading = false; }
      );
    }
  }

  getImages1() {
    if (!this.loginStatus) {
      return;
    }
    let sendImagesRequest = new SendImagesRequest();
    sendImagesRequest.vendorId = Number(this.loginStatus.userId);
    sendImagesRequest.imageIds = this.images.map(s => s.id);

    this.editcouponsService.getImages(sendImagesRequest).subscribe(

      (res) => {
      this.loading = false; console.log(res); if (res.length == 0) { this.msg.create('info', 'No More Images Found.'); this.noMoreImages = true; } else {
      this.images = this.images.concat(res);
        this.images = this.images.filter((value, index, arr) => {
          return index === arr.findIndex(obj => obj.id === value.id);
        }); console.log(this.images);
      } this.loading = false;
      },
      (err) => { this.loading = false; console.log(err); this.images = []; this.loading = false; }
    );
  }

  click(item: ImageStatusDTO) {
    this.resetImageParams();
    this.imageId = item.id;
    //alert(this.imageId);
    this.previewImage = item.image;
    this.previewVisible = true;
    if(item.categoryId!=5)
    this.getCouponTypes();
    else
    this.getAllCouponTypes();
  }

  createCoupon() {



    if (!this.fromDate || !this.fromTime || !this.toDate || !this.toTime || this.fromDate == null || this.fromTime == null || this.toDate == null || this.toTime == null) {
      this.msg.create('error', 'Please Select Publish Dates (From & To)');
      return;
    }

    //   if(!this.profession || this.profession==='')
    //  {
    //    this.msg.create('error','Please Select Target Profession');
    //    return;
    //  }

    if (!this.gender || this.gender === '') {
      this.msg.create('error', 'Please Select Target Gender');
      return;
    }

    if (!this.couponType || this.couponType === '') {
      this.msg.create('error', 'Please Select Coupon Type');
      return;
    }

    var datePipe = new DatePipe('en-US');

    let fromDate = datePipe.transform(new Date(this.fromDate), 'yyyy-MM-dd');
    let fromTime = this.fromTime;
    let from = fromDate + " " + fromTime;

    let toDate = datePipe.transform(new Date(this.toDate), 'yyyy-MM-dd');
    let toTime = this.toTime;
    let to = toDate + " " + toTime;


    var coupon = new Coupon();

    coupon.header = this.header;
    coupon.body = this.body;
    coupon.footer = this.footer;

    coupon.header_color = this.header_color;
    coupon.body_color = this.body_color;
    coupon.footer_color = this.footer_color;

    coupon.header_align = this.header_align;
    coupon.body_align = this.body_align;
    coupon.footer_align = this.footer_align;

    coupon.header_size = this.header_size;
    coupon.body_size = this.body_size;
    coupon.footer_size = this.footer_size;

    coupon.footer_font = this.footer_font;
    coupon.header_font = this.header_font;
    coupon.body_font = this.body_font;

    coupon.footer_bold = this.footer_bold;
    coupon.header_bold = this.header_bold;
    coupon.body_bold = this.body_bold;

    coupon.footer_style = this.footer_style;
    coupon.header_style = this.header_style;
    coupon.body_style = this.body_style;

    coupon.image_align = this.image_align;

    coupon.footer_decoration = this.footer_decoration;
    coupon.header_decoration = this.header_decoration;
    coupon.body_decoration = this.body_decoration;

    coupon.profession = this.profession;
    coupon.gender = this.gender;

    coupon.couponType = this.couponType;
    coupon.keywords = this.keywords;
    coupon.description = this.description;


    // alert(from+" "+this.fromDate+" "+this.fromTime);
    // alert(to+" "+this.toDate+" "+this.toTime);

    if (from)
      coupon.fromDate = from;
    else {
      this.msg.create('error', 'Publish From Date not Found.');
      return;
    }

    if (to)
      coupon.toDate = to;
    else {
      this.msg.create('error', 'Publish To Date not Found.');
      return;
    }

    coupon.imageId = this.imageId;
    if (this.loginStatus && this.loginStatus.userId)
      coupon.vendorId = Number(this.loginStatus.userId);
    else {
      // this.msg.create('error','Session Expired. Please Login.');
      this.router.navigate(['login']);
      return;
    }
    this.loading1 = true;

    console.log(coupon);

    this.editcouponsService.saveCoupon(coupon).subscribe(

      (res) => { this.loading1 = false; console.log(res);  if (res) { this.previewVisible = false; this.msg.create('success', 'Coupon Saved Succesfully'); this.onUploadCoupon.emit(coupon); } else this.msg.create('error', 'Error while Saving Coupon. Please try Again.'); },
      (err) => { this.loading1 = false; this.msg.create('error', 'Error while Saving Coupon. Please try Again.'); console.log(err); }
    );

  }


  resetImageParams() {
    this.header = "";
    this.body = "";
    this.footer = "";

    this.header_color = '';
    this.body_color = '';
    this.footer_color = '';

    this.header_align = "top-center";
    this.body_align = "centered-left";
    this.footer_align = "bottom-left";

    this.header_size = 10;
    this.body_size = 10;
    this.footer_size = 10;

    this.footer_font = "Times New Roman";
    this.header_font = "Times New Roman";
    this.body_font = "Times New Roman";

    this.footer_bold = "normal";
    this.header_bold = "normal";
    this.body_bold = "normal";

    this.footer_style = "normal";
    this.header_style = "normal";
    this.body_style = "normal";

    this.image_align = 'top-left';

    this.footer_decoration = "";
    this.header_decoration = "";
    this.body_decoration = "";


    this.profession = '';
    this.gender = '';


    this.couponType = '';
    this.description = '';
    this.keywords = '';

    this.fromDate = new Date();
    this.toDate = new Date();



    this.fromTime = this.fromDate.getHours() + ":" + this.fromDate.getMinutes();


    this.toTime = this.toDate.getHours() + ":" + this.toDate.getMinutes();

  }
}
