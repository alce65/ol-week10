import { render, screen } from '@testing-library/react';
import { FormField } from '../../types/form';
import { Input } from './input';

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
    describe('When it has be rendered', () => {
        beforeEach(() => {
            render(
                <form>
                    <Input field={field}></Input>
                </form>
            );
        });
        test('Then label should be in the screen', () => {
            const element = screen.getByLabelText(mockLabel);
            expect(element).toBeInTheDocument();
        });
    });
});
