import { useCallback, useMemo, useState } from 'react';
import { consoleDebug } from '../../../tools/debug';
import { NoteNoId, NoteStructure } from '../models/note';
import { NotesRepo } from '../services/repository/notes.repo';

export type UseNotes = {
    getNotes: () => Array<NoteStructure>;
    handleLoad: () => void;
    handleAdd: (note: NoteNoId) => void;
    handleUpdate: (notePayload: Partial<NoteStructure>) => void;
    handleDelete: (id: NoteStructure['id']) => void;
};

export function useNotes(): UseNotes {
    const repo = useMemo(() => new NotesRepo(), []);
    consoleDebug('useNotes Instance');
    const initialState: Array<NoteStructure> = [];

    const [notes, setNotes] = useState(initialState);

    const handleLoad = useCallback(async () => {
        try {
            const data = await repo.load();
            setNotes(data);
            consoleDebug('LOAD');
        } catch (error) {
            handleError(error as Error);
        }
    }, [repo]);

    const handleAdd = async function (note: NoteNoId) {
        try {
            const fullNote = await repo.create(note);
            setNotes([...notes, fullNote]);
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleUpdate = async function (notePayload: Partial<NoteStructure>) {
        try {
            const fullNote = await repo.update(notePayload);
            setNotes(
                notes.map((item) => (item.id === fullNote.id ? fullNote : item))
            );
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleDelete = async function (id: NoteStructure['id']) {
        try {
            const finalId = await repo.delete(id);
            setNotes(notes.filter((item) => item.id !== finalId));
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleError = (error: Error) => {
        consoleDebug(error.message);
    };

    const getNotes = () => notes;

    return {
        getNotes,
        handleLoad,
        handleAdd,
        handleUpdate,
        handleDelete,
    };
}
