import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/Storage';
import { Drink } from '../model/drinks/drink';
import { NavController } from '@ionic/angular';
import { DrinkService } from '../providers/drink.service';
import { Route } from '@angular/compiler/src/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {
  
  pages = [
    {
      title: 'Home',
      url: '/home'
    },
    {
      title: 'Find Your Event',
      url: '/maps'
    },
    {
      title: 'Find Your Drink',
      url: '/search'
    },
  ];

  drink: Drink = new Drink('', '', '', false, '', '', '', []);
  isStarred: boolean = false;
  stars: string[] = [];
  measurement: string = 'metric';
  selectedPath ='';
  constructor(public navCtrl: NavController, public drinkProvider: DrinkService, public storage: Storage,  private router: Router) { 
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
  })
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
      this.router;
      this.selectedPath
    }, 1000);
  }

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
