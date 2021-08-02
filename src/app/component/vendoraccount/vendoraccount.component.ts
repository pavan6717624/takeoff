import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { VendoraccountService } from './vendoraccount.service';
import { VendorService } from '../vendor/vendor.service';
import { LoginStatus } from '../login/login.component';
import { ImageStatusDTO } from '../uploadcoupons/uploadcoupons.component';
import { Router } from '@angular/router';

export class VendorDetails {

  vendorId: string = "";
  name: string = "";
  contact: string = "";
  email: string = "";
  address: string = "";
  details: string = "";
  city: string = "";
  logo: string = "";

}

@Component({
  selector: 'app-vendoraccount',
  templateUrl: './vendoraccount.component.html',
  styleUrls: ['./vendoraccount.component.css']
})
export class VendoraccountComponent implements OnInit {


  @Input() loginStatus: LoginStatus | undefined;


  @Output() onLogoChange:EventEmitter<string>= new EventEmitter();  

  imgSourceChange: boolean = false;

  constructor(private router: Router, private vendorService: VendorService, private vendoraccountService: VendoraccountService, private msg: NzMessageService) { }

  vendorDetails: VendorDetails = new VendorDetails();
 

  ngOnInit(): void {

    console.log("login status :: " + this.loginStatus);
    this.getVendorDetails();

  }

  getVendorDetails() {
    this.loading=true;
    var formData = new FormData();
    if(this.loginStatus)
    formData.set("vendorId", this.loginStatus.userId);
    else
    {
      this.msg.create('error', 'Session Expired. Please Login');
      this.router.navigate(['login']);
    }
    this.vendoraccountService.getVendorDetails(formData).subscribe(
      (res) => { this.loading=false; this.imgSourceChange = false; this.vendorDetails = res; console.log(this.vendorDetails); },
      (err) => { this.loading=false; console.log(err); }

    );
  }

  imageSrc: String = '';
  loading: boolean = false;
  file: any = null;
  logoStatus: ImageStatusDTO = new ImageStatusDTO();
  uploading: boolean = false;

  beforeUpload = (file: any) => {
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


    this.loading = true;
    var formData = new FormData();
    formData.set("file", file);

    this.vendorService.beforeUpload(formData).subscribe(

      (res) => { console.log(res); this.file = file; this.imgSourceChange = true; this.vendorDetails.logo = 'data:image/jpeg;base64,' + res.image; this.loading = false; },
      (err) => { console.log(err); this.file = null; this.loading = false; this.msg.create("error", 'Error Occured while loading Logo.') }
    );
    return false;
  }

  logoUpload() {
    this.loading = true;
    var formData = new FormData();
    formData.set("file", this.file);
    if (this.loginStatus)
      formData.set("vendorId", this.loginStatus.userId);
    else {
      this.msg.create('error', 'Session Expired. Please Login');
      this.loading = false;
      return;
    }
    this.uploading = true;
    this.vendoraccountService.uploadLogo(formData).subscribe(

      (res) => {
        console.log(res);
        this.uploading = false;
        this.imgSourceChange = false;
        if (res.status)
        {
          this.msg.create('success', res.message);
          console.log("Success :: "+this.vendorDetails.logo);
          this.onLogoChange.emit(this.vendorDetails.logo);
        }
        else
          this.msg.create('error', res.message);
        this.file = null;
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.uploading = false;
        this.msg.create('error', 'Error Occured while Uplaoding..Try again..');
        this.file = null;
        this.loading = false;
      }
    );
  }


}
