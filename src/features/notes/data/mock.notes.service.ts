import {
    getStorageList,
    setStorageList,
} from '../../../core/services/storage/storage';
import { consoleDebug } from '../../../tools/debug';
import { Note, NoteStructure } from '../models/note';
import { NOTES } from './mock.notes';

export const getNotes = async (): Promise<Array<NoteStructure>> => {
    const data = getStorageList<Note>('Notes');
    if (!data.length) {
        setStorageList('Notes', NOTES);
        return NOTES;
    }
    return data;
};

export const getNotesDelay = (): Promise<Array<NoteStructure>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = getStorageList<Note>('Notes');
            if (!data.length) {
                setStorageList('Notes', NOTES);
                resolve(NOTES);
            }
            resolve(data);
        }, 2000);
    });
};

export const saveNotes = async (notes: Array<Note>) => {
    consoleDebug('Saving');
    setStorageList('Notes', notes);
};
