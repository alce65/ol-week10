import { Form } from '../../core/components/form/form';
import { ValidateForm } from '../../core/components/validate.form/form';
import { FormField } from '../../core/types/form';

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

    const labelButton = 'Login';

    return (
        <>
            <h3>Login</h3>
            <Form<LoginFormData>
                formFields={loginFormFields}
                finalFormData={loginFormData}
                labelButton={labelButton}
            ></Form>
            <h3>Login (with own validation)</h3>
            <ValidateForm<LoginFormData>
                formFields={[
                    { ...loginFormFields[0], id: 'user-03' },
                    { ...loginFormFields[1], id: 'passwd-03' },
                ]}
                finalFormData={loginFormData}
                labelButton={labelButton}
            ></ValidateForm>
        </>
    );
}
