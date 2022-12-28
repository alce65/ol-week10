import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Login } from './login';
import { consoleDebug } from '../../../../tools/debug';

jest.mock('../../../../tools/debug');

describe('Given Login component', () => {
    describe('When it has been rendered', () => {
        // describe('When data are provided in the form', () =>
        beforeEach(() => {
            render(<Login></Login>);
        });
        test('Then form could be used for type content', () => {
            const mockUser = 'Test user';
            const mockPasswd = '12345';
            const inputElements = screen.getAllByRole('textbox'); // <input>
            const buttonElement = screen.getByRole('button');
            expect(inputElements[0]).toBeInTheDocument();
            expect(inputElements[1]).toBeInTheDocument();
            userEvent.type(inputElements[0], mockUser);
            userEvent.type(inputElements[1], mockPasswd);
            expect(inputElements[0]).toHaveValue(mockUser);
            expect(inputElements[1]).toHaveValue(mockPasswd);
            userEvent.click(buttonElement);
            expect(consoleDebug).toHaveBeenCalledWith({
                user: mockUser,
                passwd: mockPasswd,
            });
        });
    });
});
