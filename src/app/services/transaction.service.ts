import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private headers={headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))};
  private urlBack='http://127.0.0.1:8000';

  constructor(private httpClient: HttpClient) { }
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
    const idEntrep=localStorage.getItem("idEntreprise");
    if(idUser==0)//toutes les transactions
      return this.postElement(data,"/transation/partenaire/"+action+"/"+idEntrep);
    else if(idUser>0)
      return this.postElement(data,"/transation/user/"+action+"/"+idUser);
    else
    return this.postElement(data,"/transations/partenaires/"+action);
  }

  postElement(data:any,url:string){//return une promise
    return new Promise<any>(
      (resolve,reject)=>{
      this.httpClient
        .post<any>(this.urlBack+url,data,this.headers).subscribe(
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
    return new Promise<any>(
      (resolve,reject)=>{
      this.httpClient
        .get<any>(this.urlBack+url,this.headers).subscribe(
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
