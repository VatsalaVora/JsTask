import React from 'react'
class StopWatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = { time: 0 };
        this.interval = null;
    }

    startTime() {
        if (!this.interval) {
            this.interval = setInterval(() => {
                this.setState({ time: this.state.time + 1 });
            }, 1000);
        }
    };

    pauseTime() {
        clearInterval(this.interval);
        this.interval = null;
    };

    resetTime() {
        this.setState({ time: 0 })
    }
    render() {
        return (<>
            <h1>StopWatch</h1>
            <h2>{this.state.time}</h2>
            <input type="button" value="Start" onClick={this.startTime.bind(this)}></input>
            <input type="button" value="Pause" onClick={this.pauseTime.bind(this)}></input>
            <input type="button" value="Reset" onClick={this.resetTime.bind(this)}></input>
        </>
        )
    }
}
export default StopWatch