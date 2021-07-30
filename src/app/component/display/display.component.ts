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

  nodes=JSON.parse("[{\"title\": \"<font color=blue><b>10001 (6000.0)</b></font>\", \"key\": \"10001 (6000.0)\", \"children\": [{\"title\": \"<font color=blue><b>10030 (500.0)</b></font>\", \"key\": \"10030 (500.0)\", \"children\": [{\"title\": \"<font color=blue><b>10031 (500.0)</b></font>\", \"key\": \"10031 (500.0)\", \"children\": [{\"title\": \"<font color=blue><b>10039 (500.0)</b></font>\", \"key\": \"10039 (500.0)\", \"children\": [ { \"title\": \"<font color=blue><b>10040 (0.0)</b></font>\", \"key\": \"10040 (0.0)\",\"isLeaf\": true }]}]}, { \"title\": \"<font color=red><b>(10032 (500.0))</b></font>\", \"key\": \"10032 (500.0)\",\"isLeaf\": true }]},{\"title\": \"<font color=brown><b>[10032 (500.0)]</b></font>\", \"key\": \"10032 (500.0)\", \"children\": [ { \"title\": \"<font color=blue><b>10041 (0.0)</b></font>\", \"key\": \"10041 (0.0)\",\"isLeaf\": true }, { \"title\": \"<font color=red><b>(10042 (500.0))</b></font>\", \"key\": \"10042 (500.0)\",\"isLeaf\": true }]}, { \"title\": \"<font color=blue><b>10033 (0.0)</b></font>\", \"key\": \"10033 (0.0)\",\"isLeaf\": true }, { \"title\": \"<font color=blue><b>10034 (0.0)</b></font>\", \"key\": \"10034 (0.0)\",\"isLeaf\": true },{\"title\": \"<font color=blue><b>10035 (500.0)</b></font>\", \"key\": \"10035 (500.0)\", \"children\": [ { \"title\": \"<font color=blue><b>10051 (0.0)</b></font>\", \"key\": \"10051 (0.0)\",\"isLeaf\": true }]},{\"title\": \"<font color=blue><b>10036 (2500.0)</b></font>\", \"key\": \"10036 (2500.0)\", \"children\": [ { \"title\": \"<font color=blue><b>10044 (0.0)</b></font>\", \"key\": \"10044 (0.0)\",\"isLeaf\": true }, { \"title\": \"<font color=red><b>(10045 (0.0))</b></font>\", \"key\": \"10045 (0.0)\",\"isLeaf\": true }, { \"title\": \"<font color=blue><b>10046 (0.0)</b></font>\", \"key\": \"10046 (0.0)\",\"isLeaf\": true }, { \"title\": \"<font color=red><b>(10047 (0.0))</b></font>\", \"key\": \"10047 (0.0)\",\"isLeaf\": true }, { \"title\": \"<font color=blue><b>10048 (0.0)</b></font>\", \"key\": \"10048 (0.0)\",\"isLeaf\": true }, { \"title\": \"<font color=red><b>(10049 (0.0))</b></font>\", \"key\": \"10049 (0.0)\",\"isLeaf\": true }, { \"title\": \"<font color=blue><b>10050 (0.0)</b></font>\", \"key\": \"10050 (0.0)\",\"isLeaf\": true }, { \"title\": \"<font color=blue><b>10052 (0.0)</b></font>\", \"key\": \"10052 (0.0)\",\"isLeaf\": true }]}, { \"title\": \"<font color=blue><b>10037 (0.0)</b></font>\", \"key\": \"10037 (0.0)\",\"isLeaf\": true }, { \"title\": \"<font color=blue><b>10038 (0.0)</b></font>\", \"key\": \"10038 (0.0)\",\"isLeaf\": true },{\"title\": \"<font color=brown><b>[10042 (500.0)]</b></font>\", \"key\": \"10042 (500.0)\", \"children\": [ { \"title\": \"<font color=blue><b>10043 (0.0)</b></font>\", \"key\": \"10043 (0.0)\",\"isLeaf\": true }]}, { \"title\": \"<font color=brown><b>[10045 (0.0)]</b></font>\", \"key\": \"10045 (0.0)\",\"isLeaf\": true }, { \"title\": \"<font color=brown><b>[10047 (0.0)]</b></font>\", \"key\": \"10047 (0.0)\",\"isLeaf\": true }, { \"title\": \"<font color=brown><b>[10049 (0.0)]</b></font>\", \"key\": \"10049 (0.0)\",\"isLeaf\": true }]}]");

  
  ngOnInit(): void {

    this.onViewChange();



  }

  onViewChange() {
    this.status=true;
    var formData = new FormData();
    formData.set("type", this.type);
    this.displayService.getTreeStructure(formData).subscribe(
      (res) => { this.type = res.type + ""; if(this.type=='0') this.structure=res.structure; else this.structure = JSON.parse(res.structure); this.status=false; },
      (err) => { console.log(err); this.msg.create("error", "Error Occured at Sever..."); this.status=false;  }

    );
  }

}
