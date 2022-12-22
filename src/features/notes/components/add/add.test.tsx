import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Add } from './add';

describe('Given "Add" component in "Notes" feature', () => {
    const handleAdd = jest.fn();

    beforeEach(() => {
        render(<Add handleAdd={handleAdd}></Add>);
    });

    describe('When component is call with a DOM implementation', () => {
        test(`Then it should be render with its title`, () => {
            const noteHeader = screen.getByRole('heading', {
                name: 'Añadir nota',
            }); // <h1>

            expect(noteHeader).toBeInTheDocument();
        });
    });

    describe('When data are provided in the form', () => {
        const mockAuthor = 'Test author';
        const mockTitle = 'Test task';
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
            userEvent.type(inputElements[1], mockAuthor);
            expect(inputElements[0]).toHaveValue(mockTitle);
            expect(inputElements[1]).toHaveValue(mockAuthor);
        });
        test('Then form could be used for send the function received in props', () => {
            userEvent.type(inputElements[0], mockTitle);
            userEvent.type(inputElements[1], mockAuthor);
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
