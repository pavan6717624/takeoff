import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { W10002Service } from '../w10002.service';

export class Item
{
id: number = 0;
name: string = '';
price: number = 0.0;
cookingTime: number = 0;
availability: boolean = true;
count: number = 0;
}

export class OrderDetails
{
  cart: Cart = new Cart();
  itemId: number = 0;
}

export class Cart
{
  items: Item[]=[];
  totalPrice: number = 0;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private customerService: W10002Service, private notification: NzNotificationService, private router: Router, private msg: NzMessageService) { }

  itemVisible=false;

  itemsLoading=false;

  screenWidth:number=0;

  selectedIndex=0;

  selectItem(index: number)
  {
    
    this.itemVisible=true;
    this.selectedIndex=index;
    this.selectedItem=this.items[index];
    
  }

  addItem(item: Item)
  {
    console.log("adding "+item);
    if(item.count == null || item.count < 0)
    item.count = 0;
    item.count++;
   
    this.cart.items.push (item);
    console.log(this.cart);
    this.sum();
  }


  sum()
  {
    this.cart.totalPrice=0;
    for(var i=0;i<this.cart.items.length;i++)
    {
      this.cart.totalPrice+=(this.cart.items[i].price * this.cart.items[i].count);
    }
    console.log("total price == "+this.cart.totalPrice);
  }

  cart: Cart = new Cart();
  cartVisible: boolean = false;

  decreement(item: Item)
  {
    console.log("decreementing "+item);
    item.count--;
    if(item.count<=0)
    {
      item.count = 0;
      var index=this.cart.items.indexOf(item);
      this.cart.items.splice(index,1);

      if(this.cart.items.length == 0)
      this.cartVisible=false;

    }
    console.log(this.cart);
    this.sum()
  }
  cartOpen()
  {
    if(this.cart.items.length > 0)
    this.cartVisible=true;
    else
    {
      //this.msg.info("No Items Found in cart. Add Items to Cart.");

      this.notification.create(
        'info',
        'No Items Found',
        'Add Items to Cart',
        { nzDuration: 0 }
        );
    }
  
  }

  cartClose()
{
  this.cartVisible=false;
}
  increement(item: Item)
  {
    console.log("increementing "+item);
    item.count++;
    console.log(this.cart);
    this.sum()
  }

  itemsClose()
  {
    this.itemVisible=false;
  }


  images=["assets/img/veg.jpg","assets/img/milk.jpg","assets/img/egg.jpg","assets/img/hardware.jpg"];
  names=["Vegetables","Milk","Egggs","Hardware"];
  descriptions=["Carrots, Onions, Potatos, Apples","Buffalo Milk, Cow Milk","Boiled Egggs, Nattu Eggs","Monitors, Key Boards, Hard Disks"];
  
  items: Item[][] = [];

  itemnames=[["Potato","Onions","Apple","Banana"],["Buffalo Milk","Cow Milk","Milk Products","Ghee"],["Boild Eggs","Natu Eggs","Egg Products","Omlet"],["Monitor","Mouse","CPU","Key Board"]];
  selectedItem : Item[]= [];
  ngOnInit(): void {

    this.screenWidth = window.innerWidth;
    for(var i=0;i<4;i++)
    {
      var ita=[];
    for(var j=0;j<this.itemnames.length;j++)
    {
      var it=new Item();
      it.availability=true;
      it.count=0;
      it.name=this.itemnames[i][j];
      it.price=(Math.round(Math.random()*10)+10)*10
      ita.push(it);
    }
    this.items[i]=ita;
  }

    console.log(this.items);
  }

  username: string = "user1";

  password: string = "user1";
  visible=false;



  loginStatus = false;

 
  login()
  {
    if(this.username.toLowerCase()==='user1' && this.password.toLowerCase() === 'user1' )
    this.loginStatus=true;
  }

  loading4 = false;
  payment()
  {

    this.loading4=true;

    var order : OrderDetails = new OrderDetails();

    order.cart=this.cart;
    
    order.itemId = this.selectedIndex;

    this.customerService.payment(order).subscribe(
      (res) => {
       
        console.log(res);
        if(res)
        {
          this.router.navigate(['/website/success']); 
        }
       else
       {
        this.notification.create(
          'error',
          'Order Unsuccessful',
          'Sorry Your Order Payment got Failed. Please Try Again.',
          { nzDuration: 0 }
          );
       }
       this.loading4=false;
        
       
      },
  
    
  
      (err) => {    this.loading4=false;console.log(err); }
    );


  }


}
