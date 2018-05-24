import React, { Component } from 'react';

class List extends Component {
    render() {
        return (
            <div className="list">
                <h2 className="list__header">{this.props.name}</h2>
                <ul className="list__list">{this.props.children}</ul>
            </div>
        );
    }
}

export default List;
