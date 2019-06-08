import { Component, OnInit } from '@angular/core';
import { Drink } from '../model/drinks/drink';
import { NavController, NavParams } from '@ionic/angular';
import { DrinkService } from '../providers/drink.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {

  drink: Drink = new Drink('', '', '', false, '', '', '', []);
  isStarred: boolean = false;
  stars: string[] = [];
  measurement: string = 'metric';

  constructor(public navCtrl: NavController, public navParams: NavParams, public drinkProvider: DrinkService, public storage: Storage) { }

  ionViewDidLoad() {
    this.storage
      .get('STARS')
      .then(res => {
        this.stars = res || []
        if (this.stars.indexOf(this.navParams.get('drinkId')) > -1) this.isStarred = true
      })

    this.drinkProvider
      .getDrinkById(this.navParams.get('drinkId') || '12091')
      .subscribe(res => this.drink = res)
  }

  toggleStarred(drinkId: string) {
    if (this.isStarred) {
      this.stars.splice(this.stars.indexOf(this.drink.id), 1)
    }
    else {
      this.stars.push(drinkId)
    }

    this.isStarred = !this.isStarred;
    this.storage.set('STARS', this.stars);
  }
  
  ngOnInit() {
  }

}
