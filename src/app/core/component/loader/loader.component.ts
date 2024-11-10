import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../service/loader.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { fadeAnimation } from '../../animation/fade.animation';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [fadeAnimation],
})
export class LoaderComponent implements OnInit {

  spinnerVisible$!: Observable<boolean>;  // Observable for spinner visibility

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.spinnerVisible$ = this.loaderService.visible$;  // Initialize spinner visibility observable
  }
}
