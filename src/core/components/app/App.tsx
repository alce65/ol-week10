import './App.css';
import { Layout } from '../layout/layout';
import { MenuItems } from '../../types/menu.item';
import { AppLazyRoutes } from '../routes/app.lazy.routes';
export function App() {
    const items: MenuItems = [
        { path: '/home', label: 'Inicio' },
        { path: '/todo', label: 'Tareas' },
        { path: '/notes', label: 'Notas' },
        { path: '/places', label: 'Lugares' },
        { path: '/users', label: 'Login' },
        { path: '/about', label: 'Nosotros' },
    ];
    return (
        <>
            <Layout items={items}>
                {/* Alternativamente podemos usar rutas NO lazy
                <AppRoutes items={items}></AppRoutes> */}
                <AppLazyRoutes items={items}></AppLazyRoutes>
            </Layout>
        </>
    );
}
