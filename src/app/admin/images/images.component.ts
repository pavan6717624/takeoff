import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ImageStatusDTO } from 'src/app/component/uploadcoupons/uploadcoupons.component';
import { SendImagesRequest } from 'src/app/component/editcoupons/editcoupons.component';
import { LoginService } from 'src/app/component/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/user/user.service';
import { LoginStatus } from 'src/app/component/login/login.component';
import { EditcouponsService } from 'src/app/component/editcoupons/editcoupons.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  
  constructor(private editcouponsService: EditcouponsService,private loginService: LoginService, private router: Router, private route: ActivatedRoute, private msg: NzMessageService, private userService: UserService) 
  {

   // alert('adsfadsf');

    const navigation = this.router.getCurrentNavigation();
    this.loginStatus =  (navigation?.extras?.state?.loginStatus); 

    
      this.getLoginDetails();
      
   

   }

   getLoginDetails()
   {
     this.loading=true;
     this.loginService.getLoginDetails().subscribe(
       (res:any) => {
        this.loading=false;
         this.loginStatus=res;
 
         this.startLoading();
       },
       (err) => { this.loading=false; this.msg.create('error','Session Expired. Please Login...');
       this.router.navigate(['login']);
       }
     );
   }

   loginStatus: LoginStatus = new LoginStatus();


   startLoading()
   {
    this.getImages();
   }


  screenHeight: number = 0;
  images: ImageStatusDTO[] = [];
  
  ngOnInit(): void {

    this.screenHeight = window.innerHeight;
    this.getImages();
  }

  bottom: Boolean = false;

  noMoreImages: Boolean = false;

  loading = false;


  @ViewChild('scrollMe') private eleRef: ElementRef = new ElementRef('') ;

    
  onWindowScroll() {
  

   
 
    var top=this.eleRef.nativeElement.scrollTop;

    var offSetHeight=this.eleRef.nativeElement.offsetHeight;

    var scrollHeight=this.eleRef.nativeElement.scrollHeight; 
 
    /*if(top === 0){
       alert('top');
    }*/
   
    if(top>scrollHeight-offSetHeight-1){
     

      this.bottom=true;
      this.getImages1();
    }
  }

  getImages() {

   // alert('adsfadsf' + this.loginStatus.userId );


    this.loading = true;
    var formData = new FormData();
    if (this.loginStatus)
      {
        formData.set("vendorId", this.loginStatus.userId);
      }
    else {
      //this.msg.create('error', 'Session Expired. Please Login');
      this.router.navigate(['login']);
      return;
    }

    

   
        this.getImages1();

    
  }

 deleteImage(id: number)
 {
  //this.loading = true;
   var formData = new FormData();
   formData.set("imageId",id+"");

  
 this.msg.create('info','Please wait..Deleting..');
   
  this.editcouponsService.deleteImage(formData).subscribe(

    (res) => { //this.loading=false;  
              console.log(res); if(res){  this.images = this.images.filter(i => id!=i.id);  this.msg.create('success','Image Deleted.');
                                       } else this.msg.create('error','Unable to Delete Image. Please try Again.');
     // this.loading = false; 
    },
    (err) => { 
      //this.loading=false; 
      console.log(err); 
      //this.loading = false; 
}
  );
 }

  getImages1()
  {
    if(!this.loginStatus)
    {
      return;
    }
    let sendImagesRequest = new SendImagesRequest();
    sendImagesRequest.vendorId=Number(this.loginStatus.userId);
    sendImagesRequest.imageIds=this.images.map(s => s.id);

    this.editcouponsService.getImages(sendImagesRequest).subscribe(

      (res) => { this.loading=false;  console.log(res); if(res.length==0) { this.msg.create('info','No More Images Found.'); this.noMoreImages = true;} else  this.images=this.images.concat(res); this.loading = false; },
      (err) => {  this.loading=false; console.log(err); this.images = []; this.loading = false; }
    );
  }

}
