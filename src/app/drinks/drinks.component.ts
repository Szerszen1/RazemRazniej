import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { CocktailOverviewRaw } from './model';
import { HttpService } from '../http.service';
import { debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss'],
})

export class DrinksComponent implements OnInit {

  /* Ingredient Search <start> */
  /* private searchTerm$ = new BehaviorSubject<string>('');
  public ingredients$: Observable<string[]>; */
  /* Ingredient Search <end> */
  
  /* public selectedIngredient = '';
  public selectedIngredient$ = new BehaviorSubject<string>('');

  public cocktails$: Observable<CocktailOverviewRaw[]>; */

  constructor(
    private rute: ActivatedRoute,
    private location: Location,
    //private cocktailService: HttpService,
  ) { }

  ngOnInit() { 
     /* Ingredient Search <start> */
   /*   this.ingredients$ = this.searchTerm$
     .pipe(
       debounceTime(250),
       distinctUntilChanged(),
       map(term => (term || '').trim().toLowerCase()),
       tap(term => console.log(`Term: [${term}]`)),
       switchMap(term => 
         this.cocktailService.findIngredients(term)
       ),
     ); */
   /* Ingredient Search <end> */
 
   /*   this.cocktails$ = this.selectedIngredient$
     .pipe(
       tap(console.log),
       distinctUntilChanged(),
       switchMap(ingredient => this.cocktailService.getCocktails(ingredient))
     ) */
  }

   /* Ingredient Search <start> */
  /*  search(value: string) {
    this.searchTerm$.next(value);
  } */
  /* Ingredient Search <end> */

  /* updateCocktailList(ingredient: string) {
    this.selectedIngredient$.next(ingredient);
  } */


  goBack(): void {
    this.location.back();
  }

}