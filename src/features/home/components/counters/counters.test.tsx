import { render, screen } from '@testing-library/react';
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
});
