import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormField } from '../../types/form';
import { Form } from './form';
import { consoleDebug } from '../../../../../tools/debug';

jest.mock('../../../../../tools/debug');

describe('Given component Form', () => {
    const mockLabel = 'Test label';
    type SampleFormData = {
        sample: string;
    };

    const finalFormData: SampleFormData = {
        sample: '',
    };

    const formFields: Array<FormField<SampleFormData>> = [
        {
            label: mockLabel,
            placeholder: '',
            name: 'sample',
            type: 'password',
            id: 'sample-01',
            role: 'textbox',
        },
    ];

    describe('When it has be rendered', () => {
        let labelElement: HTMLLabelElement;
        let inputElement: HTMLInputElement;
        let buttonElement: HTMLButtonElement;
        beforeEach(() => {
            render(
                <Form
                    finalFormData={finalFormData}
                    formFields={formFields}
                ></Form>
            );
            labelElement = screen.getByLabelText(mockLabel);
            inputElement = screen.getByRole('textbox');
            buttonElement = screen.getByRole('button');
        });
        test('Then label and controls should be in the screen', () => {
            expect(labelElement).toBeInTheDocument();
            expect(inputElement).toBeInTheDocument();
            expect(buttonElement).toBeInTheDocument();
        });
        test('Then if user click button data from inputs should be recovered', () => {
            const mockInput = 'Test input';
            userEvent.type(inputElement, mockInput);
            expect(inputElement).toHaveValue(mockInput);
            userEvent.click(buttonElement);
            expect(consoleDebug).toHaveBeenCalledWith({
                sample: mockInput,
            });
        });
    });
});
