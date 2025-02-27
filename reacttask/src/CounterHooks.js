import React from 'react';
function CounterHooks() {
    const [counter, setCounter] = React.useState(0)
    const [msg, setMsg] = React.useState("")

    const incrementCount = () => {
        if (counter > 4) {
            setMsg("Maximum Limit Reached.")
        } else {
            setCounter(counter + 1)
            setMsg("")
        }
    }

    const decrementCount = () => {
        if (counter < 1) {
            setMsg("Minimum Limit Reached.")
        } else {
            setCounter(counter - 1)
            setMsg("")
        }
    }
    return (<>
        <h1>{counter}</h1>
        <input type='button' value=' + ' onClick={incrementCount} />
        <input type='button' value=' - ' onClick={decrementCount} /><br />
        <p style={{ color: 'red' }}>{msg}</p>
    </>);
}

export default CounterHooks;