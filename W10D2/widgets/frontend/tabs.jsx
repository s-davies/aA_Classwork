import React from 'react';
export default class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: 0 };
    }

    render() {
        return (
            <div className="tabs-div">
                <ul>
                    {this.props.alltabs.map((tab,idx) => (
                        <header key={idx}><h1 onClick={() => this.setState({ selected: idx })}>{tab.title}</h1></header>
                    ))}
                </ul>
                <article>
                    {this.props.alltabs[this.state.selected].content}
                </article>
            </div>
        );
    }
}