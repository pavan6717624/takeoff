import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css']
})
export class ReferenceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  go()
  {
    document.location.replace('https://www.thetakeoff.in/subscribe');
  }

}
