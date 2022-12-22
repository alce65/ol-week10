import './App.css';
import { Layout } from '../layout/layout';
import { MenuItems } from '../../types/menu.item';
import { AppRoutes } from '../routes/app.routes';
export function App() {
    const items: MenuItems = [
        { path: '/home', label: 'Inicio' },
        { path: '/todo', label: 'Tareas' },
        { path: '/notes', label: 'Notas' },
        { path: '/about', label: 'Nosotros' },
    ];
    return (
        <>
            <Layout items={items}>
                <AppRoutes items={items}></AppRoutes>
            </Layout>
        </>
    );
}
