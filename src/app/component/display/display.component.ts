import { Component, OnInit } from '@angular/core';
import { DisplayService } from './display.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTreeNode } from 'ng-zorro-antd/tree';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  constructor(private displayService: DisplayService, private msg: NzMessageService) { }

  type: string = "0";
  structure: any;

  status: boolean= false;

  
  ngOnInit(): void {

    this.onViewChange();



  }

  onViewChange() {
    this.status=true;
    var formData = new FormData();
    formData.set("type", this.type);
    this.displayService.getTreeStructure(formData).subscribe(
      (res) => { this.type = res.type + ""; this.structure=res.structure; this.status=false; },
      (err) => { console.log(err); this.msg.create("error", "Error Occured at Sever..."); this.status=false;  }

    );
  }

}
