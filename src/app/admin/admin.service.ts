import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VendorDetails } from '../component/vendoraccount/vendoraccount.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  editDesigner(designer: VendorDetails) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/editDesigner',designer);
  }
  addDesigner(designer: VendorDetails) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/addDesigner',designer);
  }

  disableDesigner(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/disableDesigner',formData);
  }

  deleteDesigner(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/deleteDesigner',formData);
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
