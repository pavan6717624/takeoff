import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';
import { LoginStatus } from 'src/app/component/login/login.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from 'src/app/admin/admin.service';
import { SubCategoryDTO } from 'src/app/admin/category/category.component';
import { UploadcouponsService } from 'src/app/component/uploadcoupons/uploadcoupons.service';
import { Category } from 'src/app/component/uploadcoupons/uploadcoupons.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginStatus: LoginStatus = new LoginStatus();
  userType: string = '';
  constructor(private notification: NzNotificationService, private userService: UserService, private uploadcouponsService: UploadcouponsService, private adminServie: AdminService, private msg: NzMessageService, private router: Router,private deviceService: DeviceDetectorService) 
  {

    const navigation = this.router.getCurrentNavigation();
    this.loginStatus =  (navigation?.extras?.state?.loginStatus); 

    if(this.loginStatus)
    {

      this.userType=this.loginStatus.userType;
 

      if(this.userType!='Customer')
      {
        this.msg.create('error', 'Logging in...');
        this.router.navigate(['login']);
        return;
      }
    }

    



   }

  visible = false;

  // filterVisible=false;

  selectedMenu : number = 1;

  customerType: string = '';

  getNotification()
  {
    this.userService.getNotification().subscribe(
      (res : any) => {
       
        console.log(res);

        if(res.header.includes('Premium'))
        this.customerType = 'Premium';
        else
        this.customerType='Free';

        this.notification.create('success', res.header,res.message, { nzDuration: 0, nzPlacement: 'bottomRight' });

      },
      (err) => {  console.log(err); }
    );
  }
  


  ngOnInit(): void {

    this.getNotification();
   
    var uris=["takeoff","complimentary","redeemable","discount","daily","limited","onetimeoffers"]
    var uri=this.router.url;

    for(var i=0;i<uris.length;i++)
    if(uri.includes(uris[i]))
    this.selectedMenu = i+1;

  }

  open(): void {
    this.visible = true;
  }

  close(id: number): void {
    if(id!=0)
    this.selectedMenu = id;
    this.visible = false;
    
  }

  getCategories() {
   
    this.uploadcouponsService.getCategories().subscribe(

      (res) => { this.categories = res; },
      (err) => {}

    );
  }

  subCategories: SubCategoryDTO[] = [];
  categories: Category[] = [];

  subCategory: SubCategoryDTO =new SubCategoryDTO();
  category: Category = new Category();

  getAllSubCategories() {
   

    this.adminServie.getAllSubCategories().subscribe(
      (res) => {
        console.log(res);

        this.subCategories = res;
        

      },
      (err) => { console.log(err);  }
    );
  }

}
