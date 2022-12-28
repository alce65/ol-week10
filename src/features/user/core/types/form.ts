export type FormField<T> = {
    label: string;
    placeholder: string;
    name: keyof T & string;
    id: string;
    type: 'text' | 'password';
    role?: 'textbox';
};
