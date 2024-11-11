import { useState } from "react";


export function User() {
    const [counter, setCounter] = useState(0);

    const increment = (e) => {
        e.preventDefault();
        setCounter(counter + 1);
    }

    return (
        <div>
            <button onClick={increment}>Sumar</button>
            <p>{counter}</p>
        </div>
    )
}