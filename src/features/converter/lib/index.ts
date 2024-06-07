import { ICurrency } from '../types';
import { ICurrencyCodeMap } from '@entities/currencies';

export const getCurrencyDictionary = (dictionary: ICurrencyCodeMap | null): ICurrency[] => {
    if (dictionary) {
        return Object.entries(dictionary).map(([code, name]) => ({
            code,
            name,
        }));
    }

    return [];
};