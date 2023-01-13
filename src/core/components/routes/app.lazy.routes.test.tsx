/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { AppLazyRoutes } from './app.lazy.routes';
import { mockPageTitles, items } from './mocks';

const testLazyRoute = (index: number) => {
    const title = new RegExp(mockPageTitles[index], 'i'); // Antes /Test Home/i;
    const lazyElement = screen.getByText(title);
    expect(lazyElement).toBeInTheDocument();
};

jest.mock('../../../features/home/pages/home.page', () => {
    return () => <p>{mockPageTitles[0]}</p>;
});
jest.mock('../../../features/todo/pages/todo.page', () => {
    return () => <p>{mockPageTitles[1]}</p>;
});
jest.mock('../../../features/notes/pages/notes.page', () => {
    return () => <p>{mockPageTitles[2]}</p>;
});

jest.mock('../../../features/places/pages/places.page', () => {
    return () => <p>{mockPageTitles[3]}</p>;
});
jest.mock('../../../features/user/pages/user.page', () => {
    return () => <p>{mockPageTitles[4]}</p>;
});
jest.mock('../../../features/about/pages/about.page', () => {
    return () => <p>{mockPageTitles[5]}</p>;
});

describe('Given AppRoutes Lazy component, if the user is NOT logged', () => {
    let lazyPaths: Array<string>;

    beforeEach(() => {
        lazyPaths = items.map((item) => item.path);
    });
    describe(`When we render the component 
                And the lazy route is home`, () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router initialEntries={lazyPaths} initialIndex={0}>
                        <AppLazyRoutes items={items} />
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
                        <AppLazyRoutes items={items} />
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
                        <AppLazyRoutes items={items} />
                    </Router>
                );
            });
        });
        test('Then it should display the NotesPage', () => {
            testLazyRoute(2);
        });
    });
    describe(`When we render the component 
                And the lazy route is places`, () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router initialEntries={lazyPaths} initialIndex={3}>
                        <AppLazyRoutes items={items} />
                    </Router>
                );
            });
        });
        test('Then it should display the PlacesPage', () => {
            testLazyRoute(3);
        });
    });
    describe(`When we render the component 
                And the lazy route is user / login`, () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router initialEntries={lazyPaths} initialIndex={3}>
                        <AppLazyRoutes items={items} />
                    </Router>
                );
            });
        });
        test('Then it should display the UserPage', () => {
            testLazyRoute(4);
        });
    });
    describe(`When we render the component 
                And the lazy route is about`, () => {
        beforeEach(async () => {
            await act(async () => {
                render(
                    <Router initialEntries={lazyPaths} initialIndex={4}>
                        <AppLazyRoutes items={items} />
                    </Router>
                );
            });
        });
        test('Then it should display the AboutPage', () => {
            testLazyRoute(5);
        });
    });
});
