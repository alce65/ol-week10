import { render, screen } from '@testing-library/react';
import { Footer } from './footer';

describe('Given Footer component', () => {
    describe('When it has been render', () => {
        test('Then the title should be in the screen', () => {
            render(<Footer />);
            // Seleccionando por texto
            // const element = screen.getAllByText(/Learning Components/i);
            // La mejor práctica sería hacerlo por rol
            const elementHeader = screen.getByRole('contentinfo', {
                name: 'footer',
            });
            expect(elementHeader).toBeInTheDocument();
        });
    });
});
