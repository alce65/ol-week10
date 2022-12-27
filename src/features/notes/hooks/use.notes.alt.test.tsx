/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Note } from '../models/note';
import { NotesRepo } from '../services/repository/notes.repo';
import { useNotes } from './use.notes';
import * as debug from '../../../tools/debug';

jest.mock('../services/repository/notes.repo');

const mockNote1 = new Note('Test note 1', 'user');
mockNote1.id = '000001';
const mockNote2 = new Note('Test note 2', 'user');
mockNote2.id = '000002';
const mockNotes = [mockNote1, mockNote2];
const mockAddNote = new Note('Added note', 'user');
mockAddNote.id = '000003';
const mockUpdateNote = { ...mockNote2, title: 'Update note' };

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
        beforeEach(() => {
            (NotesRepo.prototype.load as jest.Mock).mockResolvedValue(
                mockNotes
            );
            (NotesRepo.prototype.create as jest.Mock).mockResolvedValue(
                mockAddNote
            );
            (NotesRepo.prototype.update as jest.Mock).mockResolvedValue(
                mockUpdateNote
            );
            (NotesRepo.prototype.delete as jest.Mock).mockResolvedValue(
                mockNote1.id
            );
        });

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
            //not.toBeInTheDocument();
        });
    });
    describe(`When the repo is NOT working OK`, () => {
        const error = new Error('Testing errors');
        beforeEach(() => {
            (NotesRepo.prototype.load as jest.Mock).mockRejectedValue(error);
            (NotesRepo.prototype.create as jest.Mock).mockRejectedValue(error);
            (NotesRepo.prototype.update as jest.Mock).mockRejectedValue(error);
            (NotesRepo.prototype.delete as jest.Mock).mockRejectedValue(error);
        });
        test('Then its function handleLoad should be used', async () => {
            userEvent.click(buttons[0]);
            expect(NotesRepo.prototype.load).toHaveBeenCalled();
            await waitFor(() => {
                expect(spyConsole).toHaveBeenLastCalledWith('Testing errors');
            });
        });
        test('Then its function handleAdd should be used', async () => {
            // userEvent.click(buttons[0]);
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
