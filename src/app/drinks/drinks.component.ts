import { Component, OnInit, Input, IterableDiffers } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Drink } from '../model/drinks/drink';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss'],
})

export class DrinksComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  /*
  @Input()
  drinks: Drink[];

  displayDrinks: Drink[] = [];
  iterableDiffer;
*/
  constructor(private iterableDiffers: IterableDiffers, public navCtrl: NavController) {
    //this.iterableDiffer = this.iterableDiffers.find([]).create(null);
  }
/*
  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.drinks);
    if (changes) {
      this.drinks = changes.collection;
      this.displayDrinks = this.drinks.slice(0, 20);
    }
  }

  showMoreDrinks(infinite) {
    this.displayDrinks = this.displayDrinks.concat(this.drinks.slice(this.displayDrinks.length, this.displayDrinks.length + 20))
    infinite.complete()
  }
  */
}