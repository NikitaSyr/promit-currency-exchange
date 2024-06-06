import { ICurrencyCodeMap } from '@shared/api/currencies';
import { ICurrency } from '../types';

export const getCurrencyDictionary = (dictionary: ICurrencyCodeMap | null): ICurrency[] => {
    if (dictionary) {
        return Object.entries(dictionary).map(([code, name]) => ({
            code,
            name,
        }));
    }

    return [];
};