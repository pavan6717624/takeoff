import { Component, OnInit } from '@angular/core';
import { CouponType } from 'src/app/component/editcoupons/editcoupons.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../admin.service';
import { NzTableFilterList } from 'ng-zorro-antd/table';
import { EditcouponsService } from 'src/app/component/editcoupons/editcoupons.service';

@Component({
  selector: 'app-coupontypes',
  templateUrl: './coupontypes.component.html',
  styleUrls: ['./coupontypes.component.css']
})
export class CoupontypesComponent implements OnInit {
  
 

  constructor(private editcouponsService: EditcouponsService,private modal: NzModalService, private msg: NzMessageService, private adminServie: AdminService) {


  }

  sortCId = (a: CouponType, b: CouponType) => a.id - b.id;
  sortCName = (a: CouponType, b: CouponType) => a.couponType.localeCompare(b.couponType);
  
 
  couponTypeName: string = '';
  loading =false;
  couponTypes: CouponType[]=[];
  couponType: CouponType = new CouponType();
  previewCouponTypeVisible=false;
  editVisible=false;
  editId:number = 0;
  editValue: string = '';


  ngOnInit(): void {
    this.getCouponTypes();
  }


  getCouponTypes()
  {
    this.editcouponsService.getCouponTypes().subscribe(

      (res) => { 
        this.loading=false;  
        console.log(res);
         this.couponTypes = res; 

         this.filterCouponType= [];
         for (var i = 0; i < this.couponTypes.length; i++) {
           this.filterCouponType.push([{ text: this.couponTypes[i].couponType, value: this.couponTypes[i].couponType, byDefault: false }][0]);
 
         }

         this.loading = false; 
        },
      (err) => {  this.loading=false; console.log(err); this.couponTypes = []; this.loading = false; }
    );
  }


  filterCouponType: NzTableFilterList = [];


  couponTypeFilterFn = (list: string[], item: CouponType) => {
    console.log("in category");


    return list.some(name => item.couponType === name);

  }



  showConfirm(text: string, editId: number): void {
    this.modal.confirm({
      nzTitle: 'Are you sure ' + text + ' this CouponType?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        if (text === 'Delete') {
        
            this.deleteCouponType(editId);
          
        }
        else if (text === 'Hide' || text === 'UnHide') {
         
            this.visibleCouponType(editId);
        }
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  deleteCouponType(couponTypeId: number)
  {
    this.loading = true;
    var formData = new FormData();
    formData.set("couponTypeId", couponTypeId + "");
    this.adminServie.deleteCouponType(formData).subscribe(
      (res) => { console.log(res); this.loading = false; if (res) { this.msg.create('success', 'Coupon Type Deleted.'); this.ngOnInit(); } },
      (err) => { console.log(err); this.loading = false; this.msg.create('error', 'Error Occured while Deleting Coupon Type'); }
    );
  }

  
  visibleCouponType(couponTypeId: number)
  {
    this.loading = true;
    var formData = new FormData();
    formData.set("couponTypeId", couponTypeId + "");
    this.adminServie.visibleCouponType(formData).subscribe(
      (res) => { console.log(res); this.loading = false; if (res) { this.msg.create('success', 'Coupon Type Visibility Modified.'); this.ngOnInit(); } },
      (err) => { console.log(err); this.loading = false; this.msg.create('error', 'Error Occured while Modifing Coupon Type Visibility'); }
    );
  }

  addCouponTypeView()
  {
    this.couponTypeName= '';
  
    this.previewCouponTypeVisible = true;
  }
  addCouponType()
  {
    if (this.couponTypeName.trim().length < 3) {
      this.msg.create("error", "Coupon Type Name should be minimum of 3 Characters");
      return;
    }

    this.loading = true;
    this.previewCouponTypeVisible = false;
    var formData = new FormData();
    formData.set("couponTypeName", this.couponTypeName);
    this.adminServie.addCouponType(formData).subscribe(
      (res) => { console.log(res); this.loading = false; if (res) { this.msg.create('success', 'Coupon Type Created.'); this.ngOnInit(); } },
      (err) => { console.log(err); this.loading = false; this.msg.create('error', 'Error Occured while creating Coupon Type'); }
    )



  }

  editCouponType()
{
  this.loading = true;
    var formData = new FormData();
    formData.set("couponTypeId", this.editId + "");
    formData.set("couponTypeName", this.editValue);
    this.editVisible = false;
    this.previewCouponTypeVisible=false;
    this.adminServie.editCouponType(formData).subscribe(

      (res) => {
        console.log(res); this.loading = false;

        if (res) {
          this.msg.create('success', 'Coupon Type Edited Successfully.'); this.ngOnInit();
        }
        else {
          this.msg.create('error', 'Cannot Edit Coupon Type ' + this.editValue); this.ngOnInit();
        }

      },
      (err) => { console.log(err); this.loading = false; this.msg.create('error', 'Error Occured while editing Coupon Type'); }

    );
}


}
