import { render, screen } from '@testing-library/react';
import { Sample } from './sample';

describe('Given Sample component', () => {
    describe('When it has been render', () => {
        test('Then the title should be in the screen', () => {
            const title = /Titulo/i;
            render(
                <Sample>
                    <></>
                </Sample>
            );
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
