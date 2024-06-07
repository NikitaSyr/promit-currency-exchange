import type { FormProps } from 'antd';
import { Button, Col, Form, Input, message, Row, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '@/app/store';
import React, { useMemo } from 'react';
import { selectCurrencyCodes } from '@features/app-setup';
import { getCurrencyDictionary } from '../lib';
import { changeConversionAmount, changeCurrencyFrom, changeCurrencyTo, convertNewCurrencies } from '../model/slice';
import { NumericInput } from '@shared/ui/numeric-input';
import styles from './styles.module.css';
import { SwapOutlined } from '@ant-design/icons';
import { filterOption } from '@shared/lib/filters';

const { Item } = Form;

interface Props {
    initialCurrencyCode: string;
}

interface FieldType {
    from: string;
    to: string;
    amount: string;
}

export const ConverterForm = ({ initialCurrencyCode }: Props) => {
    const dispatch = useAppDispatch();
    const { currencyFrom, currencyTo, conversionAmount, conversionResult, isConverting } = useAppSelector(
        state => state.conversion,
    );
    const currencyCodes = useAppSelector(selectCurrencyCodes);

    const currencyOptions = useMemo(() => {
        return getCurrencyDictionary(currencyCodes).map(item => {
            return {
                value: item.code,
                label: `${item.code} / ${item.name}`,
            };
        });
    }, [currencyCodes]);

    const onFinish: FormProps<FieldType>['onFinish'] = values => {
        const { from, to, amount } = values;

        dispatch(changeCurrencyFrom(from));
        dispatch(changeCurrencyTo(to));

        if (from !== to) {
            dispatch(
                convertNewCurrencies({
                    from: from,
                    to: to,
                    value: Number(amount),
                }),
            );
        } else {
            message.warning('Выберите две разные валюты');
        }
    };

    const setConversionAmount = (value: string) => {
        dispatch(changeConversionAmount(value));
    };

    return (
        <Form
            size={'large'}
            name="ConverterForm"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 32 }}
            className={styles['form']}
            initialValues={{ from: initialCurrencyCode, amount: 1 }}
            onFinish={onFinish}
        >
            <Row justify="space-around">
                <Col className={styles['form-col']}>
                    <Item<FieldType>
                        name="from"
                        rules={[{ required: true, message: 'Выберите валюту из которой вы хотите перевести' }]}
                    >
                        <Select
                            showSearch
                            style={{ width: 320 }}
                            placeholder="Выберите валюту"
                            optionFilterProp="children"
                            filterOption={filterOption}
                            options={currencyOptions}
                            value={currencyFrom}
                        />
                    </Item>
                    <Row justify="center" className={styles['swap-icon']}>
                        <SwapOutlined rotate={90} />
                    </Row>
                    <Item<FieldType>
                        name="to"
                        rules={[{ required: true, message: 'Выберите валюту в которую вы хотите перевести' }]}
                    >
                        <Select
                            showSearch
                            style={{ width: 320 }}
                            placeholder="Выберите валюту"
                            optionFilterProp="children"
                            filterOption={filterOption}
                            options={currencyOptions}
                            value={currencyTo}
                        />
                    </Item>
                </Col>
                <Col className={styles['form-col']}>
                    <Item<FieldType>
                        name="amount"
                        rules={[{ required: true, message: 'Введите количество валюты для перевода' }]}
                    >
                        <NumericInput
                            style={{ width: 320 }}
                            onChange={value => {
                                setConversionAmount(value);
                            }}
                            value={conversionAmount}
                            maxLength={16}
                        />
                    </Item>
                    <Row justify="center" className={styles['swap-icon']}>
                        <SwapOutlined rotate={90} />
                    </Row>
                    <Input value={conversionResult || ''} variant="outlined" />
                </Col>
            </Row>
            <Row justify="center">
                <Item>
                    <Button type="primary" htmlType="submit" loading={isConverting}>
                        Перевести
                    </Button>
                </Item>
            </Row>
        </Form>
    );
};