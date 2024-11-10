import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class Properties {
  lazyLoad = true;
  skipLocationChange = true;
}
