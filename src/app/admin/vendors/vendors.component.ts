import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { VendorDetails } from 'src/app/component/vendoraccount/vendoraccount.component';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  constructor(private adminService:AdminService) { }


  sortDId = (a: VendorDetails, b: VendorDetails) => a.vendorId - b.vendorId;
  sortDName = (a: VendorDetails, b: VendorDetails) => a.name.localeCompare(b.name);
  sortDCity = (a: VendorDetails, b: VendorDetails) => a.city.localeCompare(b.city);

  ngOnInit(): void {
    this.getVendors();
  }

  loading=false;
  vendors: VendorDetails[]=[];

  addCouponTypeView()
  {

  }

  getVendors()
  {
    this.loading = true;
    this.adminService.getVendors().subscribe(

      (res:any) => { console.log(res);this.vendors = res; this.loading = false; },
      (err) => { this.loading = false; }

    );
  }

}
