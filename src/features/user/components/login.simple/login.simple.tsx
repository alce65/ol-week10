import { FormField } from '../../core/types/form';
import { Form } from '../../core/components/form/form';

export function LoginSimple() {
    type LoginFormData = {
        user: string;
        passwd: string;
    };

    const loginFormFields: Array<FormField<LoginFormData>> = [
        {
            label: 'User name',
            placeholder: 'Escribe tu nombre de usuario',
            name: 'user',
            id: 'user-02',
            type: 'text',
        },
        {
            label: 'Password',
            placeholder: 'Escribe tu password',
            name: 'passwd',
            id: 'passwd-02',
            type: 'password',
        },
    ];

    const loginFormData: LoginFormData = {
        user: '',
        passwd: '',
    };

    return (
        <>
            <Form<LoginFormData>
                formFields={loginFormFields}
                finalFormData={loginFormData}
            ></Form>
        </>
    );
}
