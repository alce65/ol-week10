import { useCallback, useMemo, useState } from 'react';
import { consoleDebug } from '../../../tools/debug';
import { PlaceNoId, PlaceStructure } from '../models/place';
import { PlacesRepo } from '../services/repository/places.repo';

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
    const [places, setPlaces] = useState(initialState);
    const [status, setStatus] = useState(initialStatus);

    const getPlaces = () => places;
    const getStatus = () => status;

    const handleLoad = useCallback(async () => {
        try {
            setStatus('Loading');
            const data = await repo.load();
            setPlaces(data);
            setStatus('Loaded');
            consoleDebug('LOAD Places');
        } catch (error) {
            handleError(error as Error);
        }
    }, [repo]);

    const handleAdd = async function (place: PlaceNoId) {
        try {
            const fullPlace = await repo.create(place);
            setPlaces((prev) => [...prev, fullPlace]);
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleUpdate = async function (
        placePayload: Partial<PlaceStructure>
    ) {
        try {
            const fullPlace = await repo.update(placePayload);
            setPlaces((prev) =>
                prev.map((item) =>
                    item.id === fullPlace.id ? fullPlace : item
                )
            );
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleDelete = async function (id: PlaceStructure['id']) {
        try {
            const finalId = await repo.delete(id);
            setPlaces((prev) => prev.filter((item) => item.id !== finalId));
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
