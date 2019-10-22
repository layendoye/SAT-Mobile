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
    {title: 'Profil', url: '/profil', icon: 'contact'},
    {title: 'Historique', url: '/list', icon: 'list'},
    {title: 'Transaction', url: '/transaction', icon: 'ios-infinite'},
    {title: 'Compte', url: '/list-compte', icon: 'grid'},
    {title: 'Déconnexion', url: '/login', icon: 'log-out'}
  ];
  authenticated=false;
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
  ngOnInit(){}

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.login();
    });
  }
  private login(){
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
      this.router.navigateByUrl("/login");
    }
  }
  onMenuItem(m) {
    this.authenticated=this.authService.authenticate;
    this.tokenExpire();
    console.log(this.authenticated)
    if (m.url === '/login') {
      this.authService.logout();
    } 
    /*else if (m.url === 'Exit') {
      navigator['app'].exitApp();
    }*/
    this.router.navigateByUrl(m.url);
  }
}
