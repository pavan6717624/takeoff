import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { NzMessageService } from 'ng-zorro-antd/message';
import { VendorService } from '../vendor/vendor.service';
import { LoginStatus } from '../login/login.component';
import { Router } from '@angular/router';
import { UploadcouponsService } from './uploadcoupons.service';

export class Category
{
  id: number = 0;
  categoryName: string = "";
}

export class SubCategory
{
  id: number = 0;
  subCategoryName: string = "";
  category: Category = new Category();
}


export class ImageStatusDTO
{
  status: boolean=false;
  image: string="";
  message: string = "";
  id: number = 0;
}
@Component({
  selector: 'app-uploadcoupons',
  templateUrl: './uploadcoupons.component.html',
  styleUrls: ['./uploadcoupons.component.css']
})
export class UploadcouponsComponent implements OnInit {


  @Input() loginStatus: LoginStatus | undefined;
  @Output() onUpload:EventEmitter<string>= new EventEmitter();  

  category: string = '';
  subCategory: string = '';
  categories: Category[]=[];
  subCategories: SubCategory[]=[];
  keywords="";

  ngOnInit(): void {

    this.getCategories();

   
  }

  getCategories()
  {
    this.uploadcouponsService.getCategories().subscribe(
      (res) => {console.log(res);this.categories =res;},
      (err) => {console.log(err);this.msg.create('error','Error while loading categories...')}
     );
    
  }

  getSubCategories()
  {
    this.loading=true;
    var formData = new FormData();
    formData.set("category",this.category)
    this.uploadcouponsService.getSubCategories(formData).subscribe(
      (res) => {console.log(res); this.loading=false;this.subCategory='';this.subCategories =res;},
      (err) => {console.log(err); this.loading=false;this.msg.create('error','Error while loading subCategories...');}
     );
  }
  loading : boolean = false;
  
  imageSrc: string = "";

  file: any ;
  
imageStatus : ImageStatusDTO = new ImageStatusDTO();

  constructor( private uploadcouponsService :  UploadcouponsService,private router: Router, private msg: NzMessageService, private vendorService:VendorService) {}

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

    if(this.category === '' || !this.category)
    {
      this.msg.create('error', 'Please Select Category');
      return;
    }

    if(this.subCategory === ''|| !this.subCategory)
    {
      this.msg.create('error', 'Please Select SubCategory');
      return;
    }

    this.loading=true;
    var formData = new FormData();
    formData.set("file",this.file);
    if(this.loginStatus)
    formData.set("vendorId",this.loginStatus.userId)
    else {
      this.msg.create('error', 'Session Expired. Please Login');
      this.router.navigate(['login']);
      this.loading=false;
    }

  
formData.set("subCategory",this.subCategory);
formData.set("keywords",this.keywords);
    this.vendorService.upload(formData).subscribe(

      (res) => {console.log(res); this.imageStatus = res ; alert(this.imageStatus.id);this.category=''; this.subCategory = '' ; this.keywords=''; this.onUpload.emit(this.imageSrc); this.imageSrc=''; this.file=null;this.loading=false;},
      (err) => {console.log(err); this.category=''; this.subCategory = '' ;this.keywords=''; this.msg.create('error','Error Occured while uploading..');this.imageStatus = new ImageStatusDTO(); this.file = null; this.imageSrc='';this.loading=false;}
    );
  }

  cancelUpload()
  {
    this.imageSrc = "";
    this.category='';this.keywords=''; 
  }
 

}
