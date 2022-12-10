import { MenuItems } from '../../types/menu.item';
import './menu.css';

export function Menu({ items }: { items: MenuItems }) {
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
