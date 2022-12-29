import { FormField } from '../../types/form';
import style from './input.module.css';

const defineAttributes = <T,>(field: FormField<T>) => {
    const attributes: { [key: string]: string } = {
        type: field.type,
        name: field.name,
        id: field.id,
        placeholder: field.placeholder,
    };

    if (field.role) {
        attributes.role = field.role;
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
        </div>
    );
}
