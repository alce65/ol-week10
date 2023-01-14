import { render } from '@testing-library/react';
import { PlaceContextProvider } from './places.provider';
import * as usePlaces from '../../../features/places/hooks/use.places';

describe('Given PlaceContextProvider', () => {
    describe('When we use it', () => {
        test('Then it should call the custom hook usePlaces', () => {
            const spyUsePlaces = jest.spyOn(usePlaces, 'usePlaces');
            render(
                <PlaceContextProvider>
                    <></>
                </PlaceContextProvider>
            );
            expect(spyUsePlaces).toHaveBeenCalled();
        });
    });
});
