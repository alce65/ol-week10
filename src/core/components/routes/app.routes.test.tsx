/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import HomePage from '../../../features/home/pages/home.page';
import TodoPage from '../../../features/todo/pages/todo.page';
import NotesPage from '../../../features/notes/pages/notes.page';
import PlacesPage from '../../../features/places/pages/places.page';
import UserPage from '../../../features/user/pages/user.page';
import AboutPage from '../../../features/about/pages/about.page';
import { mockPageTitles, items } from './mocks';
import { AppRoutes } from './app.routes';

jest.mock('../../../features/home/pages/home.page');
jest.mock('../../../features/todo/pages/todo.page');
jest.mock('../../../features/notes/pages/notes.page');
jest.mock('../../../features/places/pages/places.page');
jest.mock('../../../features/user/pages/user.page');
jest.mock('../../../features/about/pages/about.page');

const testRoute = (index: number) => {
    const title = new RegExp(mockPageTitles[index], 'i'); // Antes /Test Home/i;
    const element = screen.getByText(title);
    expect(element).toBeInTheDocument();
};

describe('Given AppRoutes component, if the user is NOT logged', () => {
    let paths: Array<string>;
    beforeEach(() => {
        paths = items.map((item) => item.path);
    });
    describe(`When we render the component`, () => {
        test('Then, if the route is home, it should display the HomePage', () => {
            (HomePage as jest.Mock).mockReturnValue(<p>{mockPageTitles[0]}</p>);
            render(
                <Router initialEntries={paths} initialIndex={0}>
                    <AppRoutes items={items} />
                </Router>
            );
            testRoute(0);
        });

        test('Then, if the route is todo, it should display the TodoPage', () => {
            (TodoPage as jest.Mock).mockReturnValue(<p>{mockPageTitles[1]}</p>);
            render(
                <Router initialEntries={paths} initialIndex={1}>
                    <AppRoutes items={items} />
                </Router>
            );
            testRoute(1);
        });

        test('Then, if the route is notes, it should display the NotesPage', () => {
            (NotesPage as jest.Mock).mockReturnValue(
                <p>{mockPageTitles[2]}</p>
            );
            render(
                <Router initialEntries={paths} initialIndex={2}>
                    <AppRoutes items={items} />
                </Router>
            );
            testRoute(2);
        });

        test('Then, if the route is places, it should display the PlacesPage', () => {
            (PlacesPage as jest.Mock).mockReturnValue(
                <p>{mockPageTitles[3]}</p>
            );
            render(
                <Router initialEntries={paths} initialIndex={3}>
                    <AppRoutes items={items} />
                </Router>
            );
            testRoute(3);
        });

        test('Then, if the route is user/login, it should display the UserPage', () => {
            (UserPage as jest.Mock).mockReturnValue(<p>{mockPageTitles[4]}</p>);
            render(
                <Router initialEntries={paths} initialIndex={4}>
                    <AppRoutes items={items} />
                </Router>
            );
            testRoute(4);
        });

        test('Then, if the route is about, it should display the AboutPage', () => {
            (AboutPage as jest.Mock).mockReturnValue(
                <p>{mockPageTitles[5]}</p>
            );
            render(
                <Router initialEntries={paths} initialIndex={5}>
                    <AppRoutes items={items} />
                </Router>
            );
            testRoute(5);
        });
    });
});
