import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { List } from './list';
import { Add } from '../add/add';
import { Item } from '../item/item';
import { getTasks, saveTasks } from '../../data/mock.service';
import { Task } from '../../models/task';
import { act } from 'react-dom/test-utils';

jest.mock('../add/add');
jest.mock('../item/item');
jest.mock('../../data/mock.service');

const mockTask = new Task('Test task', 'user');
mockTask.id = '000001';
const mockTasks = [mockTask];
const mockAddTask = new Task('Added task', 'user');
mockAddTask.id = '000002';

describe('Given "List" component', () => {
    beforeEach(() => {
        (Add as jest.Mock).mockImplementation(() => {
            return <p>Mock Add</p>;
        });
        (Item as jest.Mock).mockImplementation(({ item }) => {
            return <p>Task: {item.title}</p>;
        });
    });
    describe('When it is initially instantiated without data',  () => {
        beforeEach(async () => {
            (getTasks as jest.Mock).mockResolvedValue([]);
            await act(async () => {
                render(<List></List>);

                // Render process:
                // Define state -> tasks: []
                // Renderiza el componente -> Loading
                // useEffect -> savedTaskMock -> clg []
                // useEffect inicio -> handleLoad()
                //  |-> getTasksMock([])
                //  |-> setTasks -> no efecto
                //  |-> clg LOAD
            });
        });
        test(`Then it should be render the loading`, () => {
            const elementTitle = screen.getByRole('heading', {
                name: 'Lista de tareas',
            }); // <h3>
            const elementAdd = screen.getByText(/Mock Add/i);
            const elementLoading = screen.getByText(/Loading/i);
            expect(elementTitle).toBeInTheDocument();
            expect(elementAdd).toBeInTheDocument();
            expect(elementLoading).toBeInTheDocument();
            expect(getTasks).toHaveBeenCalled();
        });
    });

    describe('When it load the data from getTask', () => {
        beforeEach(async () => {
            (getTasks as jest.Mock).mockResolvedValue(mockTasks);
            await act(async () => {
                render(<List></List>);
                // Render process:
                // Define state -> tasks: []
                // Renderiza el componente -> Loading
                // useEffect -> savedTaskMock -> clg []
                // useEffect inicio -> handleLoad()
                //  |-> getTasksMock([])
                //  |-> setTasks -> [mockTask]
                //  |-> clg LOAD
                // useEffect -> savedTaskMock -> clg [mockTask]
            });
        });
        test(`Then it should be render the data`, async () => {
            const elementList = await screen.findByRole('list'); // <ul />
            expect(elementList).toBeInTheDocument();
            await waitFor(() => {
                expect(saveTasks).toHaveBeenCalled();
            });
            const elementItem = await screen.findByText(/Test task/i);
            expect(elementItem).toBeInTheDocument();
        });
    });

    describe('When its method handleAdd() are called', () => {
        beforeEach(async () => {
            (getTasks as jest.Mock).mockResolvedValue(mockTasks);
            (Add as jest.Mock).mockImplementation(({ handleAdd }) => {
                return (
                    <button
                        onClick={() => {
                            handleAdd(mockAddTask);
                        }}
                    >
                        Mock Add
                    </button>
                );
            });
            await act(async () => {
                render(<List></List>);
            });
        });
        test('Then the tasks array should render with a new item', async () => {
            const button = screen.getByRole('button');
            userEvent.click(button);
            const addItem = await screen.findByText(/Added task/i);
            expect(addItem).toBeInTheDocument();
            expect(saveTasks).toHaveBeenCalled();
        });
    });

    describe('When its method updateTask() are called', () => {
        beforeEach(async () => {
            const mockUpdatedTask = new Task('Updated task', 'user');
            mockUpdatedTask.id = '000001';
            (getTasks as jest.Mock).mockResolvedValue([mockTask, mockAddTask]);
            (Item as jest.Mock).mockImplementation(({ item, handleUpdate }) => {
                return (
                    <>
                        <p>
                            Task: {item.id} {item.title}
                        </p>
                        <button
                            onClick={() => {
                                handleUpdate(mockUpdatedTask);
                            }}
                        >
                            Update
                        </button>
                    </>
                );
            });
            await act(async () => {
                render(<List></List>);
            });
        });
        test(`Then the tasks array should be rendered 
                with the updated item`, async () => {
            const title = /Updated task/i;
            const buttons = await screen.findAllByRole('button', {
                name: 'Update',
            });
            userEvent.click(buttons[0]);
            expect(saveTasks).toHaveBeenCalled();
            const updateItem = await screen.findByText(title);
            expect(updateItem).toBeInTheDocument();
        });
    });

    describe('When its method deleteTask()  are called', () => {
        beforeEach(async () => {
            (getTasks as jest.Mock).mockResolvedValue(mockTasks);
            (Item as jest.Mock).mockImplementation(
                ({ item, handleUpdate, handleDelete }) => {
                    return (
                        <>
                            <p>
                                Task: {item.id} {item.title};
                            </p>
                            <button
                                onClick={() => {
                                    handleDelete(mockTask.id);
                                }}
                            >
                                Delete
                            </button>
                        </>
                    );
                }
            );
            await act(async () => {
                render(<List></List>)
            })
        });

        test(`Then as the tasks array should be empty, 
            the loading should be render again`, async () => {
            const button = await screen.findByRole('button', {
                name: 'Delete',
            });
            userEvent.click(button);
            expect(saveTasks).toHaveBeenCalled();
            const elementLoading = screen.getByText(/Loading/i);
            expect(elementLoading).toBeInTheDocument();
        });
    });
});
