import { SyntheticEvent } from 'react';

import { consoleDebug } from '../../../../../tools/debug';
import { FormField } from '../../types/form';
import { Input } from '../input/input';
import style from './form.module.css';

// T: type of FormData  e.g. LoginFormData)
export function Form<T>({
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
                    <Input key={field.name} field={field}></Input>
                ))}
                <button className={style.button} type="submit">
                    {labelButton}
                </button>
            </form>
        </>
    );
}
