import { Countries } from 'src/app/shared/constants/countries';
import { FlightsFilter } from 'src/app/shared/models/flights-filter';
import { FlightsService } from './flights.service';

describe('FlightsService', () => {
    let service: FlightsService;
    beforeEach(() => { service = new FlightsService(); });

    it('list all by origin-destination filter', () => {
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

        const flights = service.listAll(filter);

        let result = true;

        flights.forEach(f => {
            if (f.origin.country !== filter.origin
                || f.destination.country !== filter.destination) {
                result = false;
            }
        });

        expect(result).toBeTrue();
    });
});
