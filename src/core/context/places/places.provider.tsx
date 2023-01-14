import { useMemo } from 'react';
// import { usePlaces } from '../../features/places/hooks/use.places';
import { PlaceContext } from './places.context';
import { usePlaces } from '../../../features/places/hooks/use.places';

export function PlaceContextProvider({ children }: { children: JSX.Element }) {
    const { getPlaces, handleLoad, handleAdd, handleDelete, handleUpdate } =
        usePlaces();

    const context = useMemo(
        () => ({
            places: getPlaces(),
            handleLoad,
            handleAdd,
            handleDelete,
            handleUpdate,
        }),
        [getPlaces, handleAdd, handleDelete, handleLoad, handleUpdate]
    );

    return (
        <PlaceContext.Provider value={context}>
            {children}
        </PlaceContext.Provider>
    );
}
