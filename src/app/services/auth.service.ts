import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Storage} from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService;
  public authenticate: boolean;
  public token: string;
  constructor(private httpClient: HttpClient,private storage: Storage) { }
  login(username:string,password:string){//ne pas factoriser
    const data={
      username: username,
      password: password
    };
    return new Promise(
      (resolve, reject)=>{
      this.httpClient
        .post<any>('http://127.0.0.1:8000/connexion',data)
        .subscribe(
          (rep)=>{
            console.log(rep)
            localStorage.setItem('token', rep.token);
            const tokenDeco=this.jwtHelper.decodeToken(rep.token);
            localStorage.setItem('username', tokenDeco.username);
            localStorage.setItem('roles', tokenDeco.roles);
            this.authenticate = true;
            resolve();
          },
          (error)=>{
            this.authenticate = false;
            reject(error);
          }
        );
      })
  }
  public loadToken() {
    this.token = localStorage.getItem('token');
    console.log(this.token);
    if (this.token) {
      this.authenticate = true;
    } else {
      this.authenticate = false;
    }
    return this.authenticate;
  }
  logout() {
    localStorage.clear();
  }
}
