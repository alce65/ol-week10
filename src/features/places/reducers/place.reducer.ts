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
// const initialState: Array<PlaceStructure> = [];

export function placeReducer(
    state: Array<PlaceStructure>,
    action: PlaceAction
): Array<PlaceStructure> {
    switch (action.type) {
        case placeActionTypes.load:
            return action.payload as Array<PlaceStructure>;
        case placeActionTypes.add:
            return [
                ...(state as Array<PlaceStructure>),
                action.payload as PlaceStructure,
            ];
        case placeActionTypes.update:
            const updatePlace = action.payload as PlaceStructure;
            return (state as Array<PlaceStructure>).map((item) =>
                item.id === updatePlace.id ? updatePlace : item
            );
        case placeActionTypes.delete:
            const finalId = action.payload as PlaceStructure['id'];
            return state.filter((item) => item.id !== finalId);
        default:
            return [...state];
    }
}
