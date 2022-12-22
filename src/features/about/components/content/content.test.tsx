import { render, screen } from '@testing-library/react';
import { Content } from './content';

describe('Given "Content" component ', () => {
    describe('When we instantiate it', () => {
        beforeEach(() => {
            render(<Content />);
        });
        test('Then it should be render in the screen', () => {
            const title = /Content/i;
            const element = screen.getByRole('region', { name: title });
            expect(element).toBeInTheDocument();
        });
    });
});
