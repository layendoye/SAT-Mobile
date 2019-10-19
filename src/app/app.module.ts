import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {IonicStorageModule} from '@ionic/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AuthService} from './services/auth.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './services/auth-guard.service';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    IonicStorageModule.forRoot({
        name: 'SAT', // nom bdd
        driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    ReactiveFormsModule,//pour les forms ne pas oublier de l importer sur les modules des pages
    FormsModule,//pour les forms 
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
