import { SyntheticEvent, useState } from 'react';
import { FormField } from '../../types/form';
import style from './input.module.css';

const defineAttributes = <T,>(field: FormField<T>) => {
    const attributes: { [key: string]: string | boolean } = {
        type: field.type,
        name: field.name,
        id: field.id,
        placeholder: field.placeholder,
    };

    if (field.role) {
        attributes.role = field.role;
    }
    if (field.required) {
        attributes.required = field.required;
    }

    return attributes;
};

export function Input<T>({ field }: { field: FormField<T> }) {
    const attributes = defineAttributes(field);

    return (
        <div key={field.name}>
            <label className={style.label} htmlFor={field.id}>
                {field.label}
            </label>
            <input className={style.input} {...attributes} />
            <p className={style.error}></p>
        </div>
    );
}

export function ValidatedInput<T>({ field }: { field: FormField<T> }) {
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
        console.log(element.validity);
        console.dir(element.checkValidity);
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
