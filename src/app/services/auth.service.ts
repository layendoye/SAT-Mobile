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
    guichetier:false
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
            this.storage.set('username', tokenDeco.username);
            this.user.username=tokenDeco.username;
            this.storage.set('roles', tokenDeco.roles);
            this.user.roles=tokenDeco.roles;
            this.getUserConnecte();
            this.Poste();
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
  this.storage.get('token').then(token=>{this.token = token
      if (this.token) {
        this.authenticate = true;
      } else {
        this.authenticate = false;
      }
      return this.authenticate;
    });
  }
  
  logout() {
    this.storage.remove("token");
    this.storage.remove("username");
    this.storage.remove("roles");
    this.storage.remove("idEntreprise");
    this.storage.remove("idUser");
    this.storage.remove("image");
  }
  getUserConnecte(){
    this.httpClient
      .get<any>(this.urlBack+'/userConnecte')
      .subscribe(
        (rep)=>{
          this.storage.set("idEntreprise",rep.entreprise.id);
          this.user.idEntreprise=rep.entreprise.id;
          this.storage.set("idUser",rep.id);
          this.user.id=rep.id;
          const roles=this.storage.get("roles");
          this.storage.set("image",rep.image);
          this.user.image=rep.image;
        },
        (error)=>{
          console.log('Erreur : '+error.message);
          
        }
      );
  }
  Poste(){
    this.storage.get('roles').then(
      roles=>{
        if(roles[0].search('ROLE_utilisateur')>=0){
          this.user.guichetier=true;
        }
        else{
          this.user.guichetier=false;
        }
      }
    )
  }
}
