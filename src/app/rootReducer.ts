import { combineSlices } from '@reduxjs/toolkit';
import { counterSlice } from '@features/counter/counterSlice';
import { quotesApiSlice } from '@features/quotes/quotesApiSlice';
import { appSetupSlice } from '@features/app-setup';
import { conversionSlice } from '@features/converter/model/slice';

export const rootReducer = combineSlices(appSetupSlice, conversionSlice, counterSlice, quotesApiSlice);
