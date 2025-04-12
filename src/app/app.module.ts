import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TripFormComponent } from './components/trip-form/trip-form.component';
import { TripViewComponent } from './components/trip-view/trip-view.component';

@NgModule({
  declarations: [
    AppComponent,
    TripFormComponent,
    TripViewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
