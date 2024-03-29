import { Routes, Route, Navigate } from 'react-router-dom';
import AboutPage from '../../../features/about/pages/about.page';
import HomePage from '../../../features/home/pages/home.page';
import NotesPage from '../../../features/notes/pages/notes.page';
import TodoPage from '../../../features/todo/pages/todo.page';
import UserPage from '../../../features/user/pages/user.page';
import PlacesPage from '../../../features/places/pages/places.page';
import { MenuItems } from '../../types/menu.item';

export function AppRoutes({ items }: { items: MenuItems }) {
    return (
        <Routes>
            <Route path={''} element={<HomePage></HomePage>}></Route>
            <Route path={items[0].path} element={<HomePage></HomePage>}></Route>
            <Route path={items[1].path} element={<TodoPage></TodoPage>}></Route>
            <Route
                path={items[2].path}
                element={<NotesPage></NotesPage>}
            ></Route>
            <Route
                path={items[3].path}
                element={<PlacesPage></PlacesPage>}
            ></Route>
            <Route path={items[4].path} element={<UserPage></UserPage>}></Route>
            <Route
                path={items[5].path}
                element={<AboutPage></AboutPage>}
            ></Route>
            <Route
                path={'*'}
                element={<Navigate to="" replace></Navigate>}
            ></Route>
        </Routes>
    );
}
