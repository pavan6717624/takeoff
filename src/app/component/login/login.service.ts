import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  forgetPassword(formData: FormData) {
    return this.http.post('http://localhost:8081/forgetPassword',formData)
  }
  checkPasswordOTP(formData: FormData) {
    return this.http.post('http://localhost:8081/checkPasswordOTP',formData)
  }
  generateMailPasscode(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8081/generateMailPasscode',formData)
  }
  getLoginDetails() {
    return this.http.get('http://localhost:8081/getLoginDetails')
  }

  constructor(private http: HttpClient) { }

login(formData: FormData): Observable<any>
{
 // return this.http.post( 'http://localhost:8081/login',formData );
  return this.http.post('http://localhost:8081/login',formData)
}

}
