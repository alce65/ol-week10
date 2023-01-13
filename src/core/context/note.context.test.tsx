import { render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { NoteStructure } from '../../features/notes/models/note';

// Se importa directamente el initialContext
// para que el test utilice las funciones definidas en él
import { initialContext, NoteContext } from './note.context';

const mockNote: NoteStructure = {
    id: '1',
    title: 'Test task',
    author: 'Pepe',
    isImportant: true,
};

initialContext.notes = [mockNote];

describe('Given the context AppContext', () => {
    let TestComponent: () => JSX.Element;
    describe('When a Test Component is wrapper with this context', () => {
        beforeEach(() => {
            TestComponent = () => {
                const {
                    notes,
                    handleLoad,
                    handleDelete,
                    handleAdd,
                    handleUpdate,
                } = useContext(NoteContext);
                handleLoad();
                handleAdd(mockNote);
                handleDelete(mockNote.id);
                handleUpdate(mockNote);
                return <>{notes[0].title}</>;
            };
        });
        test('Context values should be used in the component', () => {
            render(
                <NoteContext.Provider value={initialContext}>
                    <TestComponent></TestComponent>
                </NoteContext.Provider>
            );
            const element = screen.getByText(initialContext.notes[0].title);
            expect(element).toBeInTheDocument();
        });
    });
});
