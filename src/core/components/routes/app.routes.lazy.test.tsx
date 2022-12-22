/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import HomePage from '../../../features/home/pages/home.page';
import TodoPage from '../../../features/todo/pages/todo.page';
import AboutPage from '../../../features/about/pages/about.page';
import { MenuItems } from '../../types/menu.item';
import { AppRoutes } from './app.routes';

const pageTitles = ['Test Home', 'Test Todo', 'Test About'];

jest.mock('../../../features/home/pages/home.page');
jest.mock('../../../features/todo/pages/todo.page');
jest.mock('../../../features/about/pages/about.page');

const testRoute = (index: number) => {
    const title = new RegExp(pageTitles[index], 'i'); // Antes /Test Home/i;
    const element = screen.getByText(title);
    expect(element).toBeInTheDocument();
};

describe('Given AppRoutes component, if the user is NOT logged', () => {
    let paths: Array<string>;
    let items: MenuItems;
    beforeEach(() => {
        items = [
            { path: '/home', label: 'Inicio' },
            { path: '/todo', label: 'Tareas' },
            { path: '/about', label: 'Nosotros' },
        ];
        paths = items.map((item) => item.path);
    });
    describe(`When we render the component 
                And the route is home`, () => {
        beforeEach(async () => {
            (HomePage as jest.Mock).mockReturnValue(<p>{pageTitles[0]}</p>);
            await act(async () => {
                render(
                    <Router initialEntries={paths} initialIndex={0}>
                        <AppRoutes items={items} />
                    </Router>
                );
            });
        });
        test('Then it should display the HomePage', () => {
            testRoute(0);
        });
    });
    describe(`When we render the component 
                And the route is todo`, () => {
        beforeEach(async () => {
            (TodoPage as jest.Mock).mockReturnValue(<p>{pageTitles[1]}</p>);
            await act(async () => {
                render(
                    <Router initialEntries={paths} initialIndex={1}>
                        <AppRoutes items={items} />
                    </Router>
                );
            });
        });
        test('Then it should display the TodoPage', () => {
            testRoute(1);
        });
    });
    describe(`When we render the component 
                And the route is about`, () => {
        beforeEach(async () => {
            (AboutPage as jest.Mock).mockReturnValue(<p>{pageTitles[2]}</p>);
            await act(async () => {
                render(
                    <Router initialEntries={paths} initialIndex={2}>
                        <AppRoutes items={items} />
                    </Router>
                );
            });
        });
        test('Then it should display the AboutPage', () => {
            testRoute(2);
        });
    });
});
