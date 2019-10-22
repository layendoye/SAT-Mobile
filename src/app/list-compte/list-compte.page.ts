import { Component, OnInit } from '@angular/core';
import { EntrepriseService } from '../services/entreprise.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-list-compte',
  templateUrl: './list-compte.page.html',
  styleUrls: ['./list-compte.page.scss'],
})
export class ListComptePage implements OnInit {
  listeComptes:any;
  afficherInfo:any;
  usersCompte:any;
 constructor(private entrepriseService:EntrepriseService,
             private router:Router,
             private authService:AuthService) { }
  ngOnInit() {
    this.getComptes();
  }
  getComptes(){
    const idPart=this.authService.user.idEntreprise;
    this.entrepriseService.getComptesEntreprise(+idPart).then(
      rep=>{
        this.listeComptes=rep;
        console.log(rep);
      },
      error=>console.log(error)
    );
  }
  getUserEncour(id:number){
    this.entrepriseService.getUsersDuCompte(id).then(
      rep=>{
        this.afficherInfo=true;
        this.usersCompte=rep;
        console.log(rep);
      },
      error=>console.log(error)
    );
    
  }
  nmbrUser(id){
    var nombre=0;
    this.entrepriseService.getUsersDuCompte(id).then(
      rep=>{
        nombre=rep.length
        
      },
      error=>console.log(error)
    );
    return nombre;
  }
    onDetails(listeCompte: string, slidingItem: IonItemSliding) {
    slidingItem.close();
  }

}
