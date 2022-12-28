import { FormField } from '../../types/form';

export function Input<T>({ field }: { field: FormField<T> }) {
    return (
        <div key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
                type={field.type}
                name={field.name}
                id={field.id}
                placeholder={field.placeholder}
            />
        </div>
    );
}
