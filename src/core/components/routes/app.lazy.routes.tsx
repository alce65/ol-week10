import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MenuItems } from '../../types/menu.item';

const Home = lazy(() => import('../../../features/home/pages/home.page'));
const Todo = lazy(() => import('../../../features/todo/pages/todo.page'));
const Notes = lazy(() => import('../../../features/notes/pages/notes.page'));
const Users = lazy(() => import('../../../features/user/pages/user.page'));
const About = lazy(() => import('../../../features/about/pages/about.page'));

export function AppLazyRoutes({ items }: { items: MenuItems }) {
    return (
        <Suspense>
            <Routes>
                <Route path={''} element={<Home></Home>}></Route>
                <Route path={items[0].path} element={<Home></Home>}></Route>
                <Route path={items[1].path} element={<Todo></Todo>}></Route>
                <Route path={items[2].path} element={<Notes></Notes>}></Route>
                <Route path={items[3].path} element={<Users></Users>}></Route>
                <Route path={items[4].path} element={<About></About>}></Route>
                <Route
                    path={'*'}
                    element={<Navigate to="" replace></Navigate>}
                ></Route>
            </Routes>
        </Suspense>
    );
}
