import { Task } from '../models/task';
import { getTasks, getTasksDelay, saveTasks } from './mock.service';
import { getStorageList, setStorageList } from '../../../core/services/storage/storage';
import { TASKS } from './mock.tasks';

jest.mock('../../../core/services/storage/storage')

const mockData = ['test'];
const testGetData = async () => {
    const result = await getTasks();
    expect(getStorageList).toHaveBeenCalled();
    expect(result).toEqual(mockData);
}

const testGetDefaultData = async () => {
    const result = await getTasks();
    expect(getStorageList).toHaveBeenCalled();
    expect(setStorageList).toHaveBeenCalled();
    expect(result).toEqual(TASKS);
}


const testGetDataDelay = async () => {
    const result = await getTasksDelay();
    expect(getStorageList).toHaveBeenCalled();
    expect(result).toEqual(mockData);
}

const testGetDefaultDataDelay = async () => {
    const result = await getTasksDelay();
    expect(getStorageList).toHaveBeenCalled();
    expect(setStorageList).toHaveBeenCalled();
    expect(result).toEqual(TASKS);
}

describe('Given getTasks or getTasksDelay', () => {
    describe('When I call it with data in local storage', () => {
        beforeEach(() => {
            (getStorageList as jest.Mock).mockReturnValue(mockData);
        });
        test('Then the data should be obtained', testGetData);
        test('Then the data should be obtained with delay also', testGetDataDelay);
    });
    describe('When I call it without data in local storage', () => {
        beforeEach(() => {
            (getStorageList as jest.Mock).mockReturnValue([]);
        });
        test('Then the data from TASK should be obtained', testGetDefaultData)
        test('Then the data from TASK should be obtained  with delay also', testGetDefaultDataDelay)
    });
});



describe('Given saveTasks', () => {
    describe('When I call it', () => {
        test('Then localStorage should be use with the data', () => {
            const mockTasks: Array<Task> = [];
            saveTasks(mockTasks);
            expect(setStorageList).toHaveBeenCalledWith(
                'Tasks',
                mockTasks
            );
        });
    });
});
