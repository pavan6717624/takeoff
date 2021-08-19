import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { VendorDetails } from 'src/app/component/vendoraccount/vendoraccount.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  constructor(public adminService:AdminService,private modal: NzModalService, private msg: NzMessageService) { }



  sortDId = (a: VendorDetails, b: VendorDetails) => a.vendorId - b.vendorId;
  sortDName = (a: VendorDetails, b: VendorDetails) => a.name.localeCompare(b.name);
  sortDCity = (a: VendorDetails, b: VendorDetails) => a.city.localeCompare(b.city);

  ngOnInit(): void {
    this.getVendors();
  }

  loading=false;
  vendors: VendorDetails[]=[];

  name: string = '';
  contact: string = '';
  email: string = '';
  city: string = '';
  editVisible=false;
  previewVendorVisible = false;
  address: string =  '';
  logo: string = '';
  editId: number = 0;
  uploading=false;

  addVendorView()
  {

      this.name='';
      this.contact='';
      this.email='';
      this.city='';
      this.address = '';
      this.logo = '';
      this.editVisible=false;
        this.previewVendorVisible = true;
  
    
  }

  addVendor()
  {
    if (this.name.trim().length < 3) {
      this.msg.create("error", "Name should be minimum of 3 Characters");
      return;
    }

    else if (!this.adminService.isContactNumber(this.contact)) {
      this.msg.create("error", "Contact Number should be 10 Digits");
      return;
    }

    else if(this.email.trim().indexOf('@')==-1 || this.email.trim().indexOf('@') != this.email.trim().lastIndexOf('@') || this.email.trim().lastIndexOf('@') > this.email.trim().lastIndexOf('.')  || this.email.trim().endsWith('.') || this.email.trim().startsWith('@')  || this.email.trim().endsWith('@') || this.email.trim().startsWith('.') || this.email.trim().indexOf('.')==-1 )
    {
      this.msg.create("error", "Invalid Email Address..");
      return;
    }


    else if (this.city === '' || !this.city) {
      this.msg.create("error", "Please Select City");
      return;
    }

    else if(this.address === '' || !this.address)
    {
      this.msg.create("error", "Please provide Address");
      return;
    }
    


    this.loading = true;
    this.previewVendorVisible = false;


    let vendor = new VendorDetails();
    vendor.name=this.name;
    vendor.contact=this.contact;
    vendor.email=this.email;
    vendor.city=this.city;
    vendor.address=this.address;

    
    this.adminService.addVendor(vendor).subscribe(
      (res) => { console.log(res); this.loading = false; if (res) { this.msg.create('success', 'Vendor Created.'); this.ngOnInit(); } },
      (err) => { console.log(err); this.loading = false; this.msg.create('error', 'Error Occured while creating Vendor.'); }
    )





  }

  showConfirm(text: string, editId: number): void {
    this.modal.confirm({
      nzTitle: 'Are you sure ' + text  + '?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        if (text === 'Delete') {
         this.deleteVendor(editId);
           
         
        }
        else if (text === 'Disable' || text === 'Enable') {
        
          this.disableVendor(editId);
        }
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });

  }

  deleteVendor(editId: number)
  {
    this.loading = true;
    var formData = new FormData();
    formData.set("vendorId",editId+"");
    this.adminService.deleteVendor(formData).subscribe(

      (res:any) => { console.log(res); if(res) this.ngOnInit(); this.loading = false; },
      (err) => { this.loading = false; }

    );
  }

  disableVendor(editId: number)
  {
    this.loading = true;
    var formData = new FormData();
    formData.set("vendorId",editId+"");
    this.adminService.disableVendor(formData).subscribe(

      (res:any) => { console.log(res);if(res) this.ngOnInit(); this.loading = false; },
      (err) => { this.loading = false; }

    );
  }

  getVendors()
  {
    this.loading = true;
    this.adminService.getVendors().subscribe(

      (res:any) => { console.log(res);this.vendors = res; this.loading = false; },
      (err) => { this.loading = false; }

    );
  }

  edit(vendor: VendorDetails)
  {
    this.name=vendor.name;
    this.contact=vendor.contact;
    this.email=vendor.email;
    this.city=vendor.city;
    this.editId=vendor.vendorId;
    this.address = vendor.address;
  }

  editVendor()
  {
    if (this.name.trim().length < 3) {
      this.msg.create("error", "Name should be minimum of 3 Characters");
      return;
    }

    else if (!this.adminService.isContactNumber(this.contact)) {
      this.msg.create("error", "Contact Number should be 10 Digits");
      return;
    }

    else if(this.email.trim().indexOf('@')==-1 || this.email.trim().indexOf('@') != this.email.trim().lastIndexOf('@') || this.email.trim().lastIndexOf('@') > this.email.trim().lastIndexOf('.')  || this.email.trim().endsWith('.') || this.email.trim().startsWith('@')  || this.email.trim().endsWith('@') || this.email.trim().startsWith('.') || this.email.trim().indexOf('.')==-1 )
    {
      this.msg.create("error", "Invalid Email Address..");
      return;
    }


    else if (this.city === '' || !this.city) {
      this.msg.create("error", "Please Select City");
      return;
    }

    this.loading = true;
    this.previewVendorVisible = false;


    let vendor = new VendorDetails();
    vendor.vendorId=this.editId;
    vendor.name=this.name;
    vendor.contact=this.contact;
    vendor.email=this.email;
    vendor.city=this.city;
    vendor.address = this.address;



    
    
    this.adminService.editVendor(vendor).subscribe(
      (res) => { console.log(res); this.loading = false; if (res) { this.msg.create('success', 'Designer Details Modified.'); this.ngOnInit(); } },
      (err) => { console.log(err); this.loading = false; this.msg.create('error', 'Error Occured while Modifiing Designer'); }
    )


  }

}
