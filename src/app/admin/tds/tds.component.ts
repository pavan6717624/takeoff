import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DatePipe } from '@angular/common';

export class Tds
{
  parentId: number = 0;
  name: string ='';
  email: string ='';
  contact: string ='';
  city: string ='';
  tds: number = 0;
}

@Component({
  selector: 'app-tds',
  templateUrl: './tds.component.html',
  styleUrls: ['./tds.component.css']
})
export class TdsComponent implements OnInit {

  constructor(private adminService: AdminService, private msg: NzMessageService) { }

  tds: Tds[] = [];

  loading = false;

  ngOnInit(): void {
   
  }

date = null;

onChange()
{
  if(this.date == null)
  {

  }
  else
  {
    this.tdsDetails();
  }
}

  tdsDetails()
  {
    var datePipe = new DatePipe('en-US');
    let month = datePipe.transform(this.date, 'yyyy-MM-dd');
    var formData = new FormData();
    formData.set("month",month+"");

    this.loading=true;
    this.adminService.tdsDetails(formData).subscribe(
      (res : any) => { console.log(res);   this.tds = res; this.loading=false;},
      (err) => { console.log(err); this.msg.create('success','Error Occured at Server. Please try again.'); this.loading=false;}
     
       );
  }

}
