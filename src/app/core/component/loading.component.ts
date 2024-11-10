import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingComponent {
  private spinnerVisible = false;

  show() {
    if (!this.spinnerVisible) {
      this.spinnerVisible = true;
      console.log('Spinner shown');  // Replace with actual spinner logic
    }
  }

  hide() {
    if (this.spinnerVisible) {
      this.spinnerVisible = false;
      console.log('Spinner hidden');  // Replace with actual spinner logic
    }
  }
}
