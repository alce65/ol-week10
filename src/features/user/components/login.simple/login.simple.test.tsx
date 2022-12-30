import { render } from '@testing-library/react';

import { Form } from '../../core/components/form/form';
import { ValidateForm } from '../../core/components/validate.form/form';
import { LoginSimple } from './login.simple';

jest.mock('../../core/components/form/form');
jest.mock('../../core/components/validate.form/form');

describe('Given component LoginSimple', () => {
    describe('When it has been rendered', () => {
        // describe('When data are provided in the form', () =>
        beforeEach(() => {
            render(<LoginSimple></LoginSimple>);
        });
        test('Then it should render "Form"', () => {
            expect(Form).toHaveBeenCalled();
            expect(ValidateForm).toHaveBeenCalled();
        });
    });
});
