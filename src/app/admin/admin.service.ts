import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VendorDetails } from '../component/vendoraccount/vendoraccount.component';
import { GstDetails } from './gst/gst.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  emailChange(formData: FormData)
  {
    return this.http.post('http://localhost:8081/emailChange', formData);
    
  }
  
  hitsReceivedFun() {
    return this.http.get('http://localhost:8081/hitsReceived');
    }
  getContacts() {
    return this.http.get('http://localhost:8081/getContacts');
  }
  getScanCodes() {
    return this.http.get('http://localhost:8081/getScanCodes');
  }
  tdsDetails(formData: FormData) {
    return this.http.post('http://localhost:8081/getTDS',formData);
  }
  getWalletBalance() {
    return this.http.get('http://localhost:8081/getWalletBalance');
  }
  getUserStats() {
    return this.http.get('http://localhost:8081/getUserStats');
  }
  getAllCustomerAccountDetails() {
    return this.http.get('http://localhost:8081/getAllCustomerAccountDetails');
  }
  downloadGST(gstDetailsList: GstDetails[]) {
    return this.http.post('http://localhost:8081/downloadGST',gstDetailsList,{responseType: 'blob'});
  }

  gstDetails() {
    return this.http.get('http://localhost:8081/gstDetails');
  }
  takeOffStatement(formData: FormData) {
    return this.http.post('http://localhost:8081/takeOffStatement',formData);
  }

  creditAmount(formData: FormData) {
    return this.http.post('http://localhost:8081/creditAmount',formData);
  }



  verifyPanStatus(formData: FormData) {
    return this.http.post('http://localhost:8081/verifyPanStatus',formData);
  }


  verifyKycStatus(formData: FormData) {
    return this.http.post('http://localhost:8081/verifyKycStatus',formData);
  }

  editDesigner(designer: VendorDetails) {
    return this.http.post('http://localhost:8081/editDesigner',designer);
  }


  editVendor(vendor: VendorDetails) {
    return this.http.post('http://localhost:8081/editVendor',vendor);
  }

  addDesigner(designer: VendorDetails) {
    return this.http.post('http://localhost:8081/addDesigner',designer);
  }

  addInvestor(designer: VendorDetails) {
    return this.http.post('http://localhost:8081/addInvestor',designer);
  }

  
  addExecutive(designer: VendorDetails) {
    return this.http.post('http://localhost:8081/addExecutive',designer);
  }

  getExecutives() {
    return this.http.get('http://localhost:8081/getExecutives');
  }
  
  addVendor(designer: VendorDetails) {
    return this.http.post('http://localhost:8081/addVendor',designer);
  }

  disableDesigner(formData: FormData) {
    return this.http.post('http://localhost:8081/disableDesigner',formData);
  }

  deleteDesigner(formData: FormData) {
    return this.http.post('http://localhost:8081/deleteDesigner',formData);
  }


  disableVendor(formData: FormData) {
    return this.http.post('http://localhost:8081/disableVendor',formData);
  }

  deleteVendor(formData: FormData) {
    return this.http.post('http://localhost:8081/deleteVendor',formData);
  }


  getVendors() {
    return this.http.get('http://localhost:8081/getVendors');
  }
  getDesigners() {
    return this.http.get('http://localhost:8081/getDesigners');
  }
  getInvestors() {
    return this.http.get('http://localhost:8081/getInvestors');
  }
  mandatoryComplimentaryChange(formData: FormData) {
    return this.http.post('http://localhost:8081/mandatoryComplimentaryChange',formData);
  }
  deleteSubCategory(formData: FormData) {
    return this.http.post('http://localhost:8081/deleteSubCategory',formData);
  }

  deleteCategory(formData: FormData) {
    return this.http.post('http://localhost:8081/deleteCategory',formData);
  }

  deleteCouponType(formData: FormData) {
    return this.http.post('http://localhost:8081/deleteCouponType',formData);
  }

  
  visibleCouponType(formData: FormData) {
    return this.http.post('http://localhost:8081/visibleCouponType',formData);
  }

  visibleSubCategory(formData: FormData) {
    return this.http.post('http://localhost:8081/visibleSubCategory',formData);
  }

  visibleCategory(formData: FormData) {
    return this.http.post('http://localhost:8081/visibleCategory',formData);
  }

  editSubCategory(formData: FormData) {
    return this.http.post('http://localhost:8081/editSubCategory',formData);
  }

  editCategory(formData: FormData) {
    return this.http.post('http://localhost:8081/editCategory',formData);
  }

  editCouponType(formData: FormData) {
    return this.http.post('http://localhost:8081/editCouponType',formData);
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
    return this.http.get('http://localhost:8081/getAllSubCategories');
  }

  addCategory(formData: FormData): Observable<any>
  {
    return this.http.post('http://localhost:8081/addCategory',formData);
  }

  addCouponType(formData: FormData): Observable<any>
  {
    return this.http.post('http://localhost:8081/addCouponType',formData);
  }


  addSubCategory(formData: FormData): Observable<any>
  {
    return this.http.post('http://localhost:8081/addSubCategory',formData);
  }
}
