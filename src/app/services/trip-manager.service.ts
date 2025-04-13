import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Trip } from '../models/trip-data.model';
// import { Trip } from './trip.model';

@Injectable({
  providedIn: 'root',
})
export class TripManagerService {
  private trips: Trip[] = [];
  private tripsSubject = new BehaviorSubject<Trip[]>([]);

  trips$ = this.tripsSubject.asObservable();

  addTrip(trip: Trip) {
    const lastTrip = this.trips[this.trips.length - 1];

    // Determine type
    if (lastTrip) {
      if (trip.source === lastTrip.destination) {
        trip.type = 'continued';
        trip.level = 1;
      } else if (
        this.trips.some(t => t.source === trip.source && t.destination === trip.destination)
      ) {
        trip.type = 'repeated';
        trip.level = 2;
      } else {
        trip.type = 'non-continued';
        trip.level = 1;
      }
    } else {
      trip.type = 'continued';
      trip.level = 1;
    }

    this.trips.push(trip);
    this.tripsSubject.next(this.trips);
  }
}
