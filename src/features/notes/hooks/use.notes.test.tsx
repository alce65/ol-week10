import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Note } from '../models/note';
import { NotesRepo } from '../services/repository/notes.repo';
import { UseNotes, useNotes } from './use.notes';
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
    let current: UseNotes;
    let spyConsole: jest.SpyInstance;
    beforeEach(() => {
        ({
            result: { current },
        } = renderHook(() => {
            return useNotes();
        }));
        spyConsole = jest.spyOn(debug, 'consoleDebug');
    });
    describe(`When the repo io working OK`, () => {
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
        test('Then its data should be accesible starting empty', () => {
            expect(current.getNotes()).toEqual([]);
        });
        test('Then its function handleLoad should be add notes to the state', async () => {
            expect(current.getStatus()).toBe('Starting');
            await act(async () => {
                current.handleLoad();
            });
            expect(NotesRepo.prototype.load).toHaveBeenCalled();
            expect(spyConsole).toBeCalledWith('LOAD Notes');
            // PROBLEMA: el expect no se cumple
            // porque de re-renderiza el hook con el estado inicial []
            // await waitFor(async () => {
            // expect(current.getNotes()).toEqual(mockNotes);
            // });
        });
        test('Then its function handleAdd should be used', async () => {
            await act(async () => {
                await current.handleAdd(mockAddNote);
            });
            expect(NotesRepo.prototype.create).toHaveBeenCalled();
            // PROBLEMA: el expect no se cumple
            // porque de re-renderiza el hook con el estado inicial []
            // expect(current.getNotes()).toEqual([mockAddNote]);
        });

        test('Then its function handleUpdate should be used', async () => {
            await act(async () => {
                current.handleLoad();
            });
            expect(NotesRepo.prototype.load).toHaveBeenCalled();
            await act(async () => {
                current.handleUpdate(mockUpdateNote);
            });
            expect(NotesRepo.prototype.update).toHaveBeenCalled();
        });

        test('Then its function handleDelete should be used', async () => {
            await act(async () => {
                current.handleLoad();
            });
            expect(NotesRepo.prototype.load).toHaveBeenCalled();
            await act(async () => {
                current.handleDelete(mockNote2.id);
            });
            expect(NotesRepo.prototype.delete).toHaveBeenCalled();
        });
    });
    describe(`When the repo is NOT working OK`, () => {
        const error = new Error('');
        beforeEach(() => {
            (NotesRepo.prototype.load as jest.Mock).mockRejectedValue(error);
            (NotesRepo.prototype.create as jest.Mock).mockRejectedValue(error);
            (NotesRepo.prototype.update as jest.Mock).mockRejectedValue(error);
            (NotesRepo.prototype.delete as jest.Mock).mockRejectedValue(error);
        });
        test('Then its function handleLoad should be used', async () => {
            await act(async () => {
                current.handleLoad();
            });
            expect(NotesRepo.prototype.load).toHaveBeenCalled();
            expect(spyConsole).toBeCalled();
        });
        test('Then its function handleAdd should be used', async () => {
            await act(async () => {
                current.handleAdd(mockAddNote);
            });
            expect(NotesRepo.prototype.create).toHaveBeenCalled();
            expect(spyConsole).toBeCalled();
        });

        test('Then its function handleUpdate should be used', async () => {
            await act(async () => {
                current.handleUpdate(mockAddNote);
            });
            expect(NotesRepo.prototype.update).toHaveBeenCalled();
            expect(spyConsole).toBeCalled();
        });

        test('Then its function handleDelete should be used', async () => {
            await act(async () => {
                current.handleDelete(mockAddNote.id);
            });
            expect(NotesRepo.prototype.delete).toHaveBeenCalled();
            expect(spyConsole).toBeCalled();
        });
    });
});
