import { message } from 'antd';
import { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '@/app/createAppSlice';
import { getConversion, IConversionRequest } from '@shared/api/convert';

export interface ConverterSliceState {
    currencyFrom: string;
    currencyTo: string;
    conversionAmount: string;
    conversionResult: string | null;
    isConverting: boolean;
}

const initialState: ConverterSliceState = {
    currencyFrom: '',
    currencyTo: '',
    conversionAmount: '1',
    conversionResult: null,
    isConverting: false,
};

export const conversionSlice = createAppSlice({
    name: 'conversion',
    initialState,
    reducers: create => ({
        convertCurrencies: create.asyncThunk(
            async (dataToConvert: IConversionRequest) => {
                console.log(dataToConvert);

                return await getConversion(dataToConvert);
            },
            {
                pending: state => {
                    state.isConverting = true;
                },
                fulfilled: (state, action) => {
                    state.isConverting = false;
                    console.log(action.payload.rates);
                    console.log(state.currencyFrom);

                    state.conversionResult = action.payload.rates[state.currencyTo].toString();
                },
                rejected: state => {
                    state.isConverting = false;
                    message.error('Произошла ошибка конвертации валют');
                },
            },
        ),
        changeCurrencyFrom: create.reducer((state, action: PayloadAction<string>) => {
            state.currencyFrom = action.payload;
        }),
        changeCurrencyTo: create.reducer((state, action: PayloadAction<string>) => {
            state.currencyTo = action.payload;
        }),
        changeConversionAmount: create.reducer((state, action: PayloadAction<string>) => {
            state.conversionAmount = action.payload;
        }),
    }),
    selectors: {
        selectIsConverting: counter => counter.isConverting,
    },
});

export const { convertCurrencies, changeCurrencyFrom, changeCurrencyTo, changeConversionAmount } =
    conversionSlice.actions;

export const { selectIsConverting } = conversionSlice.selectors;
