import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { endOfMonth } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient, private msg: NzMessageService) { }

  ngOnInit(): void {

    window.document.title='svu mocx';
  }

  username: string = "";

  password: string = '';

  selectedIndex = 0;

  loginStatus = false;
  ranges = { Today: [new Date(), new Date()], 'This Month': [new Date(), endOfMonth(new Date())] };
  scheduleTimeVisible=false;
  time = new Date();
  date = new Date();
  duration : any = 1;
  login()
  {
    if(this.username.toLowerCase()==='svu' && this.password.toLowerCase() === 'svu' )
    this.loginStatus=true;
  }

  email1: string = '';
  email2: string = '';
  scheduling=false;

  schedule()
  {
    var formData =new  FormData();
    var i = this.selectedIndex;


    var datePipe = new DatePipe('en-US');
    

    formData.set("id",i+"")
    formData.set("date",datePipe.transform(new Date(this.date), 'dd-MM-yyyy')+"");
    formData.set("time",datePipe.transform(new Date(this.time), 'HH:mm')+"");
    formData.set("duration", this.duration);
    formData.set("email1", this.email1);
    formData.set("email2", this.email2);
    this.scheduling=true;
    this.scheduleService(formData).subscribe((res) => 
    {
      this.msg.success("Your Interview Scheduled. Check your Email for more Details...");
      this.scheduling=false;
      this.scheduleTimeVisible=false;
    },

    (err) => {
      this.msg.success("Error Occured...Please Contact Administrator..");
      this.scheduling=false;
      this.scheduleTimeVisible=false;
    }




    );
  }

  onChange(result: Date[]): void {
    console.log('From: ', result[0], ', to: ', result[1]);
  }
  
  scheduleTime(i:any)
  {
    this.selectedIndex = i+1;
    this.scheduleTimeVisible=true;
    
  }


  scheduleService(formData: FormData) {
    return this.http.post('http://localhost:8081/scheduleInterview',formData);
  }

}
