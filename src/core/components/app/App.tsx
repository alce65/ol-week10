import './App.css';
import { Layout } from '../layout/layout';
import { MenuItems } from '../../types/menu.item';
import { AppRoutes } from '../routes/app.routes';
export function App() {
    const items: MenuItems = [
        { path: '/home', label: 'Inicio' },
        { path: '/todo', label: 'Tareas' },
        { path: '/about', label: 'Nosotros' },
    ];
    return (
        <>
            {/* <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>React</h1>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header> */}
            <Layout items={items}>
                <AppRoutes items={items}></AppRoutes>
            </Layout>
        </>
    );
}
