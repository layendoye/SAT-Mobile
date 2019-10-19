import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  histoForm: FormGroup;
  histoGuichetier
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService:AuthService,
              private storage: Storage) {}

  ngOnInit() {
    this.initForm();
  }
   initForm(){
    var id=0;
    console.log(this.authService.user);
    /*if(this.authService.guichetier){
      id=(+localStorage.getItem("idUser"));
      this.histoGuichetier=true
    }

    const now=new Date();
    this.histoForm=this.formBuilder.group({   
      dateDebut:[now,[Validators.required]],
      dateFin:[now,[Validators.required]],
      idUser:[id,[Validators.required]],
      action:['envois',[Validators.required]],
    });*/
    this.histoForm=this.formBuilder.group({   
      dateDebut:['',[Validators.required]],
      dateFin:['',[Validators.required]],
      idUser:['',[Validators.required]],
      action:['',[Validators.required]],
    });
  }
  onSubmit(){}
}
