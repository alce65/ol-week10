import { FormField } from '../../types/form';

export function Input<T>({ field }: { field: FormField<T> }) {
    const attributes: { [key: string]: string } = {
        type: field.type,
        name: field.name,
        id: field.id,
        placeholder: field.placeholder,
    };

    if (field.role) {
        attributes.role = field.role;
    }

    return (
        <div key={field.name}>
            <label htmlFor={field.id}>{field.label}</label>
            <input {...attributes} />
        </div>
    );
}
