import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../admin.service';

export class StatsDTO
{
  roleName: string = '';
  todayCount: number = 0;
  monthCount: number = 0;
  totalCount: number = 0;
}

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  stats : StatsDTO[] = [];
  loading = false;
  walletBalance: string = '';
  constructor(private adminService: AdminService, private msg: NzMessageService) { }

  ngOnInit(): void {

    this.getUserStats();
    this.getWalletBalance();
  }

  getUserStats()
  {
    this.loading=true;
    this.adminService.getUserStats().subscribe(
      (res : any) => { console.log(res);   this.stats = res; this.loading=false;},
      (err) => { console.log(err); this.msg.create('error','Error Occured at Server. Please try again.'); this.loading=false;}
     
       );
  }

  getWalletBalance()
  {
    this.adminService.getWalletBalance().subscribe(
      (res : any) => { console.log(res);   this.walletBalance = res.walletBalance; },
      (err) => { console.log(err); this.msg.create('error','Error Occured at Server. Please try again.');}
     
       );
  }

}
