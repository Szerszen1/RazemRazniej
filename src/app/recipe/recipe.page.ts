import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { Drink } from '../model/drinks/drink';
import { NavController } from '@ionic/angular';
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

  constructor(public navCtrl: NavController, public drinkProvider: DrinkService, public storage: Storage) { }

  ionViewDidLoad() {
    this.drinkProvider
      .getRandomDrink().subscribe(res => this.drink = res)
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
    this.drinkProvider
      .getRandomDrink().subscribe(res => this.drink = res)
  }

}
