import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  private urlBack='http://127.0.0.1:8000';//lors du deploiment mettre l ip de la machine
  constructor(private httpClient: HttpClient) { }

  getComptesEntreprise(id:number){
    return this.getElement('/compte/entreprise/'+id);
  }
  getUsersDuCompte(id:number){
    return this.getElement("/utilisateur/affecterCompte/"+id);
  }
  postElement(data:any,url:string){//return une promise
    return new Promise<any>(
      (resolve,reject)=>{
      this.httpClient
        .post<any>(this.urlBack+url,data).subscribe(
          rep=>{
          resolve(rep);
          },
          error=>{
            console.log('Erreur : '+error.message);
            reject(error);
          }
        );
    })
  }
  getElement(url:string){
    return new Promise<any>(
      (resolve,reject)=>{
      this.httpClient
        .get<any>(this.urlBack+url).subscribe(
          rep=>{
            resolve(rep);
          },
          error=>{
            console.log('Erreur : '+error.message);
            reject(error);
          }
        );
      })
  }
}
