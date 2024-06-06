import { apiInstance } from '../base';
import { IConversionRequest, IConversionResponse } from './types';

//var from = "GBP",
//     to = "EUR",
//     value = "19999.95";
//
// $.get('https://openexchangerates.org/api/convert/' + value + '/' + from + '/' + to, {app_id: 'YOUR_APP_ID'}, function(data) {
//     console.log(data);
// });

//`https://${host}/latest?amount=10&from=GBP&to=USD`
export const getConversion = ({ from, to, value }: IConversionRequest): Promise<IConversionResponse> => {
    return apiInstance.get(`latest?amount=${value}&from=${from}&to=${to}`, {
        // params: { app_id: import.meta.env.VITE_OPEN_EXCHANGE_APP_ID },
    });
};