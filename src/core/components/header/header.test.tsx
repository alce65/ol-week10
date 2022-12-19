import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router';
import { Header } from './header';

describe('Given Header component', () => {
    describe('When it has been render', () => {
        test('Then the title should be in the screen', () => {
            render(
                <Router>
                    <Header>
                        <></>
                    </Header>
                </Router>
            );
            // Seleccionando por texto
            // const element = screen.getAllByText(/Learning Components/i);
            // La mejor práctica sería hacerlo por rol
            const elementHeader = screen.getByRole('heading', {
                name: 'Learning Components',
            });
            expect(elementHeader).toBeInTheDocument();
        });
    });
});
