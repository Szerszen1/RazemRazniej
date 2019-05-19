import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Drinks, Drink } from './drinks/model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public getRandomDrink(): Observable<Drinks> {
    return this.http.get<Drinks>('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  }
}
