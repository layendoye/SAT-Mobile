import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLoading=false;
  constructor(private router: Router,
              private authService: AuthService,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.authService.logout();
  }
  onLogin(value:any){
    this.isLoading=true;
    let res=this.authService.login(value.username,value.password).then(
      res => {
        setTimeout(()=>{},1500)
        if(!this.authService.user.accessDenied)
          this.router.navigateByUrl('/list');
        else
          this.errorLogin("Veuillez utiliser l'application web !");
        this.isLoading=false;
      },
      error => {
         this.isLoading=false;
        console.log(error.error)
        if(error.error.code===401){
          this.errorLogin('Erreur sur le login ou le mot de passe');
        }
        else if(error.error.status===403){
          this.errorLogin(error.error.message);
        }
      }
    );
  }
  async errorLogin(message:string){
    const alert = await this.alertCtrl.create({
      message: message,
      buttons: [{text: 'Ok'}]
    });
    await alert.present();
  }
}
