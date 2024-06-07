import { Input, Tooltip } from 'antd';
import React from 'react';
import { InputProps } from 'antd/es/input/Input';

import styles from './numericInput.module.css';

interface NumericInputProps extends Omit<InputProps, 'onChange'> {
    style: React.CSSProperties;
    value: string;
    onChange: (value: string) => void;
    maxLength?: number;
    withTooltip?: boolean;
}

export const NumericInput = (props: NumericInputProps) => {
    const { value, onChange, maxLength = 16, withTooltip, ...restProps } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
            onChange(inputValue);
        }
    };

    const handleBlur = () => {
        let valueTemp = value;
        if (value.charAt(value.length - 1) === '.' || value === '-') {
            valueTemp = value.slice(0, -1);
        }
        onChange(valueTemp.replace(/0*(\d+)/, '$1'));
    };

    if (!withTooltip) {
        return (
            <Input
                {...restProps}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Введите число"
                maxLength={maxLength}
            />
        );
    }

    const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

    const title = value ? (
        <span className={styles['numeric-input-title']}>{value !== '-' ? formatNumber(Number(value)) : '-'}</span>
    ) : (
        'Введите число'
    );

    return (
        <Tooltip trigger={['focus']} title={title} placement="topLeft" overlayClassName={styles['numeric-input']}>
            <Input
                {...restProps}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Введите число"
                maxLength={maxLength}
            />
        </Tooltip>
    );
};