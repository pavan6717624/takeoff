import { Component, OnInit } from '@angular/core';
import { DisplayService } from './display.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTreeNode } from 'ng-zorro-antd/tree';
import { UserService } from 'src/app/user/user.service';
import { LoginService } from '../login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginStatus } from '../login/login.component';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {


  loginStatus: LoginStatus = new LoginStatus();

  constructor( private userService: UserService,private loginService: LoginService, private router: Router, private route: ActivatedRoute,private displayService: DisplayService, private msg: NzMessageService) {


    const navigation = this.router.getCurrentNavigation();
    this.loginStatus =  (navigation?.extras?.state?.loginStatus); 

    
      this.getLoginDetails();
      
  

   }

   getLoginDetails()
   {
    var loginButton = window.document.getElementById("loginButton")
    
    if(loginButton)
    {
      loginButton.innerHTML="Logout";
      loginButton.setAttribute('href','/login');
      loginButton.setAttribute('onClick',"localStorage.removeItem('token')");
    }
    
     this.status=true;
     this.loginService.getLoginDetails().subscribe(
       (res:any) => {
        this.status=false;
         this.loginStatus=res;
 
         this.onViewChange();
       },
       (err) => { this.status=false; this.msg.create('error','Session Expired. Please Login...');
       this.router.navigate(['login']);
       }
     );
   }

  type: string = "0";
  structure: any;

  status: boolean= false;

  
  
  ngOnInit(): void {

    this.onViewChange();



  }

  onViewChange() {
    this.status=true;
   
    this.displayService.getTreeStructure().subscribe(
      (res) => { this.type = res.type + "";  this.structure=res.structure;  console.log(this.structure); this.status=false; },
      (err) => { console.log(err); this.msg.create("error", "Error Occured at Sever..."); this.status=false;  }

    );
  }

}
