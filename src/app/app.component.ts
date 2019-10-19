import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {title: 'Home', url: '/home', icon: 'home'},
    {title: 'List', url: '/list', icon: 'list'},
    {title: 'Déconnexion', url: '/login', icon: 'log-out'}
  ];
  authenticated;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService:AuthService,
    private router:Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.login();
    });
  }
    private login(){
    this.authenticated=this.authService.loadToken();
    if(this.authenticated){
      this.router.navigateByUrl("/home");
    }
    else
      this.router.navigateByUrl("/login");
  }
}
