export const getStorageList =  <T>(storeName: string): Array<T> =>  {
    const result = localStorage.getItem(storeName);
    if (!result) return []
    return JSON.parse(result) 
}

export const setStorageList = <T>(storeName: string, data: Array<T>): void => {
    localStorage.setItem(storeName, JSON.stringify(data));
}
