import { SyntheticEvent, useState } from 'react';
import { FormField } from '../../types/form';
import { defineAttributes } from '../input/input';
import style from './input.module.css';

export function ValidatedInput<T>({
    field,
    formValidation,
}: {
    field: FormField<T>;
    formValidation: () => void;
}) {
    const attributes = defineAttributes(field);

    // const [pristine, setPristine] = useState(true);
    // const [untouched, setUntouched] = useState(true);
    // const [invalid, setInvalid] = useState(true);
    const [valid, setValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const handleBlur = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLInputElement;
        setValid(element.checkValidity());
        setErrorMessage(element.validationMessage);
        formValidation();
    };

    return (
        <div key={field.name}>
            <label className={style.label} htmlFor={field.id}>
                {field.label}
            </label>
            <input
                className={style.input}
                {...attributes}
                onBlur={handleBlur}
            />
            <p className={style.error} hidden={valid}>
                {errorMessage}
            </p>
        </div>
    );
}
