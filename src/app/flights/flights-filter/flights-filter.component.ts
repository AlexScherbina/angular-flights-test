import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Options } from 'ng5-slider/options';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import * as _ from 'lodash';
import { Countries } from 'src/app/shared/constants/countries';
import { FlightsFilter } from 'src/app/shared/models/flights-filter';

@Component({
  selector: 'app-flights-filter',
  templateUrl: './flights-filter.component.html',
  styleUrls: ['./flights-filter.component.scss']
})
export class FlightsFilterComponent implements OnInit {

  @Output() filterChange = new EventEmitter<FlightsFilter>();

  public readonly ORIGIN_FORM_KEY = 'origin';
  public readonly DESTINATION_FORM_KEY = 'destination';
  public readonly FROM_DATE_FORM_KEY = 'fromDate';
  public readonly TO_DATE_FORM_KEY = 'toDate';
  public readonly CONNECTIONS_FORM_KEY = 'connections';
  public readonly PRICE_RANGE_FORM_KEY = 'priceRange';

  public priceSliderOptions: Options = {
    floor: 0,
    ceil: 9999,
    step: 1,
    animate: false
  };

  public countries = [
    Countries.Ukraine,
    Countries.Russia,
    Countries.Italy,
    Countries.France,
    Countries.Poland,
    Countries.Germany,
    Countries.Australia,
    Countries.USA
  ];

  public connectionCountOptions = [
    { title: 'Direct', value: 0 },
    { title: '1', value: 1 },
    { title: '2', value: 2 },
    { title: '3', value: 3 },
    { title: '4', value: 4 },
    { title: '5', value: 5 },
    { title: 'Any', value: -1 },
  ];

  public filterFrom: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  countryAvailable(country: string): boolean {
    return country !== this.filterFrom.controls[this.ORIGIN_FORM_KEY].value
      && country !== this.filterFrom.controls[this.DESTINATION_FORM_KEY].value;
  }

  private createForm() {
    const fromDate = new Date();
    fromDate.setHours(0, 0, 0, 0);
    const toDate = new Date();
    toDate.setDate(fromDate.getDate() + 7);

    this.filterFrom = this.fb.group({
      [this.ORIGIN_FORM_KEY]: this.fb.control(null, Validators.required),
      [this.DESTINATION_FORM_KEY]: this.fb.control(null, Validators.required),
      [this.FROM_DATE_FORM_KEY]: this.fb.control(fromDate),
      [this.TO_DATE_FORM_KEY]: this.fb.control(toDate),
      [this.CONNECTIONS_FORM_KEY]: this.fb.control(0),
      [this.PRICE_RANGE_FORM_KEY]: this.fb.control([0, 9999])
    });

    this.filterFrom.controls[this.FROM_DATE_FORM_KEY].valueChanges
      .subscribe(from => {
        if (from > this.filterFrom.controls[this.TO_DATE_FORM_KEY].value) {
          this.filterFrom.controls[this.TO_DATE_FORM_KEY].setValue(from);
        }
      });

    this.filterFrom.controls[this.TO_DATE_FORM_KEY].valueChanges
      .subscribe(to => {
        if (to < this.filterFrom.controls[this.FROM_DATE_FORM_KEY].value) {
          this.filterFrom.controls[this.FROM_DATE_FORM_KEY].setValue(to);
        }
      });

    this.filterFrom.valueChanges
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged(_.isEqual))
      .subscribe(formValue => {
        if (this.filterFrom.valid) {
          this.filterChange.next(formValue as FlightsFilter);
        }
      });
  }
}
