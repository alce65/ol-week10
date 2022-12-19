import { Task, TaskType } from '../models/task';
import { getTasks, saveTasks } from './mock.service';
import { TASKS } from './mock.tasks';

describe('Given getTasks', () => {
    describe('When I call it with data in local storage', () => {
        const mockData = ['test'];
        // Array<TaskType>;
        beforeEach(() => {
            const mockDataString = JSON.stringify(mockData);
            Storage.prototype.getItem = jest
                .fn()
                .mockReturnValue(mockDataString);
        });
        test('Then the data should be obtained', async () => {
            const result = await getTasks();
            expect(localStorage.getItem).toHaveBeenCalled();
            expect(result).toEqual(mockData);
        });
    });
    describe('When I call it without data in local storage', () => {
        beforeEach(() => {
            Storage.prototype.getItem = jest.fn().mockReturnValue(null);
            Storage.prototype.setItem = jest.fn();
        });
        test('Then the data from TASK should be obtained', async () => {
            const result = await getTasks();
            expect(localStorage.getItem).toHaveBeenCalled();
            expect(localStorage.setItem).toHaveBeenCalled();
            expect(result).toEqual(TASKS);
        });
    });
});

describe('Given saveTasks', () => {
    describe('When I call it', () => {
        test('Then localStorage should be use with the data', () => {
            Storage.prototype.setItem = jest.fn();
            const mockTasks: Array<Task> = [];
            const mockTasksString = JSON.stringify(mockTasks);
            saveTasks(mockTasks);
            expect(localStorage.setItem).toHaveBeenCalledWith(
                'Tasks',
                mockTasksString
            );
        });
    });
});
