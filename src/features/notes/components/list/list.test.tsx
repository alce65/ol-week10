/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { List } from './list';
import { Add } from '../add/add';
import { Item } from '../item/item';
import { getNotes, saveNotes } from '../../data/mock.notes.service';
import { Note } from '../../models/note';

jest.mock('../add/add');
jest.mock('../item/item');
jest.mock('../../data/mock.notes.service');

const mockNote = new Note('Test note', 'user');
mockNote.id = '000001';
const mockNotes = [mockNote];
const mockAddNote = new Note('Added note', 'user');
mockAddNote.id = '000002';

describe('Given "List" component', () => {
    beforeEach(() => {
        (Add as jest.Mock).mockImplementation(() => {
            return <p>Mock Add</p>;
        });
        (Item as jest.Mock).mockImplementation(({ item }) => {
            return <p>Note: {item.title}</p>;
        });
    });
    describe('When it is initially instantiated without data', () => {
        beforeEach(() => {
            (getNotes as jest.Mock).mockResolvedValue([]);
        });
        beforeEach(async () => {
            await act(async () => {
                render(<List></List>);
                // Render process:
                // Define state -> notes: []
                // Renderiza el componente -> Loading
                // useEffect -> savedNoteMock -> clg []
                // useEffect inicio -> handleLoad()
                //  |-> getNotesMock([])
                //  |-> setNotes -> no efecto
                //  |-> clg LOAD
            });
        });
        test(`Then it should be render the loading`, () => {
            const elementTitle = screen.getByRole('heading', {
                name: 'Lista de notas',
            }); // <h3>
            const elementAdd = screen.getByText(/Mock Add/i);
            const elementLoading = screen.getByText(/Loading/i);
            expect(elementTitle).toBeInTheDocument();
            expect(elementAdd).toBeInTheDocument();
            expect(elementLoading).toBeInTheDocument();
            expect(getNotes).toHaveBeenCalled();
        });
    });

    describe('When it load the data from getNote', () => {
        beforeEach(() => {
            (getNotes as jest.Mock).mockResolvedValue(mockNotes);
        });
        beforeEach(async () => {
            await act(async () => {
                render(<List></List>);
                // Render process:
                // Define state -> notes: []
                // Renderiza el componente -> Loading
                // useEffect -> savedNoteMock -> clg []
                // useEffect inicio -> handleLoad()
                //  |-> getNotesMock([])
                //  |-> setNotes -> [mockNote]
                //  |-> clg LOAD
                // useEffect -> savedNoteMock -> clg [mockNote]
            });
        });
        test(`Then it should be render the data`, async () => {
            const elementList = await screen.findByRole('list'); // <ul />
            expect(elementList).toBeInTheDocument();
            await waitFor(() => {
                expect(saveNotes).toHaveBeenCalled();
            });
            const elementItem = await screen.findByText(/Test note/i);
            expect(elementItem).toBeInTheDocument();
        });
    });

    describe('When its method handleAdd() are called', () => {
        beforeEach(() => {
            (getNotes as jest.Mock).mockResolvedValue(mockNotes);
            (Add as jest.Mock).mockImplementation(({ handleAdd }) => {
                return (
                    <button
                        onClick={() => {
                            handleAdd(mockAddNote);
                        }}
                    >
                        Mock Add
                    </button>
                );
            });
        });
        beforeEach(async () => {
            await act(async () => {
                render(<List></List>);
            });
        });
        test('Then the notes array should render with a new item', async () => {
            const button = screen.getByRole('button');
            userEvent.click(button);
            const addItem = await screen.findByText(/Added note/i);
            expect(addItem).toBeInTheDocument();
            expect(saveNotes).toHaveBeenCalled();
        });
    });

    describe('When its method updateNote() are called', () => {
        beforeEach(() => {
            const mockUpdatedNote = new Note('Updated note', 'user');
            mockUpdatedNote.id = '000001';
            (getNotes as jest.Mock).mockResolvedValue([mockNote, mockAddNote]);
            (Item as jest.Mock).mockImplementation(({ item, handleUpdate }) => {
                return (
                    <>
                        <p>
                            Note: {item.id} {item.title}
                        </p>
                        <button
                            onClick={() => {
                                handleUpdate(mockUpdatedNote);
                            }}
                        >
                            Update
                        </button>
                    </>
                );
            });
        });
        beforeEach(async () => {
            await act(async () => {
                render(<List></List>);
            });
        });
        test(`Then the notes array should be rendered 
                with the updated item`, async () => {
            const title = /Updated note/i;
            const buttons = await screen.findAllByRole('button', {
                name: 'Update',
            });
            userEvent.click(buttons[0]);
            expect(saveNotes).toHaveBeenCalled();
            const updateItem = await screen.findByText(title);
            expect(updateItem).toBeInTheDocument();
        });
    });

    describe('When its method deleteNote()  are called', () => {
        beforeEach(async () => {
            (getNotes as jest.Mock).mockResolvedValue(mockNotes);
            (Item as jest.Mock).mockImplementation(
                ({ item, handleUpdate, handleDelete }) => {
                    return (
                        <>
                            <p>
                                Note: {item.id} {item.title};
                            </p>
                            <button
                                onClick={() => {
                                    handleDelete(mockNote.id);
                                }}
                            >
                                Delete
                            </button>
                        </>
                    );
                }
            );
        });
        beforeEach(async () => {
            await act(async () => {
                render(<List></List>);
            });
        });

        test(`Then as the notes array should be empty, 
            the loading should be render again`, async () => {
            const button = await screen.findByRole('button', {
                name: 'Delete',
            });
            userEvent.click(button);
            expect(saveNotes).toHaveBeenCalled();
            const elementLoading = screen.getByText(/Loading/i);
            expect(elementLoading).toBeInTheDocument();
        });
    });
});
