import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Item } from './item';
import { Place } from '../../models/place';
import {
    PlaceContext,
    PlaceContextStructure,
} from '../../../../core/context/places/places.context';

describe('Given "Item" component', () => {
    const handleUpdate = jest.fn();
    const handleDelete = jest.fn();
    const mockContext = {
        handleUpdate,
        handleDelete,
    } as unknown as PlaceContextStructure;

    const mockTitle = 'Test place';
    const mockAuthor = 'Test country';
    const mockPlace = new Place(mockTitle, mockAuthor);
    describe('When data are provided in the component', () => {
        test('Then user could interact with them', async () => {
            render(
                <PlaceContext.Provider value={mockContext}>
                    <Item item={mockPlace}></Item>
                </PlaceContext.Provider>
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
