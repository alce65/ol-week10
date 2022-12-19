import { render, screen } from '@testing-library/react';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Add } from './add';

describe('Given "Add" component', () => {
    const handleAdd = jest.fn();

    beforeEach(() => {
        render(<Add handleAdd={handleAdd}></Add>);
    });

    describe('When it is call with a DOM implementation', () => {
        test(`Then component should be render with its title`, () => {
            const elementHeader = screen.getByRole('heading', {
                name: 'Añadir tarea',
            }); // <h1>

            expect(elementHeader).toBeInTheDocument();
        });
    });

    describe('When data are provided in the form', () => {
        const mockTitle = 'Test task';
        const mockUser = 'Test user';
        let inputElements: Array<HTMLElement>;
        let elementButton: HTMLElement;
        beforeEach(() => {
            inputElements = screen.getAllByRole('textbox'); // <input>
            elementButton = screen.getByRole('button');
        });
        test('Then form could be used for type content', () => {
            expect(inputElements[0]).toBeInTheDocument();
            expect(inputElements[1]).toBeInTheDocument();
            userEvent.type(inputElements[0], mockTitle);
            userEvent.type(inputElements[1], mockUser);
            expect(inputElements[0]).toHaveValue(mockTitle);
            expect(inputElements[1]).toHaveValue(mockUser);
        });
        test('Then form could be used for send the function received in props', () => {
            userEvent.type(inputElements[0], mockTitle);
            userEvent.type(inputElements[1], mockUser);
            userEvent.click(elementButton);
            expect(handleAdd).toHaveBeenCalled();
        });
        test('Then form could be used also without value for responsible', () => {
            userEvent.type(inputElements[0], mockTitle);
            userEvent.click(elementButton);
            expect(handleAdd).toHaveBeenCalled();
        });
    });
});
