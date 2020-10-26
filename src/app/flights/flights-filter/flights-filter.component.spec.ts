import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
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

import { FlightsFilterComponent } from './flights-filter.component';

describe('FlightsFilterComponent', () => {
  let component: FlightsFilterComponent;
  let fixture: ComponentFixture<FlightsFilterComponent>;

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
      declarations: [
        FlightsFilterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not emit on invalid form', fakeAsync(() => {
    spyOn(component.filterChange, 'next');

    component.filterFrom.controls[component.ORIGIN_FORM_KEY].setValue(Countries.Ukraine);

    tick(500);
    fixture.detectChanges();
    expect(component.filterChange.next).toHaveBeenCalledTimes(0);
  }));

  it('should emit on valid form', fakeAsync(() => {
    spyOn(component.filterChange, 'next');

    component.filterFrom.controls[component.ORIGIN_FORM_KEY].setValue(Countries.Ukraine);
    component.filterFrom.controls[component.DESTINATION_FORM_KEY].setValue(Countries.USA);

    tick(500);
    fixture.detectChanges();
    expect(component.filterChange.next).toHaveBeenCalledTimes(1);
  }));
});
