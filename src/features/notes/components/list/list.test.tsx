/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, waitFor, act } from '@testing-library/react';
import { List } from './list';
import { useNotes } from '../../hooks/use.notes';
import { Note } from '../../models/note';

jest.mock('../../hooks/use.notes');

const mockNotes = [new Note('Test note', 'user')];

describe('Given "List" component', () => {
    beforeEach(() => {
        (useNotes as jest.Mock).mockReturnValue({
            getNotes: jest.fn(),
            handleLoad: jest.fn(),
            handleAdd: jest.fn(),
            handleDelete: jest.fn(),
            handleUpdate: jest.fn(),
        });
    });
    describe('When it is initially instantiated without data', () => {
        beforeEach(() => {
            (useNotes().getNotes as jest.Mock).mockReturnValue([]);
        });
        beforeEach(async () => {
            await act(async () => {
                render(<List></List>);
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
            expect(useNotes().getNotes).toHaveBeenCalled();
        });
    });

    describe('When it load the data from getNote', () => {
        beforeEach(() => {
            (useNotes().getNotes as jest.Mock).mockReturnValue(mockNotes);
        });
        beforeEach(async () => {
            await act(async () => {
                render(<List></List>);
            });
        });
        test(`Then it should be render the data`, async () => {
            const elementList = await screen.findByRole('list'); // <ul />
            expect(elementList).toBeInTheDocument();
            await waitFor(() => {
                expect(useNotes().handleLoad).toHaveBeenCalled();
            });
            const elementItem = await screen.findByText(/Test note/i);
            expect(elementItem).toBeInTheDocument();
        });
    });
});
