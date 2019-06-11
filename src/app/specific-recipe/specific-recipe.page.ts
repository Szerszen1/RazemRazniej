import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DrinkService } from '../providers/drink.service';
import { Drink } from '../model/drinks/drink';

@Component({
  selector: 'app-specific-recipe',
  templateUrl: './specific-recipe.page.html',
  styleUrls: ['./specific-recipe.page.scss'],
})
export class SpecificRecipePage implements OnInit {

  
  drink: Drink = new Drink('', '', '', false, '', '', '', []);
  passedDrink = null;

  constructor(private activatedRoute: ActivatedRoute, public drinkProvider: DrinkService) { }

  ngOnInit() {
    this.passedDrink = this.activatedRoute.snapshot.paramMap.get('drink');
    this.drinkProvider
    .getDrinkById(this.passedDrink || '12091')
    .subscribe(res => this.drink = res)
  }

}
