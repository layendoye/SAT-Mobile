import { Component, OnInit } from '@angular/core';
import { ListPage } from '../list.page';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {
  transaction:any;
  constructor(private list:ListPage,
               private navCtrl:NavController) { 
    this.transaction=this.list.listDetails;console.log(this.transaction)
    }

  ngOnInit() {}
  onReturn(){
    this.navCtrl.back();
  }
}
