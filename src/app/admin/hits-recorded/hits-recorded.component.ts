import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

export class HitsReceived
{
  timeOn: string = '';
  referer: string = '';
}

@Component({
  selector: 'app-hits-recorded',
  templateUrl: './hits-recorded.component.html',
  styleUrls: ['./hits-recorded.component.css']
})
export class HitsRecordedComponent implements OnInit {

  constructor(private adminService: AdminService, private msg: NzMessageService) { }

  hitsReceived: HitsReceived[] = [];

  loading = false;

  ngOnInit(): void {
    this.hitsReceivedFun();
}

hitsReceivedFun()
  {
   

    this.loading=true;
    this.adminService.hitsReceivedFun().subscribe(
      (res : any) => { console.log(res);   this.hitsReceived = res; this.loading=false;},
      (err) => { console.log(err); this.msg.create('error','Error Occured at Server. Please try again.'); this.loading=false;}
     
       );
  }

}
