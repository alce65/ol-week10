import { fireEvent, render, screen } from '@testing-library/react';
import { Counter2 } from './counter';

describe('Given Counter2 component', () => {
    describe('When it is render in the screen', () => {
        const setTotalMock = jest.fn();
        let buttons: Array<HTMLElement>;
        beforeEach(() => {
            render(<Counter2 setTotal={setTotalMock} />);
            buttons = screen.getAllByRole('button');
        });

        test('Then the title should be displayed', () => {
            const title = screen.getByText(/counter/i);
            expect(title).toBeInTheDocument();
            const value = screen.getByText(/value: 0/i);
            expect(value).toBeInTheDocument();
        });
        test('Then if button + is clicked the new value should be in the screen', () => {
            fireEvent.click(buttons[1]);
            const value = screen.getByText(/value: 1/i);
            const clicks = screen.getByText(/clicks: 1/i);
            expect(value).toBeInTheDocument();
            expect(clicks).toBeInTheDocument();
        });
        test('Then if button - is clicked the new value should be in the screen', () => {
            fireEvent.click(buttons[0]);
            const value = screen.getByText(/value: -1/i);
            const clicks = screen.getByText(/clicks: 1/i);
            expect(value).toBeInTheDocument();
            expect(clicks).toBeInTheDocument();
        });
    });
});
