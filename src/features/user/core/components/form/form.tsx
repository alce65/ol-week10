import { SyntheticEvent } from 'react';
import { consoleDebug } from '../../../../../tools/debug';
import { FormField } from '../../types/form';
import { Input } from '../input/input';

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
            <form onSubmit={handleSubmit}>
                {formFields.map((field) => (
                    <Input key={field.name} field={field}></Input>
                ))}
                <button type="submit">Login</button>
            </form>
        </>
    );
}
