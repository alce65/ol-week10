import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counters } from './counters';

describe('Given Counters component', () => {
    describe('When it is render in the screen', () => {
        beforeEach(() => {
            render(<Counters />);
        });

        test('Then the title should be displayed', () => {
            const title = screen.getByText(/clicks totales/i);
            expect(title).toBeInTheDocument();
        });
    });

    describe(`When we click any button 
        in the components rendered inside it`, () => {
        let buttons: Array<HTMLElement>;
        beforeEach(() => {
            render(<Counters />);
            buttons = screen.getAllByRole('button');
        });
        test('Then "click totales" should increase', () => {
            userEvent.click(buttons[0]);
            const clicks = screen.getByText(/clicks totales: 1/i);
            expect(clicks).toBeInTheDocument();
        });
    });
});
