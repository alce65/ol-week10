import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
// import { Task } from '../../models/task';
import { Item } from './item';
import { Task } from '../../models/task';

describe('Given "Item" component', () => {
    // document.body.innerHTML = `<slot></slot>`;
    const updateTask = jest.fn();
    const deleteTask = jest.fn();
    const mockTitle = 'Test task';
    const mockUser = 'Test user';
    const mockTask = new Task(mockTitle, mockUser);
    describe('When data are provided in the component', () => {
        test('Then user could interact with them', async () => {
            render(
                <Item
                    item={mockTask}
                    handleUpdate={updateTask}
                    handleDelete={deleteTask}
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
            expect(updateTask).toHaveBeenCalledTimes(1);
            userEvent.click(elements[3]);
            expect(deleteTask).toHaveBeenCalledTimes(1);
        });
    });
});
