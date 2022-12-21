import { consoleDebug } from '../../../tools/debug';
import { Task, TaskType } from '../models/task';
import { TASKS } from './mock.tasks';

export const getTasks = (): Promise<Array<TaskType>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = localStorage.getItem('Tasks');
            if (!data) {
                localStorage.setItem('Tasks', JSON.stringify(TASKS));
                resolve(TASKS);
            }
            resolve(JSON.parse(data as string) as Array<TaskType>);
        }, 2000);
    });
};

export const saveTasks = async (tasks: Array<Task>) => {
    consoleDebug('Saving');
    localStorage.setItem('Tasks', JSON.stringify(tasks));
};
