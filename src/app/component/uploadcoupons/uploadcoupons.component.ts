import { Component, OnInit } from '@angular/core';

import { NzTabPosition } from 'ng-zorro-antd/tabs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { VendorService } from '../vendor/vendor.service';



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


 


  ngOnInit(): void {

   
  
  }


  loading : boolean = false;
  
  imageSrc: string = "";

  file: any ;
  
imageStatus : ImageStatusDTO = new ImageStatusDTO();

  constructor(private msg: NzMessageService, private vendorService:VendorService) {}

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
    this.vendorService.upload(formData).subscribe(

      (res) => {console.log(res); this.imageStatus = res ; this.imageSrc=''; this.file=null;this.loading=false;},
      (err) => {console.log(err); this.imageStatus = new ImageStatusDTO(); this.file = null; this.imageSrc='';this.loading=false;}
    );
  }

  cancelUpload()
  {
    this.imageSrc = "";
  }
 

}
