import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  forgetPassword(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/forgetPassword',formData)
  }
  checkPasswordOTP(formData: FormData) {
    return this.http.post('https://takeoff-pavan.herokuapp.com/checkPasswordOTP',formData)
  }
  generateMailPasscode(formData: FormData): Observable<any> {
    return this.http.post('https://takeoff-pavan.herokuapp.com/generateMailPasscode',formData)
  }
  getLoginDetails() {
    return this.http.get('https://takeoff-pavan.herokuapp.com/getLoginDetails')
  }

  constructor(private http: HttpClient) { }

login(formData: FormData): Observable<any>
{
 // return this.http.post( 'https://takeoff-pavan.herokuapp.com/login',formData );
  return this.http.post('https://takeoff-pavan.herokuapp.com/login',formData)
}

}
