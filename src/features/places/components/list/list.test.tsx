/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, waitFor, act } from '@testing-library/react';
import { List } from './list';

import { Place } from '../../models/place';
import {
    PlaceContext,
    PlaceContextStructure,
} from '../../../../core/context/places/places.context';

const mockPlaces = [new Place('Test place', 'user')];

describe('Given "List" component', () => {
    const handleLoad = jest.fn();
    let mockContext: PlaceContextStructure;

    describe('When it is initially instantiated without data', () => {
        beforeEach(async () => {
            mockContext = {
                places: [],
                handleLoad,
            } as unknown as PlaceContextStructure;
            await act(async () => {
                render(
                    <PlaceContext.Provider value={mockContext}>
                        <List></List>
                    </PlaceContext.Provider>
                );
            });
        });
        test(`Then component should be render the loading`, () => {
            const elementTitle = screen.getByRole('heading', {
                name: 'Lista de lugares',
            }); // <h3>
            const addLabel = /Añadir lugar/i;
            const loadingLabel = /Loading/i;
            const elementAdd = screen.getByText(addLabel);
            const elementLoading = screen.getByText(loadingLabel);
            expect(elementTitle).toBeInTheDocument();
            expect(elementAdd).toBeInTheDocument();
            expect(elementLoading).toBeInTheDocument();
        });
    });

    describe('When it load the data from getPlace', () => {
        beforeEach(async () => {
            mockContext = {
                places: mockPlaces,
                handleLoad,
            } as unknown as PlaceContextStructure;
            await act(async () => {
                render(
                    <PlaceContext.Provider value={mockContext}>
                        <List></List>
                    </PlaceContext.Provider>
                );
            });
        });
        test(`Then it should be render the data`, async () => {
            const elementList = await screen.findByRole('list'); // <ul />
            expect(elementList).toBeInTheDocument();
            await waitFor(() => {
                expect(handleLoad).toHaveBeenCalled();
            });
            const elementItem = await screen.findByText(/Test place/i);
            expect(elementItem).toBeInTheDocument();
        });
    });
});
