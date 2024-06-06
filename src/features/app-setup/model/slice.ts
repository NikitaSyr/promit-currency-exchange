import { getCurrencies, ICurrencyCodeMap } from '@shared/api/currencies';
import { message } from 'antd';
import { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '@/app/createAppSlice';

export interface AppSliceState {
    mainCurrency: string;
    currencyCodes: ICurrencyCodeMap | null;
    // isAppLoading: boolean;
    isCurrenciesLoading: boolean;
}

const initialState: AppSliceState = {
    mainCurrency: 'USD',
    currencyCodes: null,
    // isAppLoading: false,
    isCurrenciesLoading: false,
};
// If you are not using async thunks you can use the standalone `createSlice`.


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
        // initApp: create.asyncThunk(
        //     async (_, { dispatch }) => {
        //         return await dispatch(loadCurrencies());
        //     },
        //     {
        //         pending: state => {
        //             state.isCurrenciesLoading = true;
        //         },
        //         fulfilled: (state, action) => {
        //             state.isCurrenciesLoading = false;
        //             state.currencyCodes = action.payload;
        //         },
        //         rejected: state => {
        //             state.isCurrenciesLoading = false;
        //             message.error('Произошла ошибка инициализации приложения');
        //         },
        //     },
        // ),
        // changeMainCurrency: create.reducer(code: string),
        changeMainCurrency: create.reducer((state, action: PayloadAction<string>) => {
            state.mainCurrency = action.payload;
        }),
    }),
    selectors: {
        selectMainCurrency: app => app.mainCurrency,
        selectCurrencyCodes: counter => counter.currencyCodes,
        // selectIsAppLoading: counter => counter.isAppLoading,
        selectIsCurrenciesLoading: counter => counter.isCurrenciesLoading,
    },
});

export const { loadCurrencies, changeMainCurrency } = appSetupSlice.actions;

export const {
    selectMainCurrency,
    selectCurrencyCodes,
    // selectIsAppLoading,
    selectIsCurrenciesLoading,
} = appSetupSlice.selectors;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//     (amount: number): AppThunk =>
//     (dispatch, getState) => {
//         const currentValue = selectCount(getState());
//
//         if (currentValue % 2 === 1 || currentValue % 2 === -1) {
//             dispatch(incrementByAmount(amount));
//         }
//     };
