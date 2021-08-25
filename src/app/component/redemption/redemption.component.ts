import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redemption',
  templateUrl: './redemption.component.html',
  styleUrls: ['./redemption.component.css']
})
export class RedemptionComponent implements OnInit {

  constructor() { }

  couponId: string = '';
  customerId: string = '';
  vendorId: string = '';


  ngOnInit(): void {
  }

  vendorRedemptionProcess()
  {
    
  }

}
