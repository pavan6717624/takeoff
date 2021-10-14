import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';
import { Router } from '@angular/router';
import { LoginStatus } from '../login/login.component';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit {

  userid: string = '';
  loginStatus: LoginStatus = new LoginStatus();

  constructor(private router: Router) {

    const navigation = this.router.getCurrentNavigation();
    this.loginStatus = (navigation?.extras?.state?.loginStatus);

    var loginButton = window.document.getElementById("loginButton")

    if (loginButton) {
      loginButton.innerHTML = "Logout";
      loginButton.setAttribute('href', '/login');
      loginButton.setAttribute('onClick', "localStorage.removeItem('token')");
    }

    // alert(this.loginStatus.userType+" ("+this.loginStatus.userId+") succesfully loggged in");

    if (this.loginStatus.userType === 'Vendor') {
      this.router.navigate(['vendor'], { state: { loginStatus: this.loginStatus } });
    }

    else if (this.loginStatus.userType === 'Designer') {
     // this.router.navigate(['designer'], { state: { loginStatus: this.loginStatus } });
    }

    else if (this.loginStatus.userType === 'Admin') {
      this.router.navigate(['admin'], { state: { loginStatus: this.loginStatus } });
    }

    else if (this.loginStatus.userType === 'Customer') {
      this.router.navigate(['customer'], { state: { loginStatus: this.loginStatus } });
    }



  }

  @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent | undefined;

  ngOnInit() {

    if (this.loginStatus.userType === 'Designer') {
      if (!this.qrScannerComponent)
        return;


      this.qrScannerComponent.getMediaDevices().then(devices => {
        console.log(devices);
        const videoDevices: MediaDeviceInfo[] = [];
        for (const device of devices) {
          if (device.kind.toString() === 'videoinput') {
            videoDevices.push(device);
          }
        }
        if (videoDevices.length > 0) {
          let choosenDev;
          for (const dev of videoDevices) {
            if (dev.label.includes('front')) {
              choosenDev = dev;
              break;
            }
          }
          if (choosenDev && this.qrScannerComponent) {
            this.qrScannerComponent.chooseCamera.next(choosenDev);
          } else if (this.qrScannerComponent) {
            this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
          }
        }
      });

      this.qrScannerComponent.capturedQr.subscribe(result => {
        console.log(result);
      });
    }
  }
}
