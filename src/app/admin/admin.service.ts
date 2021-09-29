import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VendorDetails } from '../component/vendoraccount/vendoraccount.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  gstDetails() {
    return this.http.get('https://takeoff-pavan.herokuapp.com/gstDetails');
  }
  takeOffStatement(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/takeOffStatement',formData);
  }

  creditAmount(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/creditAmount',formData);
  }



  verifyPanStatus(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/verifyPanStatus',formData);
  }


  verifyKycStatus(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/verifyKycStatus',formData);
  }

  editDesigner(designer: VendorDetails) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/editDesigner',designer);
  }


  editVendor(vendor: VendorDetails) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/editVendor',vendor);
  }

  addDesigner(designer: VendorDetails) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/addDesigner',designer);
  }

  addVendor(designer: VendorDetails) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/addVendor',designer);
  }

  disableDesigner(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/disableDesigner',formData);
  }

  deleteDesigner(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/deleteDesigner',formData);
  }


  disableVendor(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/disableVendor',formData);
  }

  deleteVendor(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/deleteVendor',formData);
  }


  getVendors() {
    return this.http.get('https://takeoff-pavan.herokuapp.com/getVendors');
  }
  getDesigners() {
    return this.http.get('https://takeoff-pavan.herokuapp.com/getDesigners');
  }
  mandatoryComplimentaryChange(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/mandatoryComplimentaryChange',formData);
  }
  deleteSubCategory(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/deleteSubCategory',formData);
  }

  deleteCategory(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/deleteCategory',formData);
  }

  deleteCouponType(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/deleteCouponType',formData);
  }

  
  visibleCouponType(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/visibleCouponType',formData);
  }

  visibleSubCategory(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/visibleSubCategory',formData);
  }

  visibleCategory(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/visibleCategory',formData);
  }

  editSubCategory(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/editSubCategory',formData);
  }

  editCategory(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/editCategory',formData);
  }

  editCouponType(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/editCouponType',formData);
  }


  constructor(private http: HttpClient) { }

  isContactNumber(value: string): Boolean
{
  
   return ((value != null) &&
           (value !== '') &&
           !isNaN(Number(value.toString())) && (value.trim().length == 10));
}

 
  getAllSubCategories(): Observable<any>
  {
    return this.http.get('https://takeoff-pavan.herokuapp.com/getAllSubCategories');
  }

  addCategory(formData: FormData): Observable<any>
  {
    return this.http.post('https://takeoff-pavan.herokuapp.com/addCategory',formData);
  }

  addCouponType(formData: FormData): Observable<any>
  {
    return this.http.post('https://takeoff-pavan.herokuapp.com/addCouponType',formData);
  }


  addSubCategory(formData: FormData): Observable<any>
  {
    return this.http.post('https://takeoff-pavan.herokuapp.com/addSubCategory',formData);
  }
}
