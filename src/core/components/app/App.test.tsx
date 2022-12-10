import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('Given App component', () => {
    test('renders the title', () => {
        render(<App />);
        const element = screen.getAllByText(/Learning Components/i);
        expect(element[0]).toBeInTheDocument();
    });
});
