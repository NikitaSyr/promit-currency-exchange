import React, { useEffect } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ConvertPage } from '@pages/convert';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { loadCurrencies, selectCurrencyCodes } from '@features/app-setup';

export const AppRouter = () => {
    const dispatch = useAppDispatch();

    const currencyCodes = useAppSelector(selectCurrencyCodes);

    useEffect(() => {
        if (!currencyCodes) {
            dispatch(loadCurrencies());
        }
    }, []);

    return (
        <HashRouter>
            <Routes>
                <Route path="/" Component={ConvertPage} />
                <Route element={<Navigate replace to="/" />} path="*" />
            </Routes>
        </HashRouter>
    );
};
