import { fireEvent, render, screen } from '@testing-library/react';
import { Counter } from './counter';

describe('Given Counter component', () => {
    test('renders the title', () => {
        const setTotalMock = jest.fn();
        render(<Counter setTotal={setTotalMock} />);
        const title = screen.getByText(/counter/i);
        expect(title).toBeInTheDocument();
        const value = screen.getByText(/value: 0/i);
        expect(value).toBeInTheDocument();
    });

    test('When button + is clicked then should ...', () => {
        const setTotalMock = jest.fn();
        render(<Counter setTotal={setTotalMock} />);
        const buttons = screen.getAllByRole('button');
        fireEvent.click(buttons[1]);
        const value = screen.getByText(/value: 1/i);
        expect(value).toBeInTheDocument();
    });
});
