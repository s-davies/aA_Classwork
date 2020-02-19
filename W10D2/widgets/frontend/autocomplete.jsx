import React from 'react';
export default class Autocomplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = { inputVal: "" };
    }

    matchingNames() {
        const names = this.props.allNames;
        const iVal = this.state.inputVal.toLowerCase();
        const matching = [];
        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            if (name.toLowerCase().slice(0, iVal.length) === iVal) {
                matching.push(name);
            }
        }
        // debugger
        return matching;
    }

    render() {
        return (
            <div className="autocomplete-div">
                <input type="text" value={this.state.inputVal} onChange={() => this.setState({ inputVal: event.target.value })}/>
                <ul>
                    {this.matchingNames().map((name, idx) => (
                        <li onClick={() => this.setState({ inputVal: name })} key={idx}>{name}</li>
                    ))}
                </ul>
            </div>
        );
    }
}