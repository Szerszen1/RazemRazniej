import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit, AfterViewInit {
  latitude: any;
  longitude: any;
  @ViewChild('mapElement') mapNativeElement: ElementRef;
  constructor(private geolocation: Geolocation) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
        center: {lat: this.latitude, lng: this.longitude},
        zoom: 14
      });
     /** const infoWindow = new google.maps.InfoWindow;
      const pos = {
        lat: this.latitude,
        lng: this.longitude
      };**/
      const Marker = new google.maps.Marker;
      const position = {
        lat: this.latitude,
        lng: this.longitude
      }
      console.log(position);
      
    /**  infoWindow.setPosition(pos);
      infoWindow.setContent('You are here');
      infoWindow.open(map)**/
      Marker.setPosition(position);
      Marker.setMap(map);
      Marker.setContent('You Are here')
      map.setCenter(position);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}