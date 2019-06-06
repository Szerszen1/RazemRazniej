import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { $ } from 'protractor';
import { AngularDelegate, Events } from '@ionic/angular';
import EventRepository from '../model/events/events-repository';
import { Router, RouterEvent } from '@angular/router';
//import { Location } from '@angular/common';

declare var google;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit, AfterViewInit {
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
      title: 'Maps',
      url: '/maps'
    },
  ];

  selectedPath ='';

  @ViewChild('mapElement') mapNativeElement: ElementRef;
  constructor(public geolocation: Geolocation, private events: EventRepository, private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
  })
   }

  ngOnInit() {

    this.events.findAll().subscribe(list => {
      console.log(list);
    })
  }

  createMeeting(form){
    console.log(this.todo, this.latitude, this.longitude);
  }

  createEvent():  void {
    console.log(this.todo);
    this.events.addEvent({
      id: '111',
      ...this.todo
    })
  }

  joinMeeting(event, id){
        // this.events.addEvent({
    //   title: 'titit0',
    //   description: 'desc',
    //   id: '123'
    // });
    
    console.log('Dołączasz do wydarzenia: ' + id)
  }

  allMeetings(map): void{
    var meetings = [
      {
        id: 1,
        name: 'Fenix',
        latitude: 50.062851,
        longitude: 19.938042,
        description: 'Klub muzyczny Fenix'
      },
      {
        id: 2,
        name: 'Wawel',
        latitude: 50.054239,
        longitude: 19.935434,
        description: 'Zamek Królewski na Wawelu'
      }
    ]

      meetings.forEach(element => {
        var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">' + element.name + '</h1>'+
        '<div id="bodyContent">'+
        '<p>' + element.description + '</p>'+
        '</div>'+
        '<ion-button id="button_'+element.id+'">Dołącz do spotkania</ion-button>' +
        '</div>';
  
        var infoWindow = new google.maps.InfoWindow({
          content: contentString
        });
        const Marker = new google.maps.Marker;
        const position = {
          lat: element.latitude,
          lng: element.longitude
        }
        console.log(position);
        
      /**  infoWindow.setPosition(pos);
        infoWindow.setContent('You are here');
        infoWindow.open(map)**/
        Marker.setPosition(position);
        Marker.setMap(map);
        // Marker.setContent('You Are here')
        Marker.addListener('click', function() {
          infoWindow.open(map, Marker);
        });
        google.maps.event.addListener(infoWindow, 'domready', () => {
          const el = document.querySelector('#button_'+element.id);
          el.addEventListener('click', (event) => this.joinMeeting(event, element.id));
        });
    
      
    });

  }

  ngAfterViewInit(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      const mapDiv = document
      const map = new google.maps.Map(this.mapNativeElement.nativeElement, {
        center: {lat: this.latitude, lng: this.longitude},
        zoom: 15
      });

  this.allMeetings(map);

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
      // Marker.setContent('You Are here')
      map.setCenter(position);
    }).catch((error) => {
      console.log('Error getting location', error);
    });


  }

  }