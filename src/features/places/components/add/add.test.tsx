import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Add } from './add';
import {
    PlaceContext,
    PlaceContextStructure,
} from '../../../../core/context/places/places.context';

describe('Given "Add" component in "Places" feature', () => {
    const handleAdd = jest.fn();

    const mockContext = {
        handleAdd,
    } as unknown as PlaceContextStructure;

    beforeEach(() => {
        render(
            <PlaceContext.Provider value={mockContext}>
                <Add></Add>
            </PlaceContext.Provider>
        );
    });

    describe('When component is call with a DOM implementation', () => {
        test(`Then it should be render with its name`, () => {
            const placeHeader = screen.getByRole('heading', {
                name: 'Añadir lugar',
            }); // <h1>

            expect(placeHeader).toBeInTheDocument();
        });
    });

    describe('When data are provided in the form', () => {
        const mockName = 'Test place';
        const mockCountry = 'Test author';
        let inputElements: Array<HTMLElement>;
        let elementButton: HTMLElement;
        beforeEach(() => {
            inputElements = screen.getAllByRole('textbox'); // <input>
            elementButton = screen.getByRole('button');
        });
        test('Then form could be used for type content', () => {
            expect(inputElements[0]).toBeInTheDocument();
            expect(inputElements[1]).toBeInTheDocument();
            userEvent.type(inputElements[0], mockName);
            userEvent.type(inputElements[1], mockCountry);
            expect(inputElements[0]).toHaveValue(mockName);
            expect(inputElements[1]).toHaveValue(mockCountry);
        });
        test('Then form could be used for send the function received in props', () => {
            userEvent.type(inputElements[0], mockName);
            userEvent.type(inputElements[1], mockCountry);
            userEvent.click(elementButton);
            expect(handleAdd).toHaveBeenCalled();
        });
        test('Then form could be used also without value for responsible', () => {
            userEvent.type(inputElements[0], mockName);
            userEvent.click(elementButton);
            expect(handleAdd).toHaveBeenCalled();
        });
    });
});
