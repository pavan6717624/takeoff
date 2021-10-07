import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VendorDetails } from '../component/vendoraccount/vendoraccount.component';
import { GstDetails } from './gst/gst.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  getWalletBalance() {
    return this.http.get('http://localhost:8083/getWalletBalance');
  }
  getUserStats() {
    return this.http.get('http://localhost:8083/getUserStats');
  }
  getAllCustomerAccountDetails() {
    return this.http.get('http://localhost:8083/getAllCustomerAccountDetails');
  }
  downloadGST(gstDetailsList: GstDetails[]) {
    return this.http.post('http://localhost:8083/downloadGST',gstDetailsList,{responseType: 'blob'});
  }

  gstDetails() {
    return this.http.get('http://localhost:8083/gstDetails');
  }
  takeOffStatement(formData: FormData) {
    return this.http.post('http://localhost:8083/takeOffStatement',formData);
  }

  creditAmount(formData: FormData) {
    return this.http.post('http://localhost:8083/creditAmount',formData);
  }



  verifyPanStatus(formData: FormData) {
    return this.http.post('http://localhost:8083/verifyPanStatus',formData);
  }


  verifyKycStatus(formData: FormData) {
    return this.http.post('http://localhost:8083/verifyKycStatus',formData);
  }

  editDesigner(designer: VendorDetails) {
    return this.http.post('http://localhost:8083/editDesigner',designer);
  }


  editVendor(vendor: VendorDetails) {
    return this.http.post('http://localhost:8083/editVendor',vendor);
  }

  addDesigner(designer: VendorDetails) {
    return this.http.post('http://localhost:8083/addDesigner',designer);
  }

  addVendor(designer: VendorDetails) {
    return this.http.post('http://localhost:8083/addVendor',designer);
  }

  disableDesigner(formData: FormData) {
    return this.http.post('http://localhost:8083/disableDesigner',formData);
  }

  deleteDesigner(formData: FormData) {
    return this.http.post('http://localhost:8083/deleteDesigner',formData);
  }


  disableVendor(formData: FormData) {
    return this.http.post('http://localhost:8083/disableVendor',formData);
  }

  deleteVendor(formData: FormData) {
    return this.http.post('http://localhost:8083/deleteVendor',formData);
  }


  getVendors() {
    return this.http.get('http://localhost:8083/getVendors');
  }
  getDesigners() {
    return this.http.get('http://localhost:8083/getDesigners');
  }
  mandatoryComplimentaryChange(formData: FormData) {
    return this.http.post('http://localhost:8083/mandatoryComplimentaryChange',formData);
  }
  deleteSubCategory(formData: FormData) {
    return this.http.post('http://localhost:8083/deleteSubCategory',formData);
  }

  deleteCategory(formData: FormData) {
    return this.http.post('http://localhost:8083/deleteCategory',formData);
  }

  deleteCouponType(formData: FormData) {
    return this.http.post('http://localhost:8083/deleteCouponType',formData);
  }

  
  visibleCouponType(formData: FormData) {
    return this.http.post('http://localhost:8083/visibleCouponType',formData);
  }

  visibleSubCategory(formData: FormData) {
    return this.http.post('http://localhost:8083/visibleSubCategory',formData);
  }

  visibleCategory(formData: FormData) {
    return this.http.post('http://localhost:8083/visibleCategory',formData);
  }

  editSubCategory(formData: FormData) {
    return this.http.post('http://localhost:8083/editSubCategory',formData);
  }

  editCategory(formData: FormData) {
    return this.http.post('http://localhost:8083/editCategory',formData);
  }

  editCouponType(formData: FormData) {
    return this.http.post('http://localhost:8083/editCouponType',formData);
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
    return this.http.get('http://localhost:8083/getAllSubCategories');
  }

  addCategory(formData: FormData): Observable<any>
  {
    return this.http.post('http://localhost:8083/addCategory',formData);
  }

  addCouponType(formData: FormData): Observable<any>
  {
    return this.http.post('http://localhost:8083/addCouponType',formData);
  }


  addSubCategory(formData: FormData): Observable<any>
  {
    return this.http.post('http://localhost:8083/addSubCategory',formData);
  }
}
