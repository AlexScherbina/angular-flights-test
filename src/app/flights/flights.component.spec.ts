import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Countries } from '../shared/constants/countries';
import { FlightsFilter } from '../shared/models/flights-filter';

import { FlightsComponent } from './flights.component';
import { FlightsService } from './services/flights.service';

describe('FlightsComponent', () => {
  let component: FlightsComponent;
  let fixture: ComponentFixture<FlightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlightsComponent],
      providers: [FlightsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit flights on applyFilter', () => {
    spyOn(component.flightsChangeEvent, 'next');

    const fromDate = new Date();
    fromDate.setTime(new Date().getTime() - (7 * 24 * 60 * 60 * 1000));
    const toDate = new Date();
    toDate.setTime(new Date().getTime() + (7 * 24 * 60 * 60 * 1000));

    const filter = new FlightsFilter();
    filter.origin = Countries.Ukraine;
    filter.destination = Countries.France;
    filter.fromDate = fromDate;
    filter.toDate = toDate;
    filter.connections = -1;
    filter.priceRange = [0, 9999];

    component.applyFilter(filter);

    fixture.detectChanges();
    expect(component.flightsChangeEvent.next).toHaveBeenCalledTimes(1);
  });

});
