import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RedemptionDTO } from 'src/app/user/takeoff/takeoff.component';
import { UserService } from 'src/app/user/user.service';
import { RedemptionService } from './redemption.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-redemption',
  templateUrl: './redemption.component.html',
  styleUrls: ['./redemption.component.css']
})
export class RedemptionComponent implements OnInit {

  constructor(private notification: NzNotificationService, private router: Router, private msg: NzMessageService, private redemptionService: RedemptionService) { }


  couponId: string = '';
  customerId: string = '';

  code: string[] = [];
  redeemLoading: Boolean = false;

  redemption: RedemptionDTO = new RedemptionDTO();

  ngOnInit(): void {
  }

  redemptionCancel() {
    this.redemption = new RedemptionDTO();
  }

  acceptRedemption() {
    let passcode: string = this.code[0] + this.code[1] + this.code[2] + this.code[3];
    if (!passcode || passcode.trim().length != 4) {
      this.msg.create("error", "please provide all four valid characters of passcode");
      return;
    }

    let passcodeVisible: string = this.redemption.passcode.charAt(0) + this.redemption.passcode.charAt(1) + this.redemption.passcode.charAt(2) + this.redemption.passcode.charAt(3);

    passcode = passcode + passcodeVisible;

    let redemption = new RedemptionDTO();
    redemption.couponId = this.redemption.couponId;
    redemption.customerId = this.redemption.customerId;
    redemption.id = this.redemption.id;
    redemption.validTill = this.redemption.validTill;
    redemption.vendorId = this.redemption.vendorId;
    redemption.passcode = passcode;

    this.redemptionService.acceptRedemption(redemption).subscribe(

      (res: any) => {
        if (res) {
          this.notification.create(
            'success',
            'Redemption Acceptance',
            'You have Acceptance of Redemption is Successful.',
            );
        }
        else
        {
          this.notification.create(
            'error',
            'Redemption Acceptance',
            'Your Acceptance of Redemption got Failed.',
            );
        }
      },
      (err) => { console.log(err); this.msg.create('error', 'Error Occured while accepting Passcode...'); this.redemption = new RedemptionDTO(); this.redeemLoading = false; }
    );

  }
  vendorRedemptionProcess() {
    this.redeemLoading = true;
    let redemption: RedemptionDTO = new RedemptionDTO();
    this.redemption = new RedemptionDTO();
    redemption.couponId = Number(this.couponId);
    redemption.customerId = Number(this.customerId);

    this.code[0] = '';
    this.code[1] = '';
    this.code[2] = '';
    this.code[3] = '';

    this.code[4] = '';
    this.code[5] = '';
    this.code[6] = '';
    this.code[7] = '';

    this.redemptionService.vendorRedemptionProcess(redemption).subscribe(

      (res: any) => {
        console.log(res); this.redemption = res;

        if (this.redemption.passcode.length != 4) {
          this.msg.create("error", "No Passcode found OR Passcode Expired. Ask User to Regnerate the Passcode.");
        }
        else {
          this.code[4] = this.redemption.passcode.charAt(0);
          this.code[5] = this.redemption.passcode.charAt(1);
          this.code[6] = this.redemption.passcode.charAt(2);
          this.code[7] = this.redemption.passcode.charAt(3);
        }
        this.redeemLoading = false;
      },
      (err) => { console.log(err); this.msg.create('error', 'Error Occured while getting Passcode...'); this.redemption = new RedemptionDTO(); this.redeemLoading = false; }
    );

  }

}
