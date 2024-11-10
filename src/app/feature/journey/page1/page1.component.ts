import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-page1',
  standalone: true,
  imports: [],
  templateUrl: './page1.component.html',
  styleUrl: './page1.component.scss'
})
export class Page1Component implements OnInit {

  data: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.data = this.route.snapshot.data['data']; // Access preloaded data
    console.log("Page1 data received", this.data)
  }

  async makeHttpRequest(): Promise<void> {
    try {
      const response = await firstValueFrom(this.http.get('https://jsonplaceholder.typicode.com/posts'));
      console.log('call complete');
    } catch (error) {
      console.error('Error:', error);
    }
  }


}
