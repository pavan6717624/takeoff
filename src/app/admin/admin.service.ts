import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  mandatoryComplimentaryChange(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/mandatoryComplimentaryChange',formData);
  }
  deleteSubCategory(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/deleteSubCategory',formData);
  }

  deleteCategory(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/deleteCategory',formData);
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

  constructor(private http: HttpClient) { }


 
  getAllSubCategories(): Observable<any>
  {
    return this.http.get('https://takeoff-pavan.herokuapp.com/getAllSubCategories');
  }

  addCategory(formData: FormData): Observable<any>
  {
    return this.http.post('https://takeoff-pavan.herokuapp.com/addCategory',formData);
  }

  addSubCategory(formData: FormData): Observable<any>
  {
    return this.http.post('https://takeoff-pavan.herokuapp.com/addSubCategory',formData);
  }
}
