import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { Ng5SliderModule } from 'ng5-slider';

import { MatNativeDateModule } from '@angular/material/core';
import { FlightsListComponent } from './flights-list/flights-list.component';
import { FlightsFilterComponent } from './flights-filter/flights-filter.component';
import { FlightsComponent } from './flights.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlightsService } from './services/flights.service';

@NgModule({
    declarations: [
        FlightsComponent,
        FlightsListComponent,
        FlightsFilterComponent
    ],
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
    providers: [
        FlightsService
    ],
    exports: [
        FlightsComponent
    ]
})

export class FlightsModule { }
