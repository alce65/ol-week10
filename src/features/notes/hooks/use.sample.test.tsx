import {
    render,
    screen,
    waitFor,
    act,
    renderHook,
    RenderHookResult,
} from '@testing-library/react';
import { NoteStructure } from '../models/note';
import { useSample } from './use.sample';

type UseNotes = {
    notes: Array<NoteStructure>;
};

describe('Given useSample (custom hook)', () => {
    describe('When it is render with a virtual component', () => {
        let view: RenderHookResult<UseNotes, unknown>;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let current: UseNotes;
        beforeEach(() => {
            view = renderHook(() => {
                return useSample([]);
            });
            current = view.result.current;
        });
        test('Then its data should be used', () => {
            expect(current.notes).toEqual([]);
        });
        test('Then its functions should be used', () => {
            //
        });
    });
});
