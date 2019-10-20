import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Storage} from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public token: string;
  guichetier=false;
  admin;
  user={
    id:0,
    username:'',
    roles:[],
    idEntreprise:0,
    image:'',
    guichetier:false,
    accessDenied:false
  }
  private urlBack='http://127.0.0.1:8000';
  jwtHelper = new JwtHelperService;
  public authenticate: boolean;
  
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
            this.token = rep.token
            this.storage.set('token', this.token);
            const tokenDeco=this.jwtHelper.decodeToken(this.token);
            this.user.username=tokenDeco.username;
            this.user.roles=tokenDeco.roles;
            this.Poste();
            this.getUserConnecte();
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
    this.storage.get('token').then(token=>{
      this.token = token
      if (this.token) {
        this.authenticate = true;
      } else {
        this.authenticate = false;
      }
      this.storage.get('user').then(user=>this.user=user);
      return this.authenticate;
    });
  }
  
  logout() {
    this.authenticate=false;
    this.storage.remove("token");
    this.storage.remove("user");
  }
  getUserConnecte(){
    this.httpClient
      .get<any>(this.urlBack+'/userConnecte')
      .subscribe(
        (rep)=>{
          this.user.idEntreprise=rep.entreprise.id;
          this.user.id=rep.id;
          this.user.image=rep.image;
          this.storage.set("user",this.user);
        },
        (error)=>{
          console.log('Erreur : '+error.error.message);
        }
      );
  }
  Poste(){
    if(this.user.roles[0].search('ROLE_Super-admin')>=0 || this.user.roles[0].search('ROLE_Caissier')>=0 ){
      this.user.accessDenied=true;
      this.logout();
    }
    else
      this.user.accessDenied=false;
      
    if(this.user.roles[0].search('ROLE_utilisateur')>=0)
      this.user.guichetier=true;
    else
      this.user.guichetier=false;
  }
      
    
}
