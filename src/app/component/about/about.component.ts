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
    
    this.http.get( 'https://takeoff-pavan.herokuapp.com/' ).subscribe((res:any) => { alert(res.demo)});
  }

}
