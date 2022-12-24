import { NoteStructure } from '../models/note';

export type UseNotes = {
    getNotes: () => Array<NoteStructure>;
    setNotes: (newNotes: Array<NoteStructure>) => void;
};

export function useSample(initialState: Array<NoteStructure> = []) {
    let _notes: Array<NoteStructure> = initialState;

    const getNotes = (): Array<NoteStructure> => _notes;

    const setNotes = (newNotes: Array<NoteStructure>): void => {
        _notes = newNotes;
    };

    return {
        getNotes,
        setNotes,
    };
}
