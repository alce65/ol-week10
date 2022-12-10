import { useEffect, useState } from 'react';
import './counter.css';
export function Counter2({ setTotal }: { setTotal: () => void }) {
    // Esta sería la variable al margen del state:
    // let count = 0

    // La misma variable como state
    // const [count, setCount] = useState(0);

    // Un estado más complejo -> objeto

    const [count, setCount] = useState(0);
    const [clicks, setClicks] = useState(0);

    useEffect(() => {
        console.log(count);
    }, [count]);

    // Sin destructuring
    // const stateArray = useState(0);
    // const count = stateArray[0]; // getter del state
    // const setCount = stateArray[1]; // setter del state

    const handlerClick = (increment: number) => {
        //count = count + value;
        setCount(count + increment);
        setClicks(clicks + 1);
        setTotal();
    };

    return (
        <section className="counter">
            <h3>Counter</h3>
            <p>VALUE: {count}</p>
            <p>Clicks: {clicks}</p>
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
