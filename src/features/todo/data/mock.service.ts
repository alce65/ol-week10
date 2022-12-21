import { getStorage, setStorage } from '../../../core/services/storage/storage';
import { consoleDebug } from '../../../tools/debug';
import { Task, TaskType } from '../models/task';
import { TASKS } from './mock.tasks';

export const getTasks = async (): Promise<Array<TaskType>> => {
    const data = getStorage<Task>('Tasks');
    if (!data.length) {
        setStorage('Tasks', TASKS);
        return(TASKS);
    }
    return(data);
};

export const getTasksDelay = (): Promise<Array<TaskType>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = getStorage<Task>('Tasks');
            if (!data.length) {
                setStorage('Tasks', TASKS);
                resolve(TASKS);
            }
            resolve(data);
        }, 2000);
    });
};

export const saveTasks = async (tasks: Array<Task>) => {
    consoleDebug('Saving');
    setStorage('Tasks', tasks)
};




