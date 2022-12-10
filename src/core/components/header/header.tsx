import { Menu, MenuItem } from '../menu/menu';
import './header.css';

export function Header() {
    const title = 'Learning Components';

    const items: Array<MenuItem> = [
        { path: '/home', label: 'Inicio' },
        { path: '/products', label: 'Productos' },
        { path: '/about', label: 'Nosotros' },
    ];

    return (
        <header>
            <h1>{title}</h1>
            <Menu items={items}></Menu>
        </header>
    );
}
