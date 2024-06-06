import { Button, Space } from 'antd';
import { getCurrencies } from '@shared/api/currencies';
import { useAppSelector } from '@/app/store';
import { selectMainCurrency } from '@features/app-setup';
import { ConverterForm } from '@features/converter/ui';

export const ConvertPage = () => {
    const mainCurrency = useAppSelector(selectMainCurrency);
    return (
        <Space>
            <ConverterForm initialCurrencyCode={mainCurrency} />
            <Button onClick={() => getCurrencies()}>Тык</Button>
        </Space>
    );
};