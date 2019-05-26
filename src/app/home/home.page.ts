import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Facebook, FacebookLoginResponse, FacebookOriginal } from '@ionic-native/facebook';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    constructor(public fireAuth: AngularFireAuth) {
    }


    signOut() {
        this.fireAuth.auth.signOut().then(() => {
          location.href = '/home';
          console.log('Successfully logged out, see you nex time :)');
        }
        );
    }
}
