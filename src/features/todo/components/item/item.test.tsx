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
    // const newTask = new Task(mockTitle, mockUser);
    // newTask.isCompleted = true;
    // const itemTask = new Item('slot', newTask, updateTask, deleteTask);

    test('Then we should to be able to instantiate it', () => {
        // expect(itemTask).toBeInstanceOf(Item);
    });
    // describe.each(elements)(
    //     'When it is call with a DOM implementation',
    //     (element: HTMLElement) => {
    //         test(`Then ${element.tagName} should be render`, () => {
    //             expect(element).toBeInstanceOf(HTMLElement);
    //             expect(element).toBeInTheDocument();
    //         });
    //     }
    // );
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
                // screen.getByRole('listitem'), // <li />
                screen.getByRole('checkbox'),
                ...screen.getAllByRole('status'), // 2 * <output>
                screen.getByRole('button'),
            ];
            expect(elements[1]).toHaveValue(mockTitle);
            expect(elements[2]).toHaveValue(mockUser);
            await userEvent.click(elements[0]);
            expect(updateTask).toHaveBeenCalledTimes(1);
            await userEvent.click(elements[3]);
            expect(deleteTask).toHaveBeenCalledTimes(1);
        });
    });
});
