import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
declare var google;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit, AfterContentInit {
  map;
  @ViewChild('mapElement') mapElement;
  constructor() { }


  ngOnInit(): void{
  }

  ngAfterContentInit(): void{
    console.log("Welcome to Kraków");
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      {
        center: {lat: 50.064, lng: 19.944},
        zoom: 14,  
      }
    );
  }

}
