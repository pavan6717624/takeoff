import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-free',
  templateUrl: './free.component.html',
  styleUrls: ['./free.component.css']
})
export class FreeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var couponsheader = window.document.getElementById("couponsheader");

    if (couponsheader) {
      couponsheader.innerHTML = 'Free Coupons'
    }

  }

}
