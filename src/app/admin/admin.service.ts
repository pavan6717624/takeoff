import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VendorDetails } from '../component/vendoraccount/vendoraccount.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  editDesigner(designer: VendorDetails) {
    return this.http.post('http://localhost:8081/editDesigner',designer);
  }


  editVendor(vendor: VendorDetails) {
    return this.http.post('http://localhost:8081/editVendor',vendor);
  }

  addDesigner(designer: VendorDetails) {
    return this.http.post('http://localhost:8081/addDesigner',designer);
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
