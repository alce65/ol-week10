import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Item } from './item';
import { Note } from '../../models/note';
import {
    NoteContext,
    NoteContextStructure,
} from '../../../../core/context/note.context';

describe('Given "Item" component', () => {
    const handleUpdate = jest.fn();
    const handleDelete = jest.fn();
    const mockContext = {
        handleUpdate,
        handleDelete,
    } as unknown as NoteContextStructure;

    const mockTitle = 'Test note';
    const mockAuthor = 'Test author';
    const mockNote = new Note(mockTitle, mockAuthor);
    describe('When data are provided in the component', () => {
        test('Then user could interact with them', async () => {
            render(
                <NoteContext.Provider value={mockContext}>
                    <Item item={mockNote}></Item>
                </NoteContext.Provider>
            );

            const elements = [
                screen.getByRole('checkbox'),
                ...screen.getAllByRole('status'), // 2 * <output>
                screen.getByRole('button'),
            ];
            expect(elements[1]).toHaveValue(mockTitle);
            expect(elements[2]).toHaveValue(mockAuthor);
            userEvent.click(elements[0]);
            expect(handleUpdate).toHaveBeenCalledTimes(1);
            userEvent.click(elements[3]);
            expect(handleDelete).toHaveBeenCalledTimes(1);
        });
    });
});
