import { render, screen } from '@testing-library/react';
import TodoPage from './todo.page';
import { List } from '../components/list/list';
jest.mock('../components/list/list');

describe('Given TodoPage component', () => {
    describe('When it has been render', () => {
        beforeEach(() => {
            (List as jest.Mock).mockImplementation(() => {
                return <p>Mock List</p>;
            });  
        })
        test('Then the title should be in the screen', () => {
            const title = /Todo/i;
            render(<TodoPage />);
            // Seleccionando por texto
            // const element = screen.getAllByText(/Learning Components/i);
            // La mejor práctica sería hacerlo por rol
            const elementHeader = screen.getByRole('heading', {
                name: title,
            });
            expect(elementHeader).toBeInTheDocument();
        });
    });
});
