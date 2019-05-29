import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HomePage } from 'src/app/home/home.page';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.page.html',
  styleUrls: ['./drink.page.scss'],
})
export class DrinkPage implements OnInit {
  @ViewChild('myNav') nav: NavController;
  public rootPage: any = HomePage;

  constructor(
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  push() {
    this.navCtrl.back();
  }


}
