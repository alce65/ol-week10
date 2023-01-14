import { PlaceStructure } from '../models/place';
import { placeActionTypes } from './action.types';

export type PlaceAction = {
    type: string;
    payload: Array<PlaceStructure> | PlaceStructure | PlaceStructure['id'];
};

export const placeLoadCreator = (
    payload: Array<PlaceStructure>
): PlaceAction => ({
    type: placeActionTypes.load,
    payload,
});

export const placeAddCreator = (payload: PlaceStructure): PlaceAction => ({
    type: placeActionTypes.add,
    payload,
});

export const placeUpdateCreator = (payload: PlaceStructure): PlaceAction => ({
    type: placeActionTypes.update,
    payload,
});

export const placeDeleteCreator = (
    payload: PlaceStructure['id']
): PlaceAction => ({
    type: placeActionTypes.delete,
    payload,
});
