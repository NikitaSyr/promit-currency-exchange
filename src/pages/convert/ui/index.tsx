import { Row } from 'antd';
import { useAppSelector } from '@/app/store';
import { selectMainCurrency } from '@features/app-setup';
import { ConverterForm } from '@features/converter/ui';
import styles from './styles.module.css';

export const ConvertPage = () => {
    const mainCurrency = useAppSelector(selectMainCurrency);
    return (
        <Row className={styles['convert-page']} justify="center">
            <ConverterForm initialCurrencyCode={mainCurrency} />
        </Row>
    );
};