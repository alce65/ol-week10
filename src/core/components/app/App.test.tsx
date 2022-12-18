import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router';
import { App } from './App';

describe('Given App component', () => {
    test('renders the title', () => {
        render(
            <Router>
                <App />
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
