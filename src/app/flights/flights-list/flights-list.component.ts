import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { Flight } from 'src/app/shared/models/flight';
import { FlightGroup } from 'src/app/shared/models/flight-group';

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.scss']
})
export class FlightsListComponent implements OnInit {

  @Input() flightsChange: Observable<FlightGroup[]>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public readonly NAME_COLUMN = 'displayName';
  public readonly DATE_COLUMN = 'date';
  public readonly CONNECTIONS_COLUMN = 'numberOfConnections';
  public readonly TIME_COLUMN = 'totalHours';
  public readonly PRICE_COLUMN = 'totalPrice';

  public displayedColumns = [this.NAME_COLUMN, this.DATE_COLUMN, this.CONNECTIONS_COLUMN, this.TIME_COLUMN, this.PRICE_COLUMN];
  public dataSource: MatTableDataSource<FlightGroup>;

  constructor() { }

  ngOnInit(): void {
    this.flightsChange.subscribe(flights => {
      this.dataSource = new MatTableDataSource(flights);
      this.dataSource.sort = this.sort;
    });
  }

}
