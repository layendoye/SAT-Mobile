import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {
  transaction:any;
  constructor(private transactionService: TransactionService,
               private navCtrl:NavController) { 
    this.transaction=this.transactionService.detailsTransaction;
    console.log(this.transaction)
    }

  ngOnInit() {}
  onReturn(){
    this.navCtrl.back();
  }
}
