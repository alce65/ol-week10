import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Item } from './item';
import { Note } from '../../models/note';

describe('Given "Item" component', () => {
    const updateNote = jest.fn();
    const deleteNote = jest.fn();
    const mockTitle = 'Test note';
    const mockUser = 'Test user';
    const mockNote = new Note(mockTitle, mockUser);
    describe('When data are provided in the component', () => {
        test('Then user could interact with them', async () => {
            render(
                <Item
                    item={mockNote}
                    handleUpdate={updateNote}
                    handleDelete={deleteNote}
                ></Item>
            );

            const elements = [
                screen.getByRole('checkbox'),
                ...screen.getAllByRole('status'), // 2 * <output>
                screen.getByRole('button'),
            ];
            expect(elements[1]).toHaveValue(mockTitle);
            expect(elements[2]).toHaveValue(mockUser);
            userEvent.click(elements[0]);
            expect(updateNote).toHaveBeenCalledTimes(1);
            userEvent.click(elements[3]);
            expect(deleteNote).toHaveBeenCalledTimes(1);
        });
    });
});
