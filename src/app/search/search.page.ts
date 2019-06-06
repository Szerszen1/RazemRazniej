import { Component, OnInit } from '@angular/core';
import { DrinkService } from '../providers/drink.service';
import { Drink } from '../model/drinks/drink';
import { Ingredient } from '../model/drinks/ingredient';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  
  searchMode: string = 'drink';
  drinks: Drink[];
  ingredients: Ingredient[];
  isSearching: boolean = false;
  
  constructor(
    private drinkProvider: DrinkService,
  ) { }

  ngOnInit() {
  }

  search(searchTerm) {
    if (searchTerm) {
      this.isSearching = true;

      if (this.searchMode == 'drink') {
        this.drinkProvider
          .getDrinksByName(searchTerm)
          .subscribe(res => {
            this.isSearching = false;
            this.drinks = res;
          })
      }
    }
    else {
      this.drinks = [];
    }
  }

}
