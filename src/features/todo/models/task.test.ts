import { Task } from './task';

describe('Given "Task" data model', () => {
    test('Then it should instantiate a task', () => {
        const mockTitle = 'Test task';
        const mockResponsible = 'Test user';
        const result = new Task(mockTitle, mockResponsible);
        expect(result).toBeInstanceOf(Task);
        expect(result).toHaveProperty('title', mockTitle);
        expect(result).toHaveProperty('responsible', mockResponsible);
        expect(result).toHaveProperty('isCompleted', false);
    });
});
