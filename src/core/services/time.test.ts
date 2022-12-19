import { getHour } from './time';

describe('Given function "getHour()"', () => {
    test('It should return a number for day hour', () => {
        const result = getHour();
        expect(typeof result).toBe('number');
        expect(result).toBeLessThanOrEqual(24);
    });
});
