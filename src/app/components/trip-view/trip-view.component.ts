import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip-data.model';
import { TripManagerService } from 'src/app/services/trip-manager.service';

interface ProcessedTrip extends Trip {
  type: 'continued' | 'non-continued' | 'repeated';
  level: 1 | 2;
}

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.css']
})
export class TripViewComponent implements OnInit {
  trips: Trip[] = [];
  processedTrips: ProcessedTrip[] = [];

  constructor(private tripService: TripManagerService) {}

  ngOnInit() {
    this.tripService.trips$.subscribe(trips => {
      this.trips = trips;
      this.processTrips();
    });
  }

  processTrips() {
    this.processedTrips = [];
    for (let i = 0; i < this.trips.length; i++) {
      const current = this.trips[i];
      const next = this.trips[i + 1];

      let type: ProcessedTrip['type'] = 'continued';
      let level: ProcessedTrip['level'] = 1;

      if (next) {
        if (current.destination === next.source) {
          type = 'continued';
          level = 1;
        } else if (
          current.source === next.source &&
          current.destination === next.destination
        ) {
          type = 'repeated';
          level = 2;
        } else {
          type = 'non-continued';
          level = 1;
        }
      }

      this.processedTrips.push({
        ...current,
        type,
        level
      });
    }
  }
}
