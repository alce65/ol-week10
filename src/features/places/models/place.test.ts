import { Place } from './place';

describe('Given "Place" data model', () => {
    test('Then it should instantiate a task', () => {
        const mockName = 'Test place';
        const mockCountry = 'Test country';
        const result = new Place(mockName, mockCountry);
        expect(result).toBeInstanceOf(Place);
        expect(result).toHaveProperty('name', mockName);
        expect(result).toHaveProperty('country', mockCountry);
        expect(result).toHaveProperty('isVisited', false);
    });
});
