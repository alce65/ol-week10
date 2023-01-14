import { PlaceStructure } from '../models/place';
import { PlaceAction } from './action.creators';
import { placeActionTypes } from './action.types';

/* 
- Función PURA
    - Ante los mismos argumentos -> la misma respuesta 
    - No modifica ni depende da nada fuera de la función

- Reducer: función PURA que
    - recibe un estado y una acción
    - devuelve un nuevo estado -> NO HAY MUTACIÓN
*/

export function placeReducer(
    state: Array<PlaceStructure>,
    action: PlaceAction
): Array<PlaceStructure> {
    switch (action.type) {
        case placeActionTypes.load:
            const loadedPlaces = action.payload as Array<PlaceStructure>;
            return loadedPlaces;
        case placeActionTypes.add:
            const addedPlace = action.payload as PlaceStructure;
            return [...state, addedPlace];
        case placeActionTypes.update:
            const updatePlace = action.payload as PlaceStructure;
            return state.map((item) =>
                item.id === updatePlace.id ? updatePlace : item
            );
        case placeActionTypes.delete:
            const finalId = action.payload as PlaceStructure['id'];
            return state.filter((item) => item.id !== finalId);
        default:
            return [...state];
    }
}
