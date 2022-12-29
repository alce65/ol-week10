import { SyntheticEvent } from 'react';
import { consoleDebug } from '../../../../../tools/debug';
import { FormField } from '../../types/form';
import { Input, ValidatedInput } from '../input/input';
import style from './form.module.css';

// T: type of FormData  e.g. LoginFormData)
export function Form<T>({
    formFields,
    finalFormData,
}: {
    formFields: Array<FormField<T>>;
    finalFormData: T;
}) {
    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        const form = ev.target as HTMLFormElement;

        // El api de validación incluye la propiedad noValidate y el método checkValidity
        // con el valor boolean que indica la validez o no del formulario
        // El método reportValidity que desencadena la aparición
        // de los mensajes de validación necesarios
        if (form.noValidate) {
            console.log('Formulario no valido');
        }
        const formData = new FormData(form);
        let key: keyof T;
        for (key in finalFormData) {
            const value = formData.get(key) as T[keyof T] & string;
            finalFormData[key] = value;
        }
        consoleDebug(finalFormData);
    };
    return (
        <>
            <h3>Login</h3>
            <form onSubmit={handleSubmit} noValidate>
                {formFields.map((field) => (
                    <Input key={field.name} field={field}></Input>
                ))}
                <button className={style.button} type="submit">
                    Login
                </button>
            </form>
            <h3>Login (with own validation)</h3>
            <form onSubmit={handleSubmit} noValidate>
                {formFields.map((field) => (
                    <ValidatedInput
                        key={field.name}
                        field={field}
                    ></ValidatedInput>
                ))}
                <button className={style.button} type="submit">
                    Login
                </button>
            </form>
        </>
    );
}
