import { FormField } from '../../core/types/form';
import { Form } from '../../core/components/form/form';

export function LoginSimple() {
    // El tipo LoginFormData define los campos de datos del formulario

    // El tipo FormField<LoginFormData> define el conjunto de datos necesarios
    // para definir cada control del formulario: type, name, id....
    // El name solo puede ser alguno de los campos del LoginFormData

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
            required: true,
        },
        {
            label: 'Password',
            placeholder: 'Escribe tu password',
            name: 'passwd',
            id: 'passwd-02',
            type: 'password',
            required: true,
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
