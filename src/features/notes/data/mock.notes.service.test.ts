import { Note } from '../models/note';
import { getNotes, getNotesDelay, saveNotes } from './mock.notes.service';
import {
    getStorageList,
    setStorageList,
} from '../../../core/services/storage/storage';
import { NOTES } from './mock.notes';

jest.mock('../../../core/services/storage/storage');

const mockData = ['test'];
const testGetData = async () => {
    const result = await getNotes();
    expect(getStorageList).toHaveBeenCalled();
    expect(result).toEqual(mockData);
};

const testGetDefaultData = async () => {
    const result = await getNotes();
    expect(getStorageList).toHaveBeenCalled();
    expect(setStorageList).toHaveBeenCalled();
    expect(result).toEqual(NOTES);
};

const testGetDataDelay = async () => {
    const result = await getNotesDelay();
    expect(getStorageList).toHaveBeenCalled();
    expect(result).toEqual(mockData);
};

const testGetDefaultDataDelay = async () => {
    const result = await getNotesDelay();
    expect(getStorageList).toHaveBeenCalled();
    expect(setStorageList).toHaveBeenCalled();
    expect(result).toEqual(NOTES);
};

describe('Given getNotes or getNotesDelay', () => {
    describe('When I call it with data in local storage', () => {
        beforeEach(() => {
            (getStorageList as jest.Mock).mockReturnValue(mockData);
        });
        test('Then the data should be obtained', testGetData);
        test(
            'Then the data should be obtained with delay also',
            testGetDataDelay
        );
    });
    describe('When I call it without data in local storage', () => {
        beforeEach(() => {
            (getStorageList as jest.Mock).mockReturnValue([]);
        });
        test('Then the data from NOTE should be obtained', testGetDefaultData);
        test(
            'Then the data from NOTE should be obtained  with delay also',
            testGetDefaultDataDelay
        );
    });
});

describe('Given saveNotes', () => {
    describe('When I call it', () => {
        test('Then localStorage should be use with the data', () => {
            const mockNotes: Array<Note> = [];
            saveNotes(mockNotes);
            expect(setStorageList).toHaveBeenCalledWith('Notes', mockNotes);
        });
    });
});
