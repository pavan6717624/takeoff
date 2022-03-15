import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VendorDetails } from '../component/vendoraccount/vendoraccount.component';
import { GstDetails } from './gst/gst.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  
  hitsReceivedFun() {
    return this.http.get('https://takeoff-angular.herokuapp.com/hitsReceived');
    }
  getContacts() {
    return this.http.get('https://takeoff-angular.herokuapp.com/getContacts');
  }
  getScanCodes() {
    return this.http.get('https://takeoff-angular.herokuapp.com/getScanCodes');
  }
  tdsDetails(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/getTDS',formData);
  }
  getWalletBalance() {
    return this.http.get('https://takeoff-angular.herokuapp.com/getWalletBalance');
  }
  getUserStats() {
    return this.http.get('https://takeoff-angular.herokuapp.com/getUserStats');
  }
  getAllCustomerAccountDetails() {
    return this.http.get('https://takeoff-angular.herokuapp.com/getAllCustomerAccountDetails');
  }
  downloadGST(gstDetailsList: GstDetails[]) {
    return this.http.post('https://takeoff-angular.herokuapp.com/downloadGST',gstDetailsList,{responseType: 'blob'});
  }

  gstDetails() {
    return this.http.get('https://takeoff-angular.herokuapp.com/gstDetails');
  }
  takeOffStatement(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/takeOffStatement',formData);
  }

  creditAmount(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/creditAmount',formData);
  }



  verifyPanStatus(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/verifyPanStatus',formData);
  }


  verifyKycStatus(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/verifyKycStatus',formData);
  }

  editDesigner(designer: VendorDetails) {
    return this.http.post('https://takeoff-angular.herokuapp.com/editDesigner',designer);
  }


  editVendor(vendor: VendorDetails) {
    return this.http.post('https://takeoff-angular.herokuapp.com/editVendor',vendor);
  }

  addDesigner(designer: VendorDetails) {
    return this.http.post('https://takeoff-angular.herokuapp.com/addDesigner',designer);
  }

  addInvestor(designer: VendorDetails) {
    return this.http.post('https://takeoff-angular.herokuapp.com/addInvestor',designer);
  }

  
  addExecutive(designer: VendorDetails) {
    return this.http.post('https://takeoff-angular.herokuapp.com/addExecutive',designer);
  }

  getExecutives() {
    return this.http.get('https://takeoff-angular.herokuapp.com/getExecutives');
  }
  
  addVendor(designer: VendorDetails) {
    return this.http.post('https://takeoff-angular.herokuapp.com/addVendor',designer);
  }

  disableDesigner(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/disableDesigner',formData);
  }

  deleteDesigner(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/deleteDesigner',formData);
  }


  disableVendor(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/disableVendor',formData);
  }

  deleteVendor(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/deleteVendor',formData);
  }


  getVendors() {
    return this.http.get('https://takeoff-angular.herokuapp.com/getVendors');
  }
  getDesigners() {
    return this.http.get('https://takeoff-angular.herokuapp.com/getDesigners');
  }
  getInvestors() {
    return this.http.get('https://takeoff-angular.herokuapp.com/getInvestors');
  }
  mandatoryComplimentaryChange(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/mandatoryComplimentaryChange',formData);
  }
  deleteSubCategory(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/deleteSubCategory',formData);
  }

  deleteCategory(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/deleteCategory',formData);
  }

  deleteCouponType(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/deleteCouponType',formData);
  }

  
  visibleCouponType(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/visibleCouponType',formData);
  }

  visibleSubCategory(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/visibleSubCategory',formData);
  }

  visibleCategory(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/visibleCategory',formData);
  }

  editSubCategory(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/editSubCategory',formData);
  }

  editCategory(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/editCategory',formData);
  }

  editCouponType(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/editCouponType',formData);
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
    return this.http.get('https://takeoff-angular.herokuapp.com/getAllSubCategories');
  }

  addCategory(formData: FormData): Observable<any>
  {
    return this.http.post('https://takeoff-angular.herokuapp.com/addCategory',formData);
  }

  addCouponType(formData: FormData): Observable<any>
  {
    return this.http.post('https://takeoff-angular.herokuapp.com/addCouponType',formData);
  }


  addSubCategory(formData: FormData): Observable<any>
  {
    return this.http.post('https://takeoff-angular.herokuapp.com/addSubCategory',formData);
  }
}
