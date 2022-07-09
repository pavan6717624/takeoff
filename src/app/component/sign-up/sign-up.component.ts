import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  open(id: number): void {	
    if(id==1)	
    this.router.navigate(['freesubscribe']);	
    else if(id==2)	
    this.router.navigate(['subscribe']);	
  }
}
