import { useEffect, useState } from 'react';
import './counter.css';
export function Counter({ setTotal }: { setTotal: () => void }) {
    // Esta sería la variable al margen del state:
    // let count = 0

    // La misma variable como state
    // const [count, setCount] = useState(0);

    // Un estado más complejo -> objeto

    const initialState = {
        value: 0,
        clicks: 0,
    };
    const [count, setCount] = useState(initialState);

    useEffect(() => {
        console.log(count);
    }, [count]);

    // Sin destructuring
    // const stateArray = useState(0);
    // const count = stateArray[0]; // getter del state
    // const setCount = stateArray[1]; // setter del state

    const handlerClick = (increment: number) => {
        //No podemos modificar directamente un estado
        // count = count + value  -> daría un error por ser una constante
        setCount({
            ...count,
            value: count.value + increment,
            clicks: count.clicks + 1,
        });
        setTotal();
    };

    return (
        <section className="counter">
            <h3>Counter</h3>
            <p>VALUE: {count.value}</p>
            <p>Clicks: {count.clicks}</p>
            <div>
                <button
                    onClick={() => {
                        handlerClick(-1);
                    }}
                >
                    ➖
                </button>
                <button
                    onClick={() => {
                        handlerClick(+1);
                    }}
                >
                    ➕
                </button>
            </div>
        </section>
    );
}
