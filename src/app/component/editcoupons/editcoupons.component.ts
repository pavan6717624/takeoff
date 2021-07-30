import { Component, OnInit } from '@angular/core';
import { EditcouponsService } from './editcoupons.service';
import { ImageStatusDTO } from '../uploadcoupons/uploadcoupons.component';

@Component({
  selector: 'app-editcoupons',
  templateUrl: './editcoupons.component.html',
  styleUrls: ['./editcoupons.component.css']
})
export class EditcouponsComponent implements OnInit {

  constructor(private editcouponsService: EditcouponsService) { }
  loading: boolean = false;

  header: string="";
  body: string="";
  footer: string="";

  header_color: string='';
  body_color: string='';
  footer_color: string='';

  header_align: string="top-left";
  body_align: string="centered-left";
  footer_align: string="bottom-left";


  header_size: number=10;
  body_size: number=10;
  footer_size: number=10;


  footer_font: string="Times New Roman";
  header_font: string="Times New Roman";
  body_font: string="Times New Roman";

  footer_bold: string="normal";
  header_bold: string="normal";
  body_bold: string="normal";


  footer_style: string="normal";
  header_style: string="normal";
  body_style: string="normal";


  footer_decoration: string="";
  header_decoration: string="";
  body_decoration: string="";

  previewImage: string | undefined = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
  previewVisible = false;

  ngOnInit(): void {
  
    this.getImages();
  }
  images : ImageStatusDTO[] =[];
  getImages()
  {
    this.loading=true;
    var formData = new FormData();
    formData.set("","");
    this.editcouponsService.getImages(formData).subscribe(

      (res) => {console.log(res); this.images=res; this.loading=false;},
      (err) => {console.log(err); this.images = [] ;this.loading=false; }
    );
  }

}
