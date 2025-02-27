import React from "react";

class Counter extends React.Component {
    constructor(props) {
        super(props);

        const storedCounter = localStorage.getItem("counter");
        this.state = { counter: storedCounter ? parseInt(storedCounter) : 0};
    }

    handleIncrement = () => {
        if (this.state.counter < 5) {
            this.setState(
                (prevState) => ({ counter: prevState.counter + 1 }),
                () => localStorage.setItem("counter", this.state.counter) 
            );
        }
    };

    handleDecrement = () => {
        if (this.state.counter > 0) {
            this.setState(
                (prevState) => ({ counter : prevState.counter - 1}),
                ()  => localStorage.setItem("counter", this.state.counter)
            );
        }
    };

    handleClear = () => {
        this.setState({ counter: 0 } , 
        () => localStorage.setItem("counter",0)
        );
    };

    render() {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1>{this.state.counter}</h1>

                <input
                    style={{margin: "5px", cursor: this.state.counter >= 5 ? "not-allowed" : "pointer"}}
                    type="button" value="+" onClick={this.handleIncrement} disabled={this.state.counter >= 5}
                />

                <input
                    style={{margin: "5px", cursor: this.state.counter <= 0 ? "not-allowed" : "pointer"}}
                    type="button" value="-" onClick={this.handleDecrement} disabled={this.state.counter <= 0}
                />

                <input
                    style={{margin: "5px", cursor: "pointer"}}
                    type="button" value="Clear" onClick={this.handleClear}
                />
            </div>
        );
    }
}

export default Counter;
