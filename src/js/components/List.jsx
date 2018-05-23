import React, { Component } from 'react';

class List extends Component {

    render() {

        return (
            <div className="list">

                <h2>{this.props.name}</h2>

                {this.props.children}

            </div>
        );

    }

}

export default List;
