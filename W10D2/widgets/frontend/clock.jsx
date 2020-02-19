import React from 'react';
export default class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {time: new Date()};
        this.tick = this.tick.bind(this);
        this.id = 0;
    }

    tick() {
        this.setState({time: new Date()});
    }

    componentDidMount() {
        this.id = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.id);
        this.id = 0;
    }

    render() {
        return (
            <div className="clock-div">
                <h1>Clock!</h1>
                <h2>{this.state.time.toLocaleTimeString('en-US')}</h2>
            </div>
        );
    }
}