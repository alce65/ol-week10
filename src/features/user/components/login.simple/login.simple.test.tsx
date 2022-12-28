import { LoginSimple } from './login.simple';
import { Form } from '../../core/components/form/form';
import { render } from '@testing-library/react';

jest.mock('../../core/components/form/form');

describe('Given component LoginSimple', () => {
    describe('When it has been rendered', () => {
        // describe('When data are provided in the form', () =>
        beforeEach(() => {
            render(<LoginSimple></LoginSimple>);
        });
        test('Then it should render "Form"', () => {
            expect(Form).toHaveBeenCalled();
        });
    });
});
