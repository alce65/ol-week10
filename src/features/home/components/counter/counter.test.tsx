import { fireEvent, render, screen } from '@testing-library/react';
import { Counter } from './counter';

export const titleDisplayTest = () => {
    const title = screen.getByText(/counter/i);
    expect(title).toBeInTheDocument();
    const value = screen.getByText(/value: 0/i);
    expect(value).toBeInTheDocument();
};

export const buttonIncreaseTest = (button: HTMLElement) => {
    fireEvent.click(button);
    const value = screen.getByText(/value: 1/i);
    const clicks = screen.getByText(/clicks: 1/i);
    expect(value).toBeInTheDocument();
    expect(clicks).toBeInTheDocument();
};

export const buttonDecreaseTest = (button: HTMLElement) => {
    fireEvent.click(button);
    const value = screen.getByText(/value: -1/i);
    const clicks = screen.getByText(/clicks: 1/i);
    expect(value).toBeInTheDocument();
    expect(clicks).toBeInTheDocument();
};

describe('Given Counter component', () => {
    describe('When it is render in the screen', () => {
        const setTotalMock = jest.fn();
        let buttons: Array<HTMLElement>;
        beforeEach(() => {
            render(<Counter setTotal={setTotalMock} />);
            buttons = screen.getAllByRole('button');
        });

        test('Then the title should be displayed', titleDisplayTest);
        test('Then if button + is clicked the new value should be in the screen', () => {
            buttonIncreaseTest(buttons[1]);
        });
        test('Then if button - is clicked the new value should be in the screen', () => {
            buttonDecreaseTest(buttons[0]);
        });
    });
});
