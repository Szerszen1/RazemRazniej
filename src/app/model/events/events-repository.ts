import { FirebaseDatabase } from '@angular/fire';
import { Observable, of } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, tap } from 'rxjs/operators';
import { Event } from './event';
import v4 from 'uuid/v4';
import { threadId } from 'worker_threads';

export default class EventRepository {
    constructor(private db: AngularFirestore) {}

    findAll(): Observable<Event[]> {
        return this.db.collection('events').snapshotChanges().pipe(
            tap(x => console.log(x)),
            map(x => x.map(srcEvent => {
                return {
                    id: srcEvent.payload.doc.id,
                    path: srcEvent.payload.doc.id,
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

    addAttendee(path: string, user: any) {
        let item = this.db.collection('events').doc(path);
        let s = item.valueChanges().subscribe((i: any) => {
            let attendees = i.attendees || [];
            attendees.push(user);
            console.debug(attendees);
            item.update({attendees: attendees});
            s.unsubscribe();
        });
        console.debug(item);
    }

    removeAttendee(path: string, user: any) {
        let item = this.db.collection('events').doc(path);
        let s = item.valueChanges().subscribe((i: any) => {
            let attendees = i.attendees || [];
            attendees = attendees.filter(x => x.id !== user.id);
            item.update({attendees: attendees});
            s.unsubscribe();
        });
        console.debug(item);
    }
}