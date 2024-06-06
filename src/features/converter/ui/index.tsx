import type { FormProps } from 'antd';
import { Button, Form, Select, Skeleton, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '@/app/store';
import React, { useMemo } from 'react';
import { selectCurrencyCodes } from '@features/app-setup';
import { getCurrencyDictionary } from '../lib';
import { changeConversionAmount, changeCurrencyFrom, changeCurrencyTo, convertCurrencies } from '../model/slice';
import { NumericInput } from '@shared/ui/numeric-input';

const { Item } = Form;

interface Props {
    initialCurrencyCode: string;
}

interface FieldType {
    currencyFrom: string;
    currencyTo: string;
    amount: string;
}

export const ConverterForm = ({ initialCurrencyCode }: Props) => {
    console.log(import.meta.env.VITE_OPEN_EXCHANGE_APP_ID);
    const dispatch = useAppDispatch();
    const { currencyFrom, currencyTo, conversionAmount, conversionResult, isConverting } = useAppSelector(
        state => state.conversion,
    );
    const currencyCodes = useAppSelector(selectCurrencyCodes);
    // const isCurrenciesLoading = useAppSelector(selectIsCurrenciesLoading);
    // convertCurrencies
    // changeCurrencyFrom
    // changeCurrencyTo

    const currencyOptions = useMemo(() => {
        return getCurrencyDictionary(currencyCodes).map(item => {
            return {
                value: item.code,
                label: `${item.code} / ${item.name}`,
            };
        });
    }, [currencyCodes]);

    const onFinish: FormProps<FieldType>['onFinish'] = () => {
        dispatch(
            convertCurrencies({
                from: currencyFrom,
                to: currencyTo,
                value: Number(conversionAmount),
            }),
        );
    };

    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const setCurrencyFrom = (value: string) => {
        console.log(value);
        dispatch(changeCurrencyFrom(value));
    };

    const setCurrencyTo = (value: string) => {
        dispatch(changeCurrencyTo(value));
    };

    const setConversionAmount = (value: string) => {
        dispatch(changeConversionAmount(value));
    };

    return (
        <Form
            name="ConverterForm"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ currencyFrom: initialCurrencyCode, amount: 1 }}
            onFinish={onFinish}
        >
            <Item<FieldType>
                name="currencyFrom"
                rules={[{ required: true, message: 'Выберите валюту из которой вы хотите перевести' }]}
            >
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Выберите валюту"
                    optionFilterProp="children"
                    onChange={setCurrencyFrom}
                    // onSearch={onSearch}
                    filterOption={filterOption}
                    options={currencyOptions}
                    value={currencyFrom}
                />
            </Item>
            <Item<FieldType>
                name="currencyTo"
                rules={[{ required: true, message: 'Выберите валюту в которую вы хотите перевести' }]}
            >
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Выберите валюту"
                    optionFilterProp="children"
                    onChange={setCurrencyTo}
                    // onSearch={onSearch}
                    filterOption={filterOption}
                    options={currencyOptions}
                    value={currencyTo}
                />
            </Item>
            <Item<FieldType>
                name="amount"
                rules={[{ required: true, message: 'Введите количество валюты для перевода' }]}
                // wrapperCol={{ offset: 8, span: 16 }}
            >
                <NumericInput
                    withTooltip
                    style={{ width: 200 }}
                    onChange={value => {
                        setConversionAmount(value);
                    }}
                    value={conversionAmount}
                    maxLength={16}
                    // onChange={setConversionAmount}
                    // onSearch={onSearch}
                />
            </Item>
            <Space style={{ width: 200 }}>
                {isConverting ? <Skeleton.Input active size="small" /> : conversionResult}
            </Space>
            <Item
            // wrapperCol={{ offset: 8, span: 16 }}
            >
                <Button type="primary" htmlType="submit" loading={isConverting}>
                    Перевести
                </Button>
            </Item>
        </Form>
    );
};