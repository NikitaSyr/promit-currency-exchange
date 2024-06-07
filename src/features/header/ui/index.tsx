import { Col, Row, Select, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '@/app/store';
import React, { useMemo } from 'react';
import { filterOption } from '@shared/lib/filters';
import { changeMainCurrency, selectCurrencyCodes, selectMainCurrency } from '@features/app-setup';
import { getCurrencyDictionary } from '@features/converter/lib';

import styles from './styles.module.css';

const { Text } = Typography;

export const Header = () => {
    const dispatch = useAppDispatch();
    const currencyCodes = useAppSelector(selectCurrencyCodes);
    const mainCurrency = useAppSelector(selectMainCurrency);

    const currencyOptions = useMemo(() => {
        return getCurrencyDictionary(currencyCodes).map(item => {
            return {
                value: item.code,
                label: item.code,
            };
        });
    }, [currencyCodes]);

    const setMainCurrency = (value: string) => {
        dispatch(changeMainCurrency(value));
    };

    return (
        <Row className={styles['header']} justify="space-between">
            <Col className={styles['col-wrapper']}>
                <Text className={styles['header-text']}>Конвертация валют Online</Text>
            </Col>
            <Col className={styles['col-wrapper']}>
                <Text className={`${styles['main-currency-info']} ${styles['header-text']}`}>Основная валюта:</Text>
                <Select
                    showSearch
                    className={styles['select-main-currency']}
                    placeholder="Выберите валюту"
                    optionFilterProp="children"
                    filterOption={filterOption}
                    options={currencyOptions}
                    onChange={setMainCurrency}
                    value={mainCurrency}
                />
            </Col>
        </Row>
    );
};
