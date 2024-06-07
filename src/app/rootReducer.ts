import { combineSlices } from '@reduxjs/toolkit';
import { appSetupSlice } from './setup';
import { conversionSlice } from '@features/converter/model/slice';

export const rootReducer = combineSlices(appSetupSlice, conversionSlice);
