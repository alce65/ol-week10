import { SyntheticEvent } from 'react';
import { consoleDebug } from '../../../../../tools/debug';
import { FormField } from '../../types/form';
import { ValidatedInput } from '../validate.input/input';
import style from '../form/form.module.css';

export function ValidateForm<T>({
    formFields,
    finalFormData,
    labelButton,
}: {
    formFields: Array<FormField<T>>;
    finalFormData: T;
    labelButton: string;
}) {
    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        const form = ev.target as HTMLFormElement;

        // El api de validación incluye la propiedad noValidate y el método checkValidity
        // con el valor boolean que indica la validez o no del formulario
        // El método reportValidity que desencadena la aparición
        // de los mensajes de validación necesarios
        if (!form.checkValidity()) {
            consoleDebug('Formulario no valido');
            return;
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
            <form onSubmit={handleSubmit} noValidate>
                {formFields.map((field) => (
                    <ValidatedInput
                        key={field.name}
                        field={field}
                    ></ValidatedInput>
                ))}
                <button className={style.button} type="submit">
                    {labelButton}
                </button>
            </form>
        </>
    );
}
