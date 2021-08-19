import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }



  getTakeOffRecommendations() {
    return this.http.get('https://takeoff-angular.herokuapp.com/getTakeOffRecommendations');
  }
}
