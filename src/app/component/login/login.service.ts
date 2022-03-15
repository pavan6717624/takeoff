import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  forgetPassword(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/forgetPassword',formData)
  }
  checkPasswordOTP(formData: FormData) {
    return this.http.post('https://takeoff-angular.herokuapp.com/checkPasswordOTP',formData)
  }
  generateMailPasscode(formData: FormData): Observable<any> {
    return this.http.post('https://takeoff-angular.herokuapp.com/generateMailPasscode',formData)
  }
  getLoginDetails() {
    return this.http.get('https://takeoff-angular.herokuapp.com/getLoginDetails')
  }

  constructor(private http: HttpClient) { }

login(formData: FormData): Observable<any>
{
 // return this.http.post( 'https://takeoff-angular.herokuapp.com/login',formData );
  return this.http.post('https://takeoff-angular.herokuapp.com/login',formData)
}

}
