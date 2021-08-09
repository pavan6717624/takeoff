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

  }

  
  visibleCouponType(couponTypeId: number)
  {
    
  }

  addCouponTypeView()
  {
    this.couponTypeName= '';
  
    this.previewCouponTypeVisible = true;
  }
  addCouponType()
  {

  }



}
