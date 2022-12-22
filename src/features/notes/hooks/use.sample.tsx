import { NoteStructure } from '../models/note';

export function useSample(initialState: Array<NoteStructure> = []) {
    const notes: Array<NoteStructure> = initialState;
    return {
        notes,
    };
}
