import React, { Component } from 'react';

class Board extends Component {

    render() {

        return (
            <div className="board">

                <h1>Top Down</h1>

                {this.props.children}

            </div>
        );

    }

}

export default Board;
