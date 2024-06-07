export interface IConversionRequest {
    from: string;
    to: string;
    value: number;
}

interface IRates {
    [key: string]: number;
}

export interface IConversionResponse {
    amount: number;
    base: string;
    date: string;
    rates: IRates;
}