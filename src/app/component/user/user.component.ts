import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStatus } from '../login/login.component';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

 userid: string='';
 loginStatus: LoginStatus = new LoginStatus();


 

  constructor(private router: Router) { 

    const navigation = this.router.getCurrentNavigation();
    this.loginStatus =  (navigation?.extras?.state?.loginStatus); 

    var loginButton = window.document.getElementById("loginButton")
    
    if(loginButton)
    {
      loginButton.innerHTML="Logout";
      loginButton.setAttribute('href','/login');
      loginButton.setAttribute('onClick',"localStorage.removeItem('token')");
    }

   // alert(this.loginStatus.userType+" ("+this.loginStatus.userId+") succesfully loggged in");

    if(this.loginStatus.userType === 'Vendor')
    {
     this.router.navigate(['vendor'],  { state: {loginStatus: this.loginStatus }}); 
    }

    else if(this.loginStatus.userType === 'Designer')
    {
     this.router.navigate(['designer'],  { state: {loginStatus: this.loginStatus }}); 
    }

    else if(this.loginStatus.userType === 'Admin')
    {
     this.router.navigate(['admin'],  { state: {loginStatus: this.loginStatus }}); 
    }

    else if(this.loginStatus.userType === 'Customer')
    {
     this.router.navigate(['customer'],  { state: {loginStatus: this.loginStatus }}); 
    }
    else if(this.loginStatus.userType === 'Investor')
    {
     this.router.navigate(['investor'],  { state: {loginStatus: this.loginStatus }}); 
    }
       else if(this.loginStatus.userType === 'Executive')
    {
     this.router.navigate(['executive'],  { state: {loginStatus: this.loginStatus }}); 
    }


    
  }

  ngOnInit(): void {
  }

}
