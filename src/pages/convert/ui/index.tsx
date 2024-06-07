import { Row } from 'antd';
import { useAppSelector } from '@/app/store';
import { selectMainCurrency } from '@/app/setup';
import styles from './styles.module.css';
import React from 'react';
import { ConverterForm } from '@features/converter';

export const ConvertPage = () => {
    const mainCurrency = useAppSelector(selectMainCurrency);
    return (
        <Row className={styles['conversion-page']} justify="center">
            <ConverterForm initialCurrencyCode={mainCurrency} />
        </Row>
    );
};