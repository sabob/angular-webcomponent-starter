import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private visible = false;

  show() {
    if (!this.visible) {
      this.visible = true;
      console.log('Spinner shown');  // Replace with actual spinner logic
    }
  }

  hide() {
    if (this.visible) {
      this.visible = false;
      console.log('Spinner hidden');  // Replace with actual spinner logic
    }
  }
}
