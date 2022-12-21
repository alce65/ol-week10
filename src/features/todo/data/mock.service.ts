import { getStorageList, setStorageList } from '../../../core/services/storage/storage';
import { consoleDebug } from '../../../tools/debug';
import { Task, TaskStructure } from '../models/task';
import { TASKS } from './mock.tasks';

export const getTasks = async (): Promise<Array<TaskStructure>> => {
    const data = getStorageList<Task>('Tasks');
    if (!data.length) {
        setStorageList('Tasks', TASKS);
        return(TASKS);
    }
    return(data);
};

export const getTasksDelay = (): Promise<Array<TaskStructure>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = getStorageList<Task>('Tasks');
            if (!data.length) {
                setStorageList('Tasks', TASKS);
                resolve(TASKS);
            }
            resolve(data);
        }, 2000);
    });
};

export const saveTasks = async (tasks: Array<Task>) => {
    consoleDebug('Saving');
    setStorageList('Tasks', tasks)
};




