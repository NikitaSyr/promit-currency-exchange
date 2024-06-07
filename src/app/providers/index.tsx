import React, { FC, ReactNode } from 'react';
import { persistor, store } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

interface IProviders {
    readonly children: ReactNode;
}

export const Providers: FC<IProviders> = ({ children }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <HashRouter>{children}</HashRouter>
            </PersistGate>
        </Provider>
    );
};