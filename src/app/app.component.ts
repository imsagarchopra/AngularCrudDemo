import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router,Event, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularCrudDemo';
  showLoadingIndicator : boolean = true;
  constructor(private _router: Router){
    this._router.events.subscribe((routerEvent: Event) => {
      if(routerEvent instanceof NavigationStart){
        this.showLoadingIndicator = true;
      }
      if(routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError){
        this.showLoadingIndicator = false;
      }    
    });
  }
}
