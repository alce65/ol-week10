/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, waitFor, act } from '@testing-library/react';
import { List } from './list';

import { Note } from '../../models/note';
import {
    NoteContext,
    NoteContextStructure,
} from '../../../../core/context/notes/note.context';

const mockNotes = [new Note('Test note', 'user')];

describe('Given "List" component', () => {
    const handleLoad = jest.fn();
    let mockContext: NoteContextStructure;

    describe('When it is initially instantiated without data', () => {
        beforeEach(async () => {
            mockContext = {
                notes: [],
                handleLoad,
            } as unknown as NoteContextStructure;
            await act(async () => {
                render(
                    <NoteContext.Provider value={mockContext}>
                        <List></List>
                    </NoteContext.Provider>
                );
            });
        });
        test(`Then component should be render the loading`, () => {
            const elementTitle = screen.getByRole('heading', {
                name: 'Lista de notas',
            }); // <h3>
            const addLabel = /Añadir nota/i;
            const loadingLabel = /Loading/i;
            const elementAdd = screen.getByText(addLabel);
            const elementLoading = screen.getByText(loadingLabel);
            expect(elementTitle).toBeInTheDocument();
            expect(elementAdd).toBeInTheDocument();
            expect(elementLoading).toBeInTheDocument();
        });
    });

    describe('When it load the data from getNote', () => {
        beforeEach(async () => {
            mockContext = {
                notes: mockNotes,
                handleLoad,
            } as unknown as NoteContextStructure;
            await act(async () => {
                render(
                    <NoteContext.Provider value={mockContext}>
                        <List></List>
                    </NoteContext.Provider>
                );
            });
        });
        test(`Then it should be render the data`, async () => {
            const elementList = await screen.findByRole('list'); // <ul />
            expect(elementList).toBeInTheDocument();
            await waitFor(() => {
                expect(handleLoad).toHaveBeenCalled();
            });
            const elementItem = await screen.findByText(/Test note/i);
            expect(elementItem).toBeInTheDocument();
        });
    });
});
