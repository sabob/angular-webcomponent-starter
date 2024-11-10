import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../service/loader.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  spinnerVisible$!: Observable<boolean>;  // Use the non-null assertion

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.spinnerVisible$ = this.loaderService.visible$;  // Initialize in ngOnInit
  }
}
