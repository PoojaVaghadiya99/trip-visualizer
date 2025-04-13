import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trip } from 'src/app/models/trip-data.model';
import { TripManagerService } from 'src/app/services/trip-manager.service';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.css']
})
export class TripFormComponent {
  tripForm: FormGroup;

  constructor(private fb: FormBuilder, private tripService: TripManagerService) {
    this.tripForm = this.fb.group({
      source: [''],
      destination: ['']
    });
  }

  addTrip() {
    const { source, destination } = this.tripForm.value;
    if (source && destination) {
      this.tripService.addTrip({ source, destination });
      this.tripForm.reset();
    }
  }
}
