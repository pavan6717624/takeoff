import { Component, OnInit, ViewChild, ElementRef, Input, SimpleChanges } from '@angular/core';
import { EditcouponsService } from './editcoupons.service';
import { ImageStatusDTO } from '../uploadcoupons/uploadcoupons.component';
import { VendorService } from '../vendor/vendor.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LoginStatus } from '../login/login.component';
import { Router } from '@angular/router';
import { VendoraccountService } from '../vendoraccount/vendoraccount.service';

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


  ngOnChanges(changes: SimpleChanges) {
        

   
    if(this.addImage)
   { 
     var newImage = new ImageStatusDTO();
     newImage.image = this.addImage;
     this.images.splice(0,0,newImage);
     console.log("added Image");
     this.addImage=undefined;
    }
  

  

 
    
    
}

  constructor(private vendoraccountService: VendoraccountService, private router: Router, private msg: NzMessageService, private vendorService: VendorService, private editcouponsService: EditcouponsService) { }

  loading: boolean = false;
  loading1: boolean = false;


  header: string = "&nbsp;";
  body: string = "&nbsp;";
  footer: string = "&nbsp;";

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

  previewImage: string | undefined ;
  previewVisible = false;

  ngOnInit(): void {

    this.getImages();
  }
  images: ImageStatusDTO[] = [];
  getImages() {



    this.loading = true;
    var formData = new FormData();
    if (this.loginStatus)
      formData.set("vendorId", this.loginStatus.userId);
    else {
      this.msg.create('error', 'Session Expired. Please Login');
      this.router.navigate(['login']);
    }

    this.vendoraccountService.getVendorDetails(formData).subscribe(
      (res) => { 
       
         this.logo = res.logo;
         this.editcouponsService.getImages(formData).subscribe(

          (res) => { this.loading=false;  console.log(res); this.images = res; this.loading = false; },
          (err) => {  this.loading=false; console.log(err); this.images = []; this.loading = false; }
        );
        },
      (err) => { this.loading=false; console.log(err); }

    );

    
  }






}
