// Info from https://effectivetypescript.com/2020/05/26/iterate-objects/

```ts
export const checkObject = () => {
    const obj = {
        name: 'Pepe',
        passwd: '22',
    };
    let key: keyof typeof obj;

    for (key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            console.log(value);
        }
    }

    for (const [key, value] of Object.entries(obj)) {
        console.log(key); // Type is string
        console.log(value); // Type is string
    }
};

```
