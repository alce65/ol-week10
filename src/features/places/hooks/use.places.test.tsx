/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    mockPlace1,
    mockPlace2,
    mockAddPlace,
    mockUpdatePlace,
    mockValidRepoResponse,
    mockNoValidRepoResponse,
} from './testing.mock';

import { PlacesRepo } from '../services/repository/places.repo';
import { usePlaces } from './use.places';
import * as debug from '../../../tools/debug';

jest.mock('../services/repository/places.repo');

PlacesRepo.prototype.load = jest.fn();
PlacesRepo.prototype.create = jest.fn();
PlacesRepo.prototype.update = jest.fn();
PlacesRepo.prototype.delete = jest.fn();

describe(`Given usePlaces (custom hook)
            render with a virtual component`, () => {
    let TestComponent: () => JSX.Element;
    let spyConsole: jest.SpyInstance;
    let buttons: Array<HTMLElement>;
    beforeEach(() => {
        TestComponent = () => {
            const {
                handleLoad,
                getPlaces,
                getStatus,
                handleAdd,
                handleUpdate,
                handleDelete,
            } = usePlaces();
            return (
                <>
                    <button onClick={handleLoad}>Load</button>
                    <button onClick={() => handleAdd(mockAddPlace)}>Add</button>
                    <button onClick={() => handleUpdate(mockUpdatePlace)}>
                        Update
                    </button>
                    <button onClick={() => handleDelete(mockPlace2.id)}>
                        Delete
                    </button>
                    {getStatus() !== 'Loaded' ? (
                        <p>Loading</p>
                    ) : (
                        <div>
                            <p>Loaded</p>
                            <ul>
                                {getPlaces().map((place) => (
                                    <li key={place.id}>{place.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            );
        };
        render(<TestComponent />);
        buttons = screen.getAllByRole('button');
        spyConsole = jest.spyOn(debug, 'consoleDebug');
    });
    describe(`When the repo is working OK`, () => {
        beforeEach(mockValidRepoResponse);

        test('Then its function handleLoad should be add places to the state', async () => {
            expect(await screen.findByText(/loading/i)).toBeInTheDocument();
            userEvent.click(buttons[0]);
            expect(PlacesRepo.prototype.load).toHaveBeenCalled();
            expect(
                await screen.findByText(mockPlace1.name)
            ).toBeInTheDocument();
            expect(
                await screen.findByText(mockPlace2.name)
            ).toBeInTheDocument();
            expect(spyConsole).toBeCalledWith('LOAD Places');
        });

        test('Then its function handleAdd should be used', async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[1]);
            expect(PlacesRepo.prototype.create).toHaveBeenCalled();
            expect(
                await screen.findByText(mockAddPlace.name)
            ).toBeInTheDocument();
        });

        test('Then its function handleUpdate should be used', async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[2]);
            expect(PlacesRepo.prototype.update).toHaveBeenCalled();
            expect(
                await screen.findByText(mockUpdatePlace.name)
            ).toBeInTheDocument();
        });

        test('Then its function handleDelete should be used', async () => {
            userEvent.click(buttons[0]);
            expect(PlacesRepo.prototype.load).toHaveBeenCalled();
            userEvent.click(buttons[3]);
            expect(PlacesRepo.prototype.delete).toHaveBeenCalled();
            expect(
                await screen.findByText(mockPlace2.name)
            ).toBeInTheDocument();

            await expect(
                async () => await screen.findByText(mockPlace1.name)
            ).rejects.toThrowError();
        });
    });
    describe(`When the repo is NOT working OK`, () => {
        beforeEach(mockNoValidRepoResponse);
        test('Then its function handleLoad should be used', async () => {
            userEvent.click(buttons[0]);
            expect(PlacesRepo.prototype.load).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
        test('Then its function handleAdd should be used', async () => {
            userEvent.click(buttons[1]);
            expect(PlacesRepo.prototype.create).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
        test('Then its function handleUpdate should be used', async () => {
            userEvent.click(buttons[2]);
            expect(PlacesRepo.prototype.update).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
        test('Then its function handleDelete should be used', async () => {
            userEvent.click(buttons[3]);
            expect(PlacesRepo.prototype.delete).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
    });
});
