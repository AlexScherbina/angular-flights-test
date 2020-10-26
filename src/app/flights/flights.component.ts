import { Component, EventEmitter } from '@angular/core';
import { FlightGroup } from '../shared/models/flight-group';
import { FlightsFilter } from '../shared/models/flights-filter';
import { FlightsService } from './services/flights.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss']
})
export class FlightsComponent {

  public flights: FlightGroup[];

  public readonly flightsChangeEvent: EventEmitter<FlightGroup[]> = new EventEmitter<FlightGroup[]>();
  constructor(private flightsService: FlightsService) { }

  applyFilter(filter: FlightsFilter) {
    this.flights = this.flightsService.listAll(filter);
    this.flightsChangeEvent.next(this.flights);
  }
}
