import { combineSlices } from '@reduxjs/toolkit';
import { appSetupSlice } from '@features/app-setup';
import { conversionSlice } from '@features/converter/model/slice';

export const rootReducer = combineSlices(appSetupSlice, conversionSlice);
