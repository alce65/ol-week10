import { Task } from './task';

// import crypto from 'crypto';

// Object.defineProperty(global, 'crypto', {
//     value: {
//         getRandomValues: (arr: Uint32Array) => crypto.randomBytes(arr.length),
//     },
// });

// Object.defineProperty(global, 'crypto', {
//     value: {
//         getRandomValues: jest.fn(), // (arr: Uint32Array) => crypto.randomBytes(arr.length),
//     },
// });

// global.crypto = {
//     subtle: {} as SubtleCrypto,
//     getRandomValues: jest.fn(),
//     randomUUID: jest.fn(),
// };

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
