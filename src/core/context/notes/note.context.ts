/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';
import { UseNotes } from '../../features/notes/hooks/use.notes';
import { NoteNoId, NoteStructure } from '../../features/notes/models/note';

export type NoteContextStructure = Omit<UseNotes, 'getStatus' | 'getNotes'> & {
    notes: Array<NoteStructure>;
};

export const initialContext: NoteContextStructure = {
    notes: [],
    handleLoad: async () => {},
    handleAdd: async (note: NoteNoId) => {},
    handleDelete: async (id: string) => {},
    handleUpdate: async (notePayload: Partial<NoteStructure>) => {},
};

export const NoteContext = createContext(initialContext);

// NoteContext.Consumer -> la utiliza useContext
// NoteContext.Provider
