import { filterOption } from './index';

describe('filterOption', () => {
    it('Функция возвращает true, если value частично совпадает с option ', () => {
        const option = { label: 'Test Label', value: 'test-value' };
        const input = 'test';
        expect(filterOption(input, option)).toBe(true);
    });

    it('Функция возвращает false, если value не совпадает с option', () => {
        const option = { label: 'Another Label', value: 'another-value' };
        const input = 'test';
        expect(filterOption(input, option)).toBe(false);
    });

    it('Функция возвращает false, если не передать option', () => {
        const input = 'test';
        expect(filterOption(input)).toBe(false);
    });

    it('Функция возвращает false, если label пустой', () => {
        const option = { label: '', value: 'empty-label' };
        const input = 'test';
        expect(filterOption(input, option)).toBe(false);
    });

    it('Функция правильно обрабатывать входные данные с разным регистром', () => {
        const option = { label: 'Case Test', value: 'case-test' };
        const input = 'CASE';
        expect(filterOption(input, option)).toBe(true);
    });
});