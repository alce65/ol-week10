import { useCallback, useMemo, useState } from 'react';
import { consoleDebug } from '../../../tools/debug';
import { NoteNoId, NoteStructure } from '../models/note';
import { NotesRepo } from '../services/repository/notes.repo';

export type UseNotes = {
    getStatus: () => Status;
    getNotes: () => Array<NoteStructure>;
    handleLoad: () => Promise<void>;
    handleAdd: (note: NoteNoId) => Promise<void>;
    handleUpdate: (notePayload: Partial<NoteStructure>) => Promise<void>;
    handleDelete: (id: NoteStructure['id']) => Promise<void>;
};

type Status = 'Starting' | 'Loading' | 'Loaded';

export function useNotes(): UseNotes {
    const repo = useMemo(() => new NotesRepo(), []);
    consoleDebug('useNotes Instance');

    const initialState: Array<NoteStructure> = [];
    const initialStatus = 'Starting' as Status;
    const [notes, setNotes] = useState(initialState);
    const [status, setStatus] = useState(initialStatus);

    const getNotes = () => notes;
    const getStatus = () => status;

    const handleLoad = useCallback(async () => {
        try {
            setStatus('Loading');
            const data = await repo.load();
            setNotes(data);
            setStatus('Loaded');
            consoleDebug('LOAD Notes');
        } catch (error) {
            handleError(error as Error);
        }
    }, [repo]);

    // Se podrían escribir versiones asíncronas de todos los handlers
    // const handleLoad = useCallback(() => {
    //     repo.load()
    //         .then((data) => {
    //             setNotes(data);
    //             consoleDebug('LOAD Notes');
    //         })
    //         .catch((error) => handleError(error as Error));
    // }, [repo]);

    const handleAdd = async function (note: NoteNoId) {
        try {
            const fullNote = await repo.create(note);
            setNotes((prev) => [...prev, fullNote]);
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleUpdate = async function (notePayload: Partial<NoteStructure>) {
        try {
            const fullNote = await repo.update(notePayload);
            setNotes((prev) =>
                prev.map((item) => (item.id === fullNote.id ? fullNote : item))
            );
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleDelete = async function (id: NoteStructure['id']) {
        try {
            const finalId = await repo.delete(id);
            setNotes((prev) => prev.filter((item) => item.id !== finalId));
        } catch (error) {
            handleError(error as Error);
        }
    };

    const handleError = (error: Error) => {
        consoleDebug(error.message);
    };

    return {
        getStatus,
        getNotes,
        handleLoad,
        handleAdd,
        handleUpdate,
        handleDelete,
    };
}
