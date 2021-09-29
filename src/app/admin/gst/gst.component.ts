import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

export class GstDetails
{
  date: string = '';
  id: number = 0;
  name: string = '';
}

@Component({
  selector: 'app-gst',
  templateUrl: './gst.component.html',
  styleUrls: ['./gst.component.css']
})
export class GstComponent implements OnInit {

  constructor(private adminService: AdminService, private msg: NzMessageService) { }

  gstDetailsList: GstDetails[]=[];

  ngOnInit(): void {
    this.gstDetails();
  }

  loading = false;

  gstDetails()
  {
    this.loading=true;
    this.adminService.gstDetails().subscribe(
      (res : any) => { console.log(res);   this.gstDetailsList = res; this.loading=false;},
      (err) => { console.log(err); this.msg.create('success','Error Occured at Server. Please try again.'); this.loading=false;}
     
       );
  }




}
