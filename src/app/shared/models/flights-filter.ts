export class FlightsFilter {
    origin: string;
    destination: string;
    fromDate: Date;
    toDate: Date;
    connections: number;
    priceRange: [number, number];
}
