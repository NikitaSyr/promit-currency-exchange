import { apiInstance } from '@shared/api/base';
import { IConversionRequest, IConversionResponse } from '../index';

export const getConversion = ({ from, to, value }: IConversionRequest): Promise<IConversionResponse> => {
    return apiInstance.get(`latest?amount=${value}&from=${from}&to=${to}`, {});
};