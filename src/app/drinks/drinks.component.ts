import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss'],
})

export class DrinksComponent implements OnInit {

  constructor(
    private rute: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() { 
     
  }


  goBack(): void {
    this.location.back();
  }

}