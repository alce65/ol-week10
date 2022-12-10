import { useState } from 'react';
import { Counter2 } from '../counter.2.states/counter';
import { Counter } from '../counter/counter';

export function Counters() {
    const [totalClicks, setTotalClicks] = useState(0);

    const addToTotal = () => {
        setTotalClicks(totalClicks + 1);
    };

    return (
        <>
            <p>Clicks totales: {totalClicks}</p>
            <div className="counters">
                <Counter setTotal={addToTotal}></Counter>
                <Counter2 setTotal={addToTotal}></Counter2>
            </div>
        </>
    );
}
