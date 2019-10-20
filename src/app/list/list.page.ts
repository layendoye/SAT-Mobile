import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { TransactionService } from '../services/transaction.service';
import { AlertController, IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  afficher=false;
  histoForm: FormGroup;
  transactions:any[]=[];
  users:any[]=[];
  errorDate:string;
  lesDeux:boolean=false;

  afficherEnvois:boolean=false;
  afficherRetraits:boolean=false;


  histoGuichetier=false;
  constructor(private formBuilder: FormBuilder,
              private transactionService: TransactionService,
              private router: Router,
              private authService:AuthService,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.getUser();//le formulaire est initialisé dans la fonction
  }
  initForm(){
    var id="0";
    console.log(this.authService.user)
    if(this.authService.user.guichetier){
      console.log("ooooooooooo")
      id=this.authService.user.id.toString();
      this.histoGuichetier=true
    }
    const now=new Date().toDateString();
    console.log(now);
    this.histoForm=this.formBuilder.group({   
      dateDebut:[now,[Validators.required]],
      dateFin:[now,[Validators.required]],
      idUser:[id,[Validators.required]],
      action:['envois',[Validators.required]],
    });
    this.afficher=true;
  }
  getInfoTransaction(data:any){
    console.log(data);
    this.transactionService.historiqueTransaction(data).then(
      response=>{
        console.log(response);
        this.transactions=response;
        if(data.action=="envois"){  
          this.afficherEnvois=true;
          this.afficherRetraits=false;
        }
        else{
          this.afficherRetraits=true;
          this.afficherEnvois=false;
        }
      },
      error=>{
        console.log(error);
        if(error.message.search('404')>=0){
          this.errorBox('Auccune transaction trouvée!')
        }
      }
    );
  }

  onSubmit(numero:number){
    this.lesDeux=false;
    this.afficherEnvois=false;
    this.afficherRetraits=false;
    this.errorDate='';
    var text;
    if(numero==1){
       text='début';
    }
    else{
      text='fin';
    }

    if(new Date(this.histoForm.value.dateDebut)>new Date() || new Date(this.histoForm.value.dateFin)>new Date()){//si une des 2 dates est superieurs à celle d aujourd hui
      this.errorDate=text;
      this.errorBox('la date de '+text+' est supérieure à la date d\'aujourd\'hui !')
    }
    else if(new Date(this.histoForm.value.dateDebut)>new Date(this.histoForm.value.dateFin)){
      this.errorBox('la date de début est supérieure à la date de fin !')
      this.lesDeux=true;
    }
    else{
      this.getInfoTransaction(this.histoForm.value);
    }
  }
  getUser(){
    this.transactionService.getUserAffectation().then(//pour le select des users
      users=>{
        console.log(users)
        this.users=users;
        this.initForm();
      },error=>{
        console.log('Erreur : '+error)
      }
    );
  }
  async errorBox(message:string){
    const alert = await this.alertCtrl.create({
      message: message,
      buttons: [{text: 'Ok'}]
    });
    await alert.present();
  }
  onDetails(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', offerId]);
    console.log('Editing item', offerId);
  }
}
