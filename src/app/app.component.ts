import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  public appPages = [
    {title: 'Home', url: '/home', icon: 'home'},
    {title: 'Historique', url: '/list', icon: 'list'},
    {title: 'Déconnexion', url: '/login', icon: 'log-out'}
  ];
  authenticated=true;
  jwtHelper = new JwtHelperService();
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService:AuthService,
    private router:Router
  ) {
    this.initializeApp();
  }
   ngOnInit() {
    this.login();
    this.tokenExpire();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.login();
      this.tokenExpire();
    });
  }
  private login(){
    this.authenticated=this.authService.authenticate;
    console.log(this.authenticated)
    if(this.authenticated){
      this.router.navigateByUrl("/list");
    }
    else
      this.router.navigateByUrl("/login");
  }
  tokenExpire(){
    const token=this.authService.token;
    if( this.authenticated && this.jwtHelper.isTokenExpired(token)){
      this.authService.logout();
      window.location.reload();
    }
  }
}
