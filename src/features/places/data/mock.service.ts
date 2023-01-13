import {
    getStorageList,
    setStorageList,
} from '../../../core/services/storage/storage';
import { consoleDebug } from '../../../tools/debug';
import { Place, PlaceStructure } from '../models/place';
import { PLACES } from './mock.places';

export const getPlaces = async (): Promise<Array<PlaceStructure>> => {
    const data = getStorageList<Place>('Places');
    if (!data.length) {
        setStorageList('Places', PLACES);
        return PLACES;
    }
    return data;
};

export const getPlacesDelay = (): Promise<Array<PlaceStructure>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = getStorageList<Place>('Places');
            if (!data.length) {
                setStorageList('Places', PLACES);
                resolve(PLACES);
            }
            resolve(data);
        }, 2000);
    });
};

export const savePlaces = async (places: Array<Place>) => {
    consoleDebug('Saving');
    setStorageList('Places', places);
};
