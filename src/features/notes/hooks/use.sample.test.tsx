import { renderHook, RenderHookResult } from '@testing-library/react';
import { Note } from '../models/note';
import { UseNotes, useSample } from './use.sample';

describe('Given useSample (custom hook)', () => {
    const mockNote = new Note('Test note', 'Test user');
    describe('When it is render with a virtual component', () => {
        let view: RenderHookResult<UseNotes, undefined>;
        let current: UseNotes;
        beforeEach(() => {
            view = renderHook(() => {
                return useSample();
            });
            current = view.result.current;
        });
        test('Then its data should be get', () => {
            expect(current.getNotes()).toEqual([]);
        });
        test('Then its function setNotes should be used for set the data', () => {
            current.setNotes([mockNote]);
            expect(current.getNotes()).toEqual([mockNote]);
        });
    });
});
