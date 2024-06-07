import { apiInstance } from '@shared/api/base';
import { ICurrencyCodeMap } from '../types';

export const getCurrencies = (): Promise<ICurrencyCodeMap> => {
    return apiInstance.get('currencies');
};