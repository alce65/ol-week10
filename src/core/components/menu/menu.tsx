import { Link } from 'react-router-dom';
import { MenuItems } from '../../types/menu.item';
import './menu.css';

export function Menu({ items }: { items: MenuItems }) {
    return (
        <nav className="menu">
            <ul>
                {items.map((item) => (
                    <li key={item.label}>
                        <Link to={item.path}>{item.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
