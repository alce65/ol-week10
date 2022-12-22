/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { MenuItems } from '../../types/menu.item';
import { AppLazyRoutes } from './app.lazy.routes';

const pageTitles = ['Test Home', 'Test Todo', 'Test Notes', 'Test About'];

const testLazyRoute = (index: number) => {
    const title = new RegExp(pageTitles[index], 'i'); // Antes /Test Home/i;
    const lazyElement = screen.getByText(title);
    expect(lazyElement).toBeInTheDocument();
};

jest.mock('../../../features/home/pages/home.page', () => {
    return () => <p>{pageTitles[0]}</p>;
});
jest.mock('../../../features/todo/pages/todo.page', () => {
    return () => <p>{pageTitles[1]}</p>;
});
jest.mock('../../../features/notes/pages/notes.page', () => {
    return () => <p>{pageTitles[2]}</p>;
});
jest.mock('../../../features/about/pages/about.page', () => {
    return () => <p>{pageTitles[3]}</p>;
});

describe('Given AppRoutes Lazy component, if the user is NOT logged', () => {
    let lazyPaths: Array<string>;
    let lazyItems: MenuItems;
    beforeEach(() => {
        lazyItems = [
            { path: '/home', label: 'Inicio' },
            { path: '/todo', label: 'Tareas' },
            { path: '/notes', label: 'Notas' },
            { path: '/about', label: 'Nosotros' },
        ];
        lazyPaths = lazyItems.map((item) => item.path);
    });
    describe(`When we render the component 
                And the lazy route is home`, () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router initialEntries={lazyPaths} initialIndex={0}>
                        <AppLazyRoutes items={lazyItems} />
                    </Router>
                );
            });
        });
        test('Then it should display the HomePage', () => {
            testLazyRoute(0);
        });
    });
    describe(`When we render the component 
                And the lazy route is todo`, () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router initialEntries={lazyPaths} initialIndex={1}>
                        <AppLazyRoutes items={lazyItems} />
                    </Router>
                );
            });
        });
        test('Then it should display the TodoPage', () => {
            testLazyRoute(1);
        });
    });
    describe(`When we render the component 
                And the lazy route is notes`, () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router initialEntries={lazyPaths} initialIndex={2}>
                        <AppLazyRoutes items={lazyItems} />
                    </Router>
                );
            });
        });
        test('Then it should display the NotesPage', () => {
            testLazyRoute(2);
        });
    });
    describe(`When we render the component 
                And the lazy route is about`, () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router initialEntries={lazyPaths} initialIndex={3}>
                        <AppLazyRoutes items={lazyItems} />
                    </Router>
                );
            });
        });
        test('Then it should display the AboutPage', () => {
            testLazyRoute(3);
        });
    });
});
