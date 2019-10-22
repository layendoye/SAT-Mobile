import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  sendForm: FormGroup;
  envois=true;
  code:string='';
  info:any;
  isTransaction:any;
  frais:any=0;
  avecFrais:any;
  constructor(private formBuilder: FormBuilder,
              private transactionService:TransactionService,
              private router: Router,
              private alertCtrl: AlertController) { }
  ValidationMsg = {
    'nomClientEmetteur': [
      { type: 'required', message: 'Le nom du client emetteur est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer un nom valide' }
    ],
    'telephoneEmetteur': [
      { type: 'required', message: 'Le numéro de téléphone de l\'emetteur est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer un numéro téléphone valide' }
    ],
    'nciEmetteur': [
      { type: 'required', message: 'Le nci du recepteur est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer un nci valide' }
    ],
    'nomClientRecepteur': [
      { type: 'required', message: 'Le nom du client recepteur est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer un nom valide' }
    ],
    'telephoneRecepteur': [
      { type: 'required', message: 'Le numéro de téléphone du recepteur est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer un numéro de téléphone valide' }
    ],
    'montant': [
      { type: 'required', message: 'Le montant est obligatoire' },
      { type: 'min', message: 'Montant minimum 500 fr' },
      { type: 'max', message: 'Montant maximum 3 000 000 fr' },
      { type: 'pattern', message: 'Rentrer un montant valide' }
    ],
    'code': [
      { type: 'required', message: 'Le code est obligatoire' },
      { type: 'minlength', message: 'Entrer un code valide (Ex: xxxx xxxx xxxxx)' },
      { type: 'pattern', message: 'Le code ne doit contenir que des chiffres' }
    ],
    'nciRecepteur': [
      { type: 'required', message: 'Le nci est obligatoire' },
      { type: 'minlength', message: 'Vous devez remplir au moins 2 caracteres' },
      { type: 'pattern', message: 'Rentrer un nci valide' }
    ]
  }
  ngOnInit() {
    this.initForm();
  }
  initForm(){
     this.sendForm=this.formBuilder.group({   
      nomClientEmetteur:['',[Validators.required,Validators.minLength(2),Validators.pattern(/[a-z-A-Z]/)]],
      telephoneEmetteur:['',[Validators.required,Validators.pattern(/[0-9]/),Validators.minLength(2)]],
      nciEmetteur:['',[Validators.required,Validators.minLength(2),Validators.pattern(/[0-9]/)]],
      nomClientRecepteur:['',[Validators.required,Validators.minLength(2),Validators.pattern(/[a-z-A-Z]/)]],
      telephoneRecepteur:['',[Validators.required,Validators.pattern(/[0-9]/),Validators.minLength(2)]],
      montant:['',[Validators.required,Validators.pattern(/[0-9]/),Validators.min(500),Validators.max(3000000)]],
      code:[this.code /*ne pas enlevé*/,[Validators.required,Validators.minLength(16),Validators.pattern(/[0-9]/)]],
      nciRecepteur:['',[Validators.required,Validators.minLength(2),Validators.pattern(/[0-9]/)]],
      frais:[this.frais]
    });
  }
  initForm2(){
    this.sendForm=this.formBuilder.group({   
      nomClientEmetteur:[this.info.nomClientEmetteur,[Validators.required,Validators.minLength(2),Validators.pattern(/[a-z-A-Z]/)]],
      telephoneEmetteur:[this.info.telephoneEmetteur,[Validators.required,Validators.pattern(/[0-9]/),Validators.minLength(2)]],
      nciEmetteur:['',[Validators.required,Validators.minLength(2),Validators.pattern(/[0-9]/)]],
      nomClientRecepteur:[this.info.nomClientRecepteur,[Validators.required,Validators.minLength(2),Validators.pattern(/[a-z-A-Z]/)]],
      telephoneRecepteur:[this.info.telephoneRecepteur,[Validators.required,Validators.pattern(/[0-9]/),Validators.minLength(2)]],
      montant:[this.info.montant,[Validators.required,Validators.pattern(/[0-9]/),Validators.min(500),Validators.max(3000000)]],
      code:[this.code,[Validators.required,Validators.minLength(16),Validators.pattern(/[0-9]/)]],
      nciRecepteur:['',[Validators.required,Validators.minLength(2),Validators.pattern(/[0-9]/)]],
      frais:[this.frais]
    });
  }

  onSwitch(event: CustomEvent<SegmentChangeEventDetail>){
    if(event.detail.value.search("retrait")>=0){
      this.envois=false;
      this.initForm();
    }
    else{
      this.envois=true;
      this.initForm();
    }
  }
  onSubmit(){
    if(this.envois){
      const data={
        nomClientEmetteur : this.sendForm.value.nomClientEmetteur,
        telephoneEmetteur : this.sendForm.value.telephoneEmetteur,
        nciEmetteur       : this.sendForm.value.nciEmetteur,
        nomClientRecepteur: this.sendForm.value.nomClientRecepteur,
        telephoneRecepteur: this.sendForm.value.telephoneRecepteur,
        montant           : this.sendForm.value.montant
      }
      if(this.avecFrais){
        data.montant-=this.frais;
      }
      this.transactionService.envois(data).then(
        rep=>{
          if(rep[0] && rep[0].property_path)
              this.boiteDialog(rep);
          else
            this.boiteDialog("Transaction réussie");
            this.router.navigateByUrl("/list");
        },
        error=>{
          console.log('Erreur : '+error.message);
          this.boiteDialog(error.error.message);
        }
      );
    }
    else{//si retrais
      this.transactionService.retrais(this.sendForm.value).then(
      rep => {
        if(rep[0] && rep[0].property_path)
              this.boiteDialog(rep);
          else
            this.boiteDialog("Transaction réussie");
            this.router.navigateByUrl("/list");
      },
      error=>{
        console.log('Erreur : '+error.message);
        if(error.message.search('403')>=0)
          this.boiteDialog('Montant déja retiré !')
      }
    )
    }
  }
  entrerCode(code:string){
    this.transactionService.getInfoRetraits(code).then(
      rep=>{//si le compte n existe pas rep = null
        if(rep){
          this.code=code;
          this.info=rep;
          this.isTransaction=true;
          console.log(rep);
          this.initForm2();
        }else if(code.length>=16){
          this.boiteDialog('Le code de transaction n\' existe pas')
        }
      },
      error=>{
        console.log(error);
      }
    )
  }
  modifCode(code:string){
    this.code=code;
    this.isTransaction=false;
    this.info=null;
    this.initForm();
    this.entrerCode(code);
  }
  async boiteDialog(message:string){
    const alert = await this.alertCtrl.create({
      message: message,
      buttons: [{text: 'Ok'}]
    });
    await alert.present();
  }
  getFrais(montant:number){
    let data={montant:montant};
    this.transactionService.getFrais(data).then(
      rep=>{
        console.log(rep);
        this.frais=rep;
      },
      error=>{
        console.log(error);
        this.boiteDialog("Veuillez saisir un montant valide !");
      }
    )
  }
  toggleFrais(value){
    this.avecFrais=value.detail.checked;
  }
}
