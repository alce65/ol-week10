import { render, screen } from '@testing-library/react';
import { Sample } from './sample';
import { getHour } from '../../services/time/time';

jest.mock('../../services/time/time');

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

    describe('When the hour is less than 10', () => {
        test('Then child component should be rendered', () => {
            //
            (getHour as jest.Mock).mockReturnValue(9);
            const title = 'Child component';
            render(
                <Sample>
                    <p>{title}</p>
                </Sample>
            );
            const child = screen.getByText(title);
            expect(child).toBeInTheDocument();
        });
    });
});
