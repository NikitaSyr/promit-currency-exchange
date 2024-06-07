import React from 'react';
import { AppRouter } from '../routes';
import { Providers } from '../providers';
import { Layout } from 'antd';
import { Header } from '@features/header';

import styles from './styles.module.css';

const { Content } = Layout;

export const App = () => {
    return (
        <Layout className={styles['layout']}>
            <Providers>
                <Content className={styles['content']}>
                    <Header />
                    {/*<Sidebar />*/}
                    <AppRouter />
                </Content>
            </Providers>
        </Layout>
    );
};
