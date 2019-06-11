import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Facebook, FacebookLoginResponse, FacebookOriginal } from '@ionic-native/facebook';
import { url } from 'inspector';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
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
  
    constructor(public fireAuth: AngularFireAuth, private router: Router) {
      this.router.events.subscribe((event: RouterEvent) => {
          this.selectedPath = event.url;
      })
    }

    doRefresh(event) {
      console.log('Begin async operation');
  
      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
        this.router;
        this.selectedPath
      }, 1000);
    }

    ngOnInit(){

    }

    signOut() {
        this.fireAuth.auth.signOut().then(() => {
          location.href = '/home';
          console.log('Successfully logged out, see you nex time :)');
        }
        );
    }
}
