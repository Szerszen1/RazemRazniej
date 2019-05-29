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

  constructor(
    private rute: ActivatedRoute,
    private location: Location,
    private cocktailService: HttpService,
  ) { }

  ngOnInit() { 
  }

  goBack(): void {
    this.location.back();
  }

}