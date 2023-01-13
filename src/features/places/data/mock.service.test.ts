import { Place } from '../models/place';
import { getPlaces, getPlacesDelay, savePlaces } from './mock.service';
import {
    getStorageList,
    setStorageList,
} from '../../../core/services/storage/storage';
import { PLACES } from './mock.places';

jest.mock('../../../core/services/storage/storage');

const mockData = ['test'];
const testGetData = async () => {
    const result = await getPlaces();
    expect(getStorageList).toHaveBeenCalled();
    expect(result).toEqual(mockData);
};

const testGetDefaultData = async () => {
    const result = await getPlaces();
    expect(getStorageList).toHaveBeenCalled();
    expect(setStorageList).toHaveBeenCalled();
    expect(result).toEqual(PLACES);
};

const testGetDataDelay = async () => {
    const result = await getPlacesDelay();
    expect(getStorageList).toHaveBeenCalled();
    expect(result).toEqual(mockData);
};

const testGetDefaultDataDelay = async () => {
    const result = await getPlacesDelay();
    expect(getStorageList).toHaveBeenCalled();
    expect(setStorageList).toHaveBeenCalled();
    expect(result).toEqual(PLACES);
};

describe('Given getPlaces or getPlacesDelay', () => {
    describe('When I call it with data in local storage', () => {
        beforeEach(() => {
            (getStorageList as jest.Mock).mockReturnValue(mockData);
        });
        test('Then the data should be obtained', testGetData);
        test(
            'Then the data should be obtained with delay also',
            testGetDataDelay
        );
    });
    describe('When I call it without data in local storage', () => {
        beforeEach(() => {
            (getStorageList as jest.Mock).mockReturnValue([]);
        });
        test('Then the data from PLACE should be obtained', testGetDefaultData);
        test(
            'Then the data from PLACE should be obtained  with delay also',
            testGetDefaultDataDelay
        );
    });
});

describe('Given savePlaces', () => {
    describe('When I call it', () => {
        test('Then localStorage should be use with the data', () => {
            const mockPlaces: Array<Place> = [];
            savePlaces(mockPlaces);
            expect(setStorageList).toHaveBeenCalledWith('Places', mockPlaces);
        });
    });
});
