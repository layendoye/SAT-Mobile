import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  user:any;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.user=this.authService.user;
    console.log(this.authService.user);
  }
  
}
