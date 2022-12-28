import { SyntheticEvent } from 'react';

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
            if (formData.get(key) === null) continue;
            loginFormData[key] = formData.get(key) as string;
        }
        console.log(loginFormData);
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
                <button type="submit">Login</button>
            </form>
        </>
    );
}

function Input({ field }: { field: FormField }) {
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
