import { render, screen } from '@testing-library/react';
import UserPage from './user.page';

describe('Given UserPage', () => {
    describe('When it hes been render', () => {
        beforeEach(() => {
            render(<UserPage />);
        });
        test('Then the title should be in the screen', () => {
            const title = 'User Page';
            const elementTitle = screen.getByRole('heading', { name: title });
            expect(elementTitle).toBeInTheDocument();
        });
    });
});
