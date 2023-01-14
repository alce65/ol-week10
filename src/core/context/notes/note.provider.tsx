import { useMemo } from 'react';
import { useNotes } from '../../features/notes/hooks/use.notes';
import { NoteContext } from './note.context';

export function NoteContextProvider({ children }: { children: JSX.Element }) {
    const { getNotes, handleLoad, handleAdd, handleDelete, handleUpdate } =
        useNotes();

    const context = useMemo(
        () => ({
            notes: getNotes(),
            handleLoad,
            handleAdd,
            handleDelete,
            handleUpdate,
        }),
        [getNotes, handleAdd, handleDelete, handleLoad, handleUpdate]
    );

    return (
        <NoteContext.Provider value={context}>{children}</NoteContext.Provider>
    );
}
