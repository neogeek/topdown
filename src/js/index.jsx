import React from 'react';
import ReactDOM from 'react-dom';

import { Board, List, Card } from './components';

import { getAllData } from './utilities/app';

getAllData().then(data => {
    ReactDOM.render(
        <Board>
            {data.map((list, i) => (
                <List name={list.name} key={i}>
                    {list.cards.map((card, j) => (
                        <Card name={card.name} url={card.url} key={j} />
                    ))}
                </List>
            ))}
        </Board>,
        document.getElementById('root')
    );
});
