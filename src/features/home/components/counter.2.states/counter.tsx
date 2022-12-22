import { useEffect, useState } from 'react';
import { consoleDebug } from '../../../../tools/debug';
import './counter.css';
export function Counter2({ setTotal }: { setTotal: () => void }) {
    const [count, setCount] = useState(0);
    const [clicks, setClicks] = useState(0);

    useEffect(() => {
        consoleDebug(count);
    }, [count]);

    const handlerClick = (increment: number) => {
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
