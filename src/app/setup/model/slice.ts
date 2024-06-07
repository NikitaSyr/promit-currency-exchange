import { message } from 'antd';
import { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../../createAppSlice';
import { getCurrencies, ICurrencyCodeMap } from '@entities/currencies';

export interface AppSliceState {
    mainCurrency: string;
    currencyCodes: ICurrencyCodeMap | null;
    isCurrenciesLoading: boolean;
}

const initialState: AppSliceState = {
    mainCurrency: 'USD',
    currencyCodes: null,
    isCurrenciesLoading: false,
};

export const appSetupSlice = createAppSlice({
    name: 'appSetup',
    initialState,
    reducers: create => ({
        loadCurrencies: create.asyncThunk(
            async () => {
                return await getCurrencies();
            },
            {
                pending: state => {
                    state.isCurrenciesLoading = true;
                },
                fulfilled: (state, action) => {
                    state.isCurrenciesLoading = false;
                    state.currencyCodes = action.payload;
                },
                rejected: state => {
                    state.isCurrenciesLoading = false;
                    message.error('Произошла ошибка загрузки списка валют');
                },
            },
        ),
        changeMainCurrency: create.reducer((state, action: PayloadAction<string>) => {
            state.mainCurrency = action.payload;
        }),
    }),
    selectors: {
        selectMainCurrency: app => app.mainCurrency,
        selectCurrencyCodes: counter => counter.currencyCodes,
        selectIsCurrenciesLoading: counter => counter.isCurrenciesLoading,
    },
});

export const { loadCurrencies, changeMainCurrency } = appSetupSlice.actions;

export const { selectMainCurrency, selectCurrencyCodes, selectIsCurrenciesLoading } = appSetupSlice.selectors;