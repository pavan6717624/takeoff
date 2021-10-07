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

 downloading=false;

  download()
  {
    this.downloading=true;
    this.adminService.downloadGST(this.gstDetailsList).subscribe((res : any) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(new Blob([res], { type: 'text/csv' }));
      link.download = 'GST Report.csv';
      link.click();
      link.remove();
      this.downloading=false;
    });
  }


}
