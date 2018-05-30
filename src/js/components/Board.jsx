import React, { PureComponent } from 'react';

import { List, Card } from './index';

import { getAllData } from '../utilities/datastore';

class Board extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount() {
        getAllData()
            .then(data => this.setState({ data }))
            .catch(err => this.props.invalidateToken());
    }

    render() {
        return (
            <div className="board">
                {this.state.data.map((list, i) => (
                    <List name={list.name} key={i}>
                        {list.cards.map((card, j) => (
                            <Card
                                name={card.name}
                                url={card.url}
                                boardName={card.boardName}
                                key={j}
                            />
                        ))}
                    </List>
                ))}
            </div>
        );
    }
}

export default Board;
