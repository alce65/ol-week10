import { SyntheticEvent } from 'react';
import { consoleDebug } from '../../../../tools/debug';
import { Button } from './login.styled';
import styled from 'styled-components';

type LoginFormData = {
    user: string;
    passwd: string;
};

type FormField = {
    label: string;
    placeholder: string;
    name: keyof LoginFormData;
    id: string;
    type: 'text' | 'password';
    role?: 'textbox';
};

const loginFormFields: Array<FormField> = [
    {
        label: 'User name',
        placeholder: 'Escribe tu nombre de usuario',
        name: 'user',
        id: 'user-01',
        type: 'text',
    },
    {
        label: 'Password',
        placeholder: 'Escribe tu password',
        name: 'passwd',
        id: 'passwd-01',
        type: 'password',
        role: 'textbox',
    },
];

// console.log(keyof LoginFormData)

export function Login() {
    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        const form = ev.target as HTMLFormElement;
        const formData = new FormData(form);
        const loginFormData: LoginFormData = {
            user: '',
            passwd: '',
        };
        let key: keyof LoginFormData;
        for (key in loginFormData) {
            loginFormData[key] = formData.get(key) as string;
        }
        consoleDebug(loginFormData);
    };
    return (
        <>
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                {loginFormFields.map((field) => (
                    // extraído a un componente independiente
                    // <div key={field.name}>
                    //     <label htmlFor={field.name}>{field.label}</label>
                    //     <input
                    //         type={field.type}
                    //         name={field.name}
                    //         id={field.name}
                    //         placeholder={field.placeholder}
                    //     />
                    // </div>
                    <Input key={field.name} field={field}></Input>
                ))}
                <Button type="submit">Login</Button>
            </form>
        </>
    );
}

function Input({ field }: { field: FormField }) {
    const Input = styled.input`
        border: none;
        border-block-end: 2px solid var(--light-gray);
        width: 100%;
        margin-block-end: 1rem;
    `;

    const Label = styled.label`
        display: block;
        padding-block-end: 0.5rem;
    `;

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
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input {...attributes} required />
        </div>
    );
}
