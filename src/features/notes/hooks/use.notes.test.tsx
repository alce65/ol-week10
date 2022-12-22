import {
    render,
    screen,
    waitFor,
    act,
    renderHook,
    RenderHookResult,
} from '@testing-library/react';
import { UseNotes, useNotes } from './use.notes';

describe('Given useNotes (custom hook)', () => {
    describe('When it is render with a virtual component', () => {
        let view: RenderHookResult<UseNotes, unknown>;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let current: UseNotes;
        beforeEach(() => {
            view = renderHook(() => {
                return useNotes();
            });
            current = view.result.current;
        });
        test('Then its data should be used', () => {
            expect(current.getNotes()).toEqual([]);
        });
        test('Then its functions should be used', () => {
            //
        });
    });
});
