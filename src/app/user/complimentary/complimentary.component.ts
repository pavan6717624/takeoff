import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-complimentary',
  templateUrl: './complimentary.component.html',
  styleUrls: ['./complimentary.component.css']
})
export class ComplimentaryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var couponsheader = window.document.getElementById("couponsheader");

    if (couponsheader) {
      couponsheader.innerHTML = 'Complementary Coupons'
    }
  }

}
