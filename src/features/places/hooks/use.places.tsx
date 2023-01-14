import { useCallback, useMemo, useReducer, useState } from 'react';
import { consoleDebug } from '../../../tools/debug';
import { PlaceNoId, PlaceStructure } from '../models/place';
import { PlacesRepo } from '../services/repository/places.repo';
import { placeReducer } from '../reducers/place.reducer';
import * as ac from '../reducers/action.creators';

export type UsePlaces = {
    getStatus: () => Status;
    getPlaces: () => Array<PlaceStructure>;
    handleLoad: () => Promise<void>;
    handleAdd: (place: PlaceNoId) => Promise<void>;
    handleUpdate: (placePayload: Partial<PlaceStructure>) => Promise<void>;
    handleDelete: (id: PlaceStructure['id']) => Promise<void>;
};

type Status = 'Starting' | 'Loading' | 'Loaded';

export function usePlaces(): UsePlaces {
    const repo = useMemo(() => new PlacesRepo(), []);
    consoleDebug('usePlaces Instance');

    const initialState: Array<PlaceStructure> = [];
    const initialStatus = 'Starting' as Status;

    const [places, dispatch] = useReducer(placeReducer, initialState);

    const [status, setStatus] = useState(initialStatus);

    const getPlaces = () => places;
    const getStatus = () => status;

    const handleLoad = useCallback(async () => {
        try {
            setStatus('Loading');
            const data = await repo.load();
            dispatch(ac.placeLoadCreator(data));
            setStatus('Loaded');
            consoleDebug('LOAD Places');
        } catch (error) {
            handleError(error as Error);
        }
    }, [repo]);

    const handleAdd = async function (place: PlaceNoId) {
        try {
            const fullPlace = await repo.create(place);
            dispatch(ac.placeAddCreator(fullPlace));
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleUpdate = async function (
        placePayload: Partial<PlaceStructure>
    ) {
        try {
            const fullPlace = await repo.update(placePayload);
            dispatch(ac.placeUpdateCreator(fullPlace));
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleDelete = async function (id: PlaceStructure['id']) {
        try {
            const finalId = await repo.delete(id);
            dispatch(ac.placeDeleteCreator(finalId));
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleError = (error: Error) => {
        consoleDebug(error.message);
    };

    return {
        getStatus,
        getPlaces,
        handleLoad,
        handleAdd,
        handleUpdate,
        handleDelete,
    };
}
