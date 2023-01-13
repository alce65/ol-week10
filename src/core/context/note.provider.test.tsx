import { render } from '@testing-library/react';
import { NoteContextProvider } from './note.provider';
import * as useNotes from '../../features/notes/hooks/use.notes';

describe('Given NoteContextProvider', () => {
    describe('When we use it', () => {
        test('Then it should call the custom hook useNotes', () => {
            const spyUseNotes = jest.spyOn(useNotes, 'useNotes');
            render(
                <NoteContextProvider>
                    <></>
                </NoteContextProvider>
            );
            expect(spyUseNotes).toHaveBeenCalled();
        });
    });
});
