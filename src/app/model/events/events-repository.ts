import { FirebaseDatabase } from '@angular/fire';
import { Observable, of } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, tap } from 'rxjs/operators';
import { Event } from './event';
import v4 from 'uuid/v4';

export default class EventRepository {
    constructor(private db: AngularFirestore) {}

    findAll(): Observable<Event[]> {
        return this.db.collection('events').snapshotChanges().pipe(
            tap(x => console.log(x)),
            map(x => x.map(srcEvent => {
                return {
                    id: srcEvent.payload.doc.id,
                    ...srcEvent.payload.doc.data()
                } as Event
            }),
            tap(x => console.log(x))
        ));
    }

    addEvent(event: Event): void {
        this.db.collection('events').add({
            id: v4(),
            ...event
        });
    }
}