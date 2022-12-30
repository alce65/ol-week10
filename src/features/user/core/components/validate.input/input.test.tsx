import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormField } from '../../types/form';
import { ValidatedInput } from './input';

describe('Given component Input', () => {
    const mockLabel = 'Test label';

    type SampleFormData = {
        sample: string;
    };

    const field: FormField<SampleFormData> = {
        label: mockLabel,
        placeholder: '',
        name: 'sample',
        type: 'password',
        id: 'sample-01',
        role: 'textbox',
    };

    const formValidation = jest.fn();

    describe('When it has be rendered', () => {
        beforeEach(() => {
            render(
                <form>
                    <ValidatedInput
                        field={field}
                        formValidation={formValidation}
                    ></ValidatedInput>
                </form>
            );
        });
        test('Then label should be in the screen', () => {
            const element = screen.getByLabelText(mockLabel);
            expect(element).toBeInTheDocument();
        });
        test('If the input is blur, formValidation should be called', () => {
            const element = screen.getByRole('textbox');
            userEvent.type(element, 'test');
            userEvent.tab();
            expect(formValidation).toHaveBeenCalled();
        });
    });
});
