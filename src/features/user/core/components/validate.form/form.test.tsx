import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormField } from '../../types/form';
import { ValidateForm } from './form';
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
            required: true,
        },
    ];

    describe('When it has be rendered', () => {
        let labelElement: HTMLLabelElement;
        let inputElement: HTMLInputElement;
        let buttonElements: Array<HTMLButtonElement>;
        let formElement: HTMLFormElement;
        beforeEach(() => {
            render(
                <ValidateForm
                    finalFormData={finalFormData}
                    formFields={formFields}
                    labelButton="Test form"
                ></ValidateForm>
            );
            labelElement = screen.getByLabelText(mockLabel);
            inputElement = screen.getByRole('textbox');
            buttonElements = screen.getAllByRole('button');
            formElement = screen.getByRole('form');
        });
        test('Then label and controls should be in the screen', () => {
            expect(labelElement).toBeInTheDocument();
            expect(inputElement).toBeInTheDocument();
            expect(buttonElements[0]).toBeInTheDocument();
            expect(formElement).toBeInTheDocument();
        });
        test('Then if user click button, data from inputs should be recovered', () => {
            const mockInput = 'Test input';
            userEvent.type(inputElement, mockInput);
            expect(inputElement).toHaveValue(mockInput);
            userEvent.tab();
            userEvent.click(buttonElements[0]);
            expect(consoleDebug).toHaveBeenLastCalledWith({
                sample: mockInput,
            });
        });
        test(`Then if user click button without required input data,
                ...`, () => {
            userEvent.clear(inputElement);
            expect(inputElement).toHaveValue('');
            userEvent.tab();
            expect(inputElement).toBeInvalid();
            userEvent.click(buttonElements[1]);
            // button disabled => no submit event
            expect(consoleDebug).toHaveBeenLastCalledWith(
                'Formulario no valido'
            );
        });
    });
});
