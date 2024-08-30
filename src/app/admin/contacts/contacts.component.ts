import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

export class Contacts
{
 contact: string = '';
  name: string = '';
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(private adminService: AdminService, private msg: NzMessageService) { }

  contacts: Contacts[] = [];

  loading = false;

  ngOnInit(): void {
    this.getScanCodes();
}

getScanCodes()
  {
   

    this.loading=true;
    this.adminService.getContacts().subscribe(
      (res : any) => { console.log(res);   this.contacts = res; this.loading=false;},
      (err) => { console.log(err); this.msg.create('error','Error Occured at Server. Please try again.'); this.loading=false;}
     
       );
  }

}
