import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';
import { VendorService } from '../vendor/vendor.service';
import { LoginStatus } from '../login/login.component';
import { Router } from '@angular/router';



export class ImageStatusDTO
{
  status: boolean=false;
  image: string="";
  message: string = "";
}
@Component({
  selector: 'app-uploadcoupons',
  templateUrl: './uploadcoupons.component.html',
  styleUrls: ['./uploadcoupons.component.css']
})
export class UploadcouponsComponent implements OnInit {


  @Input() loginStatus: LoginStatus | undefined;
  @Output() onUpload:EventEmitter<string>= new EventEmitter();  

  ngOnInit(): void {

   
  
  }


  loading : boolean = false;
  
  imageSrc: string = "";

  file: any ;
  
imageStatus : ImageStatusDTO = new ImageStatusDTO();

  constructor( private router: Router, private msg: NzMessageService, private vendorService:VendorService) {}

  beforeUpload = (file:  any) =>
  {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      this.msg.error('You can only upload JPG file!');
   
      return false;
    }
    const isLt2M = file.size! / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.msg.error('Image must smaller than 2MB!');
     
      return false;
    }

    this.imageStatus=new ImageStatusDTO();
    this.loading=true;
    var formData = new FormData();
    formData.set("file",file);
    this.vendorService.beforeUpload(formData).subscribe(

      (res) => {console.log(res);this.imageSrc = 'data:image/jpeg;base64,' + res.image; this.file=file;this.loading=false;},
      (err) => {console.log(err); this.file = null; this.imageSrc='';this.loading=false;}
    );
    return false;
  }


  upload()
  {
    this.loading=true;
    var formData = new FormData();
    formData.set("file",this.file);
    if(this.loginStatus)
    formData.set("vendorId",this.loginStatus.userId)
    else {
      this.msg.create('error', 'Session Expired. Please Login');
      this.router.navigate(['login']);
    }

    this.vendorService.upload(formData).subscribe(

      (res) => {console.log(res); this.imageStatus = res ; this.onUpload.emit(this.imageSrc); this.imageSrc=''; this.file=null;this.loading=false;},
      (err) => {console.log(err); this.msg.create('error','Error Occured while uploading..');this.imageStatus = new ImageStatusDTO(); this.file = null; this.imageSrc='';this.loading=false;}
    );
  }

  cancelUpload()
  {
    this.imageSrc = "";
  }
 

}
