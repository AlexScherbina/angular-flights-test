import { Injectable } from '@angular/core';
import { Countries } from 'src/app/shared/constants/countries';
import { Flight } from 'src/app/shared/models/flight';
import { FlightGroup } from 'src/app/shared/models/flight-group';
import { FlightsFilter } from 'src/app/shared/models/flights-filter';

@Injectable()
export class FlightsService {

    listAll(filter: FlightsFilter): FlightGroup[] {
        const flightGroups: FlightGroup[] = [];

        function buildFlightSequence(sequence: Flight[]) {
            const totalPrice = sequence.map(s => s.price).reduce((a, b) => a + (b || 0), 0);

            if (sequence[sequence.length - 1].destination.country === filter.destination
                && totalPrice >= filter.priceRange[0] && totalPrice <= filter.priceRange[1]) {
                const group = new FlightGroup();
                group.flights = sequence;
                flightGroups.push(group);
                return;
            }

            if (filter.connections >= 0 && sequence.length - 1 >= filter.connections) {
                return;
            }

            const lowerDate = sequence[sequence.length - 1].destination.date;
            const upperDate = new Date(lowerDate);
            upperDate.setTime(upperDate.getTime() + (24 * 60 * 60 * 1000));

            const next = Flights.filter(f => f.origin.country === sequence[sequence.length - 1].destination.country)
                .filter(f => f.origin.date >= lowerDate && f.origin.date <= upperDate)
                .filter(f => (f.price + totalPrice) >= filter.priceRange[0]
                    && (f.price + totalPrice) <= filter.priceRange[1]);

            next.forEach(f => {
                buildFlightSequence([...sequence, f]);
            });
        }

        const initialFlights = Flights.filter(f => {
            const dateToCompare = new Date(f.origin.date);
            dateToCompare.setHours(0, 0, 0, 0);
            return f.origin.country === filter.origin
                && dateToCompare >= filter.fromDate && dateToCompare <= filter.toDate
                && f.price <= filter.priceRange[1];
        });

        initialFlights.forEach(initialFlight => {
            buildFlightSequence([initialFlight]);
        });

        return flightGroups;
    }

}

export const Flights = [
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
    },
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
    },
    {
        origin: {
            country: Countries.Italy,
            date: new Date(2020, 9, 26, 20)
        },
        destination: {
            country: Countries.France,
            date: new Date(2020, 9, 26, 23)
        },
        price: 400
    },
    {
        origin: {
            country: Countries.France,
            date: new Date(2020, 9, 27, 2)
        },
        destination: {
            country: Countries.USA,
            date: new Date(2020, 9, 27, 9)
        },
        price: 1100
    },
    {
        origin: {
            country: Countries.USA,
            date: new Date(2020, 9, 27, 12)
        },
        destination: {
            country: Countries.Australia,
            date: new Date(2020, 9, 27, 20)
        },
        price: 1500
    },
    {
        origin: {
            country: Countries.Italy,
            date: new Date(2020, 9, 26, 12)
        },
        destination: {
            country: Countries.Germany,
            date: new Date(2020, 9, 26, 14)
        },
        price: 600
    },
    {
        origin: {
            country: Countries.Germany,
            date: new Date(2020, 9, 26, 15)
        },
        destination: {
            country: Countries.France,
            date: new Date(2020, 9, 26, 17)
        },
        price: 400
    },
    {
        origin: {
            country: Countries.Russia,
            date: new Date(2020, 9, 27, 12)
        },
        destination: {
            country: Countries.France,
            date: new Date(2020, 9, 27, 16)
        },
        price: 500
    },
    {
        origin: {
            country: Countries.Ukraine,
            date: new Date(2020, 9, 27, 15)
        },
        destination: {
            country: Countries.Italy,
            date: new Date(2020, 9, 27, 17)
        },
        price: 300
    },
    {
        origin: {
            country: Countries.Italy,
            date: new Date(2020, 9, 27, 20)
        },
        destination: {
            country: Countries.Germany,
            date: new Date(2020, 9, 27, 22)
        },
        price: 400
    },
    {
        origin: {
            country: Countries.France,
            date: new Date(2020, 9, 27, 18)
        },
        destination: {
            country: Countries.Germany,
            date: new Date(2020, 9, 27, 21)
        },
        price: 200
    },
    {
        origin: {
            country: Countries.Germany,
            date: new Date(2020, 9, 28, 6)
        },
        destination: {
            country: Countries.Poland,
            date: new Date(2020, 9, 28, 8)
        },
        price: 500
    },
    {
        origin: {
            country: Countries.Russia,
            date: new Date(2020, 9, 28, 4)
        },
        destination: {
            country: Countries.Poland,
            date: new Date(2020, 9, 28, 7)
        },
        price: 400
    },
    {
        origin: {
            country: Countries.Poland,
            date: new Date(2020, 9, 28, 12)
        },
        destination: {
            country: Countries.Ukraine,
            date: new Date(2020, 9, 28, 14)
        },
        price: 200
    },
];
