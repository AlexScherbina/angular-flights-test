import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { EventEmitter } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng5SliderModule } from 'ng5-slider';
import { Countries } from 'src/app/shared/constants/countries';
import { Flight } from 'src/app/shared/models/flight';
import { FlightGroup } from 'src/app/shared/models/flight-group';

import { FlightsListComponent } from './flights-list.component';

describe('FlightsListComponent', () => {
  let component: FlightsListComponent;
  let fixture: ComponentFixture<FlightsListComponent>;
  let flightsChangeEvent: EventEmitter<FlightGroup[]>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatSortModule,
        Ng5SliderModule
      ],
      declarations: [FlightsListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsListComponent);
    component = fixture.componentInstance;
    flightsChangeEvent = new EventEmitter<FlightGroup[]>();
    component.flightsChange = flightsChangeEvent.asObservable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render flight', fakeAsync(() => {
    const data = new FlightGroup();
    data.flights = [
      {
        origin: {
          country: Countries.Ukraine,
          date: new Date(2020, 9, 26, 8)
        },
        destination: {
          country: Countries.Russia,
          date: new Date(2020, 9, 26, 12)
        },
        price: 200
      } as Flight,
      {
        origin: {
          country: Countries.Russia,
          date: new Date(2020, 9, 26, 13)
        },
        destination: {
          country: Countries.Italy,
          date: new Date(2020, 9, 26, 18)
        },
        price: 600
      } as Flight
    ];

    flightsChangeEvent.next([data]);

    tick(100);

    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.mat-row').length).toBe(1);
  }));
});
