import './menu.css';

export type MenuItem = { path: string; label: string };
export function Menu({ items }: { items: Array<MenuItem> }) {
    return (
        <nav className="menu">
            <ul>
                {items.map((item) => (
                    <li key={item.label}>
                        <a href={item.path}>{item.label}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

function showName(name: string) {
    console.log(name);
}

showName('Pepe');
