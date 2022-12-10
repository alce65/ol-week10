import './header.css';

export function Header({ children }: { children: JSX.Element }) {
    const title = 'Learning Components';

    return (
        <header>
            <h1>{title}</h1>
            {children}
        </header>
    );
}
