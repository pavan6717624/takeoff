import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export class StatusDTO
{
  status: boolean = false;
  orderId: string = "";
	paymentId: string = "";
	customerId: number = 0;
  message: string = "";
  referCode: string = ""
}

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {

  statusDTO: StatusDTO;

  title: string="";
  subtitle: string = "";

  constructor(private router: Router) { 

    const navigation = this.router.getCurrentNavigation();
   this.statusDTO = (navigation?.extras?.state?.statusDTO); 
  

   console.log(this.statusDTO);

   if(this.statusDTO && this.statusDTO.status)
   {
     this.title='Successfully Subscribed. Enjoy TakeOff!';

   }
   else if(this.statusDTO && !this.statusDTO.status)
   {
     this.title='Oops! Something Went Wrong.';
     this.subtitle='Your Order id: '+this.statusDTO.orderId+
     ' Status : '+this.statusDTO.message;
   }


  }

home()
{
  this.router.navigate(['']);
}

login()
{
  this.router.navigate(['/login']);
}

  ngOnInit(): void {

   
   
  }

}
