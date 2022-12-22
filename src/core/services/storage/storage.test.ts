import { getStorageList, setStorageList } from "./storage";

type TestItem = {name: string}
const testItem = {name: 'Test'} 

describe('Given storage functions', () => {
    describe('When we use getStorage with data in localStorage', () => {
        beforeEach(() => {
            Storage.prototype.getItem = jest
                .fn()
                .mockReturnValue(JSON.stringify([testItem]));
        })
        test('Web API function should be call', () => {
            const result = getStorageList<TestItem>('test')
            expect(result).toEqual([testItem])
            expect(Storage.prototype.getItem).toHaveBeenCalledWith('test')
        })
    });
    describe('When we use getStorage without data in localStorage', () => {
        beforeEach(() => {
            Storage.prototype.getItem = jest
                .fn()
                .mockReturnValue(null);
        })
        test('Web API function should be call', () => {
            const result = getStorageList<TestItem>('test')
            expect(result).toEqual([])
            expect(Storage.prototype.getItem).toHaveBeenCalledWith('test')
        })
    });
    describe('When we use setStorage', () => {
        beforeEach(() => {
            Storage.prototype.setItem = jest.fn()
        })
        test('Web API function should be call', () => {
            setStorageList<TestItem>('test', [testItem])
            expect(Storage.prototype.setItem).toHaveBeenCalledWith('test', JSON.stringify([testItem]))
        })
    });
});
