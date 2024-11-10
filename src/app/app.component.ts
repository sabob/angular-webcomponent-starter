import {Component, Input} from '@angular/core';
import {RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {fadeAnimation} from "./core/animation/fade.animation";
import {Properties} from "./core/store/Properties";
import { LoaderComponent } from "./core/component/loader/loader.component";

@Component({
  selector: 'my-ng',
  standalone: true,
  animations: [fadeAnimation],
  imports: [RouterOutlet, RouterLink, RouterModule, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @Input("title") title !: string;

   constructor(public properties: Properties) {
//    this.title = 'My App';
  }

  animateRoute(outlet: RouterOutlet) {
    let activated = outlet?.isActivated ? outlet?.activatedRoute : {}
    return activated;
  }

  protected readonly Properties = Properties;
}
