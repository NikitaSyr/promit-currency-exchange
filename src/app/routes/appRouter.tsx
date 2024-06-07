import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ConvertPage } from '@pages/convert';
import { useAppDispatch, useAppSelector } from '../store';
import { loadCurrencies, selectCurrencyCodes } from '../setup';

export const AppRouter = () => {
    const dispatch = useAppDispatch();

    const currencyCodes = useAppSelector(selectCurrencyCodes);

    useEffect(() => {
        if (!currencyCodes) {
            dispatch(loadCurrencies());
        }
    }, []);

    return (
        <Routes>
            <Route path="/" Component={ConvertPage} />
            <Route element={<Navigate replace to="/" />} path="*" />
        </Routes>
    );
};
