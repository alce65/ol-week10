import { stringify } from "querystring";
import { getStorage, setStorage } from "./storage";

type TestItem = {name: string}
const testItem = {name: 'Test'} 

describe('Given storage functions', () => {
    describe('When we use getStorage', () => {
        beforeEach(() => {
            Storage.prototype.getItem = jest
                .fn()
                .mockReturnValue(JSON.stringify([testItem]));
        })
        test('Web API function should be call', () => {
            const result = getStorage<TestItem>('test')
            expect(result).toEqual([testItem])
            expect(Storage.prototype.getItem).toHaveBeenCalledWith('test')
        })
    });
    describe('When we use setStorage', () => {
        beforeEach(() => {
            Storage.prototype.setItem = jest.fn()
        })
        test('Web API function should be call', () => {
            setStorage<TestItem>('test', [testItem])
            expect(Storage.prototype.setItem).toHaveBeenCalledWith('test', JSON.stringify([testItem]))
        })
    });
});
