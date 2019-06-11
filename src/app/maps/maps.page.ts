import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { $ } from 'protractor';
import { AngularDelegate, Events } from '@ionic/angular';
import EventRepository from '../model/events/events-repository';
import { Router, RouterEvent } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
//import { Location } from '@angular/common';

declare var google;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements AfterViewInit {
  latitude: any;
  longitude: any;
  todo = {
    title: '',
    description: ''
  };

  pages = [
    {
      title: 'Home',
      url: '/home'
    },
    {
      title: 'Get Your Drink',
      url: '/recipe'
    },
    {
      title: 'Find Your Drink',
      url: '/search'
    },
  ];

  selectedPath = '';
  map: any;
  allEvents: any[];
  user: any;
  markers: any[] = [];

  @ViewChild('mapElement') mapNativeElement: ElementRef;
  constructor(public geolocation: Geolocation, private events: EventRepository, private router: Router, private auth: AngularFireAuth) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
    this.auth.authState.subscribe(user => {
      this.user =  {
        name: user.displayName,
        id: user.uid,
        mail: user.email
      };
    });
  }

  createMeeting(form) {
    console.log(this.todo, this.latitude, this.longitude);
  }

  clearMarkers() {
    this.markers.forEach(m => {
      m.setMap(null);
    });
    this.markers = [];
  }

  createEvent(): void {
    let x = {
      latitude: this.latitude,
      longitude: this.longitude,
      creator: this.user,
      ...this.todo
    };
    this.events.addEvent(x);
  }

  joinMeeting(event, id) {
    const e = this.allEvents.find(x => x.id === id);
    this.events.addAttendee(e.path, this.user);
    console.log('Dołączasz do wydarzenia: ' + id);
  }
  
  leaveMeeting(event, id) {
    const e = this.allEvents.find(x => x.id === id);
    this.events.removeAttendee(e.path, this.user);
    console.log('Opuszczasz wydarzenie: ' + id);
  }

  amIAttendee(id: any) {
    let e = this.allEvents.find(x => x.id === id);
    if (!e) return false;
    return ((e.attendees && e.attendees.length) ? !!e.attendees.find(x => x.id === this.user.id) : false);
  }

  private buildWindowString(element: any) {
    console.debug(element);
    return `
      <div id="content">
        <h1 class="firstHeading">${element.title}</h1>
        <div>
          <p>${element.description}</p>
        </div>
        <div>
          <p>Twórca: ${element.creator.name}</p>
        </div>
        <div>
         <h3>Uczestnicy</h3>
         <ul>
          ${(element.attendees && element.attendees.length) ? element.attendees.map(x => '<li>' + x.name + '</li>') : '-'}
         </ul>
         ${element.creator.id !== this.user.id ? ('<ion-button id="button_' + element.id + '">' + (this.amIAttendee(element.id) ? 'Opuść spotkanie' : 'Dołącz do spotkania') + '</ion-button>') : ''}
        </div>
      </div>
    `;
  }

  getEventsFromDB() {
    this.events.findAll().subscribe(list => {
      this.allEvents = list;
      console.debug('refreshing list', list);
      this.clearMarkers();
      this.addMyMarker();
      list.forEach(element => {
        this.addMarker(element.id, {
          lat: element.latitude,
          lng: element.longitude
        }, this.buildWindowString(element));
      });
    });
  }

  addMyMarker() {
    const position = {
      lat: this.latitude,
      lng: this.longitude,
      icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    };
    this.addMarker(0, position);
  }

  addMarker(id: any, markerData: any, windowData?: any) {
    const Marker = new google.maps.Marker;
    Marker.setPosition({ lat: markerData.lat, lng: markerData.lng });
    if (markerData.icon) {
      Marker.setIcon({url: markerData.icon});
    }
    Marker.setMap(this.map);
    if (windowData) {
      var infoWindow = new google.maps.InfoWindow({
        content: windowData
      });
      Marker.addListener('click', function () {
        infoWindow.open(this.map, Marker);
      });
      google.maps.event.addListener(infoWindow, 'domready', () => {
        const el = document.querySelector('#button_' + id);
        if (el) {
          el.addEventListener('click', (event) => this.amIAttendee(id) ? this.leaveMeeting(event, id) : this.joinMeeting(event, id));
        }
      });
    };
    this.markers.push(Marker);
  }

  ngAfterViewInit(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.map = new google.maps.Map(this.mapNativeElement.nativeElement, {
        center: { lat: this.latitude, lng: this.longitude },
        zoom: 15
      });
      this.getEventsFromDB();
      this.map.setCenter({
        lat: this.latitude,
        lng: this.longitude
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}