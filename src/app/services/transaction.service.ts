import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private urlBack='http://127.0.0.1:8000';
  token:string;
  detailsTransaction:any;
  constructor(private httpClient: HttpClient,private authService:AuthService) { 
    
  }
  envois(data:any){
    return this.postElement(data,"/transation/envoie");
  }
  retrais(data:any){//dans ce data il y a les values du formulaire certains etaient juste pour etre afficher
    data={
      code:data.code,
      nciRecepteur:data.nciRecepteur
    }
    return this.postElement(data,"/transation/retrait");
  }
  getInfoRetraits(code:string){
    const data={
      code:code
    }
    return this.postElement(data,"/info/transaction");
  }
  historiqueTransaction(data:any){
    const action=data.action;
    const idUser=data.idUser;
    data={
      dateDebut:data.dateDebut,
      dateFin:data.dateFin
    }
    const idEntrep=this.authService.user.idEntreprise;
    if(idUser==0)//toutes les transactions
      return this.postElement(data,"/transation/partenaire/"+action+"/"+idEntrep);
    else if(idUser>0)
      return this.postElement(data,"/transation/user/"+action+"/"+idUser);
    else
    return this.postElement(data,"/transations/partenaires/"+action);
  }
  getUserAffectation(){
    return this.getElement('/lister/users/all');
  }
  postElement(data:any,url:string){//return une promise
    this.token=this.authService.token;
    return new Promise<any>(
      (resolve,reject)=>{
      this.httpClient
        .post<any>(this.urlBack+url,data).subscribe(
          rep=>{
          resolve(rep);
          },
          error=>{
            console.log('Erreur : '+error.message);
            console.log(error.error.Erreur)
            reject(error);
          }
        );
      })
  }
  getElement(url:string){
    this.token=this.authService.token;
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
