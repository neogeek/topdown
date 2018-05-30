import React, { PureComponent } from 'react';

class Board extends PureComponent {
    render() {
        return <div className="board">{this.props.children}</div>;
    }
}

export default Board;
