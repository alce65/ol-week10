  

  
    describe('When its method handleAdd() are called', () => {
        beforeEach(() => {
            (useNotes().getNotes as jest.Mock).mockResolvedValue(mockNotes);
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
        test.skip('Then the notes array should render with a new item', async () => {
            
            
        });
    });

    describe('When its method updateNote() are called', () => {
        beforeEach(() => {
            const mockUpdatedNote = new Note('Updated note', 'user');
            mockUpdatedNote.id = '000001';
            (useNotes().getNotes as jest.Mock).mockResolvedValue([
                mockNote,
                mockAddNote,
            ]);
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
        test.skip(`Then the notes array should be rendered 
                with the updated item`, async () => {
            const title = /Updated note/i;
            const buttons = await screen.findAllByRole('button', {
                name: 'Update',
            });
            userEvent.click(buttons[0]);
            // expect(saveNotes).toHaveBeenCalled();
            const updateItem = await screen.findByText(title);
            expect(updateItem).toBeInTheDocument();
        });
    });

    describe('When its method deleteNote()  are called', () => {
        beforeEach(async () => {
            (useNotes().getNotes as jest.Mock).mockResolvedValue(mockNotes);
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

        test.skip(`Then as the notes array should be empty, 
            the loading should be render again`, async () => {
            const button = await screen.findByRole('button', {
                name: 'Delete',
            });
            userEvent.click(button);
            //expect(saveNotes).toHaveBeenCalled();
            const elementLoading = screen.getByText(/Loading/i);
            expect(elementLoading).toBeInTheDocument();
        });
    });
