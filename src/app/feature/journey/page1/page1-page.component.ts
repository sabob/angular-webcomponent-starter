import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-page1',
  standalone: true,
  imports: [],
  templateUrl: './page1-page.component.html',
  styleUrl: './page1-page.component.scss'
})
export class Page1PageComponent implements  OnInit {

  data: any;

   constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
     this.data = this.route.snapshot.data['data']; // Access preloaded data
    console.log("Page1 data received", this.data)
  }



}
