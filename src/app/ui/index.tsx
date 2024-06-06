import './index.module.css';
import React from 'react';
import { AppRouter } from '../routes';
import { Providers } from '../providers';

export const App = () => {
    return (
        <Providers>
            <AppRouter />
        </Providers>
    );
};
