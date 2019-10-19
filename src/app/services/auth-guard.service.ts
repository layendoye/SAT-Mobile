import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})//pour injecter un service dans un autre il faut utiliser le décorateur @Injectable()
export class AuthGuard implements CanActivate{
    
    constructor(private router: Router,
                private storage: Storage,
                private authService:AuthService){

    }
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {//il va return soit un  Observable qui sera de type boolean soit ...un observable est un objet qui emmet des infos dans le temps
        if(!this.authService.authenticate){
            this.router.navigateByUrl("/login");
        }
        return true;
    }
}