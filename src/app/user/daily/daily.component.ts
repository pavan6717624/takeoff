import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var couponsheader = window.document.getElementById("couponsheader");

    if (couponsheader) {
      couponsheader.innerHTML = 'Daily Coupons'
    }
  }

}
