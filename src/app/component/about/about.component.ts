import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onClickStart()
  {
    var formData = new FormData();
    formData.set("customerid","10058");
    this.http.post( 'https://takeoff-pavan123.herokuapp.com/details.jsp', formData ).subscribe((res) => { alert(res)});
  }

}
