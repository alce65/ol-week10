/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    mockNote1,
    mockNote2,
    mockAddNote,
    mockUpdateNote,
    mockValidRepoResponse,
    mockNoValidRepoResponse,
} from './testing.mock';

import { NotesRepo } from '../services/repository/notes.repo';
import { useNotes } from './use.notes';
import * as debug from '../../../tools/debug';

jest.mock('../services/repository/notes.repo');

NotesRepo.prototype.load = jest.fn();
NotesRepo.prototype.create = jest.fn();
NotesRepo.prototype.update = jest.fn();
NotesRepo.prototype.delete = jest.fn();

describe(`Given useNotes (custom hook)
            render with a virtual component`, () => {
    let TestComponent: () => JSX.Element;
    let spyConsole: jest.SpyInstance;
    let buttons: Array<HTMLElement>;
    beforeEach(() => {
        TestComponent = () => {
            const {
                handleLoad,
                getNotes,
                getStatus,
                handleAdd,
                handleUpdate,
                handleDelete,
            } = useNotes();
            return (
                <>
                    <button onClick={handleLoad}>Load</button>
                    <button onClick={() => handleAdd(mockAddNote)}>Add</button>
                    <button onClick={() => handleUpdate(mockUpdateNote)}>
                        Update
                    </button>
                    <button onClick={() => handleDelete(mockNote2.id)}>
                        Delete
                    </button>
                    {getStatus() !== 'Loaded' ? (
                        <p>Loading</p>
                    ) : (
                        <div>
                            <p>Loaded</p>
                            <ul>
                                {getNotes().map((note) => (
                                    <li key={note.id}>{note.title}</li>
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

        test('Then its function handleLoad should be add notes to the state', async () => {
            expect(await screen.findByText(/loading/i)).toBeInTheDocument();
            userEvent.click(buttons[0]);
            expect(NotesRepo.prototype.load).toHaveBeenCalled();
            expect(
                await screen.findByText(mockNote1.title)
            ).toBeInTheDocument();
            expect(
                await screen.findByText(mockNote2.title)
            ).toBeInTheDocument();
            expect(spyConsole).toBeCalledWith('LOAD Notes');
        });

        test('Then its function handleAdd should be used', async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[1]);
            expect(NotesRepo.prototype.create).toHaveBeenCalled();
            expect(
                await screen.findByText(mockAddNote.title)
            ).toBeInTheDocument();
        });

        test('Then its function handleUpdate should be used', async () => {
            userEvent.click(buttons[0]);
            userEvent.click(buttons[2]);
            expect(NotesRepo.prototype.update).toHaveBeenCalled();
            expect(
                await screen.findByText(mockUpdateNote.title)
            ).toBeInTheDocument();
        });

        test('Then its function handleDelete should be used', async () => {
            userEvent.click(buttons[0]);
            expect(NotesRepo.prototype.load).toHaveBeenCalled();
            userEvent.click(buttons[3]);
            expect(NotesRepo.prototype.delete).toHaveBeenCalled();
            expect(
                await screen.findByText(mockNote2.title)
            ).toBeInTheDocument();

            await expect(
                async () => await screen.findByText(mockNote1.title)
            ).rejects.toThrowError();
        });
    });
    describe(`When the repo is NOT working OK`, () => {
        beforeEach(mockNoValidRepoResponse);
        test('Then its function handleLoad should be used', async () => {
            userEvent.click(buttons[0]);
            expect(NotesRepo.prototype.load).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
        test('Then its function handleAdd should be used', async () => {
            userEvent.click(buttons[1]);
            expect(NotesRepo.prototype.create).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
        test('Then its function handleUpdate should be used', async () => {
            userEvent.click(buttons[2]);
            expect(NotesRepo.prototype.update).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
        test('Then its function handleDelete should be used', async () => {
            userEvent.click(buttons[3]);
            expect(NotesRepo.prototype.delete).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
    });
});
