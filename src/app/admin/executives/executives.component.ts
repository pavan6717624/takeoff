import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { VendorDetails } from 'src/app/component/vendoraccount/vendoraccount.component';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-executives',
  templateUrl: './executives.component.html',
  styleUrls: ['./executives.component.css']
})
export class ExecutivesComponent implements OnInit {

  constructor(public adminService:AdminService,private modal: NzModalService, private msg: NzMessageService) { }


  sortDId = (a: VendorDetails, b: VendorDetails) => a.vendorId - b.vendorId;
  sortDName = (a: VendorDetails, b: VendorDetails) => a.name.localeCompare(b.name);
  sortDCity = (a: VendorDetails, b: VendorDetails) => a.city.localeCompare(b.city);

  ngOnInit(): void {
    this.getExecutives();
  }

  loading=false;
  designers: VendorDetails[]=[];
  previewDesignerVisible=false;
  editVisible=false;
  name: string='';
  contact: string='';
  email: string='';
  city: string = '';
  editId: number = 0;
  


  getExecutives()
  {
    this.loading = true;
    this.adminService.getExecutives().subscribe(

      (res:any) => { console.log(res);this.designers = res; this.loading = false; },
      (err) => { this.loading = false; }

    );
  }

  editDesigner()
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
    this.previewDesignerVisible = false;


    let designer = new VendorDetails();
    designer.vendorId=this.editId;
    designer.name=this.name;
    designer.contact=this.contact;
    designer.email=this.email;
    designer.city=this.city;
    
    this.adminService.editDesigner(designer).subscribe(
      (res) => { console.log(res); this.loading = false; if (res) { this.msg.create('success', 'Designer Details Modified.'); this.ngOnInit(); } },
      (err) => { console.log(err); this.loading = false; this.msg.create('error', 'Error Occured while Modifiing Designer'); }
    )

  }


  edit(vendor: VendorDetails)
  {
    this.name=vendor.name;
    this.contact=vendor.contact;
    this.email=vendor.email;
    this.city=vendor.city;
    this.editId=vendor.vendorId;
  }

  showConfirm(text: string, editId: number): void {
    this.modal.confirm({
      nzTitle: 'Are you sure ' + text  + '?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        if (text === 'Delete') {
         this.deleteDesigner(editId);
           
         
        }
        else if (text === 'Disable' || text === 'Enable') {
        
          this.disableDesigner(editId);
        }
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });

  }

  deleteDesigner(editId: number)
  {
    this.loading = true;
    var formData = new FormData();
    formData.set("vendorId",editId+"");
    this.adminService.deleteDesigner(formData).subscribe(

      (res:any) => { console.log(res); if(res) this.ngOnInit(); this.loading = false; },
      (err) => { this.loading = false; }

    );
  }

  disableDesigner(editId: number)
  {
    this.loading = true;
    var formData = new FormData();
    formData.set("vendorId",editId+"");
    this.adminService.disableDesigner(formData).subscribe(

      (res:any) => { console.log(res);if(res) this.ngOnInit(); this.loading = false; },
      (err) => { this.loading = false; }

    );
  }


  addDesignerView()
  {

    this.name='';
    this.contact='';
    this.email='';
    this.city='';
    this.editVisible=false;
    this.previewDesignerVisible = true;

  }

  addExecutive()
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
    this.previewDesignerVisible = false;


    let designer = new VendorDetails();
    designer.name=this.name;
    designer.contact=this.contact;
    designer.email=this.email;
    designer.city=this.city;
    
    this.adminService.addExecutive(designer).subscribe(
      (res) => { console.log(res); this.loading = false; if (res) { this.msg.create('success', 'Excetuve Created.'); this.ngOnInit(); } },
      (err) => { console.log(err); this.loading = false; this.msg.create('error', 'Error Occured while creating Excetuve'); }
    )

  }

}
