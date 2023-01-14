/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { UsePlaces } from '../../../features/places/hooks/use.places';
import {
    PlaceNoId,
    PlaceStructure,
} from '../../../features/places/models/place';

export type PlaceContextStructure = Omit<
    UsePlaces,
    'getStatus' | 'getPlaces'
> & {
    places: Array<PlaceStructure>;
};

export const initialContext: PlaceContextStructure = {
    places: [],
    handleLoad: async () => {},
    handleAdd: async (place: PlaceNoId) => {},
    handleDelete: async (id: string) => {},
    handleUpdate: async (placePayload: Partial<PlaceStructure>) => {},
};

export const PlaceContext = createContext(initialContext);

// PlaceContext.Consumer -> la utiliza useContext
// PlaceContext.Provider
