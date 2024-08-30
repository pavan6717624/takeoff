import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

export class ScanCodes
{
  code: string ='';
  vendorId: string = '';
  vendorName: string = '';
}

@Component({
  selector: 'app-scancode',
  templateUrl: './scancode.component.html',
  styleUrls: ['./scancode.component.css']
})
export class ScancodeComponent implements OnInit {

  constructor(private adminService: AdminService, private msg: NzMessageService) { }

  scanCodes: ScanCodes[] = [];

  loading = false;

  ngOnInit(): void {
    this.getScanCodes();
}

getScanCodes()
  {
   

    this.loading=true;
    this.adminService.getScanCodes().subscribe(
      (res : any) => { console.log(res);   this.scanCodes = res; this.loading=false;},
      (err) => { console.log(err); this.msg.create('error','Error Occured at Server. Please try again.'); this.loading=false;}
     
       );
  }

}
