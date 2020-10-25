import { Connection } from './connection';
import { Flight } from './flight';

export class FlightGroup {
    flights: Flight[];

    get origin(): Connection {
        return this.flights[0].origin;
    }

    get destination(): Connection {
        return this.flights[this.flights.length - 1].destination;
    }

    get displayName(): string {
        const points = this.flights.map(f => f.origin.country);
        points.push(this.destination.country);

        return points.join(' - ');
    }

    get numberOfConnections(): number {
        return this.flights.length - 1;
    }

    get totalPrice(): number {
        return this.flights.map(f => f.price).reduce((a, b) => a + (b || 0), 0);
    }

    get totalHours(): number {
        return (this.flights[this.flights.length - 1].destination.date.getTime() - this.flights[0].origin.date.getTime()) / (1000 * 3600);
    }
}
