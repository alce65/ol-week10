import { useNotes } from '../../features/notes/hooks/use.notes';
import { NoteContext } from './note.context';

export function NoteContextProvider({ children }: { children: JSX.Element }) {
    console.log('Provider del contexto');

    const { getNotes, handleLoad, handleAdd, handleDelete, handleUpdate } =
        useNotes();

    const context = {
        notes: getNotes(),
        handleLoad,
        handleAdd,
        handleDelete,
        handleUpdate,
    };

    return (
        <NoteContext.Provider value={context}>{children}</NoteContext.Provider>
    );
}
