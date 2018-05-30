import React from 'react';
import ReactDOM from 'react-dom';

import { Board, List, Card } from './components';

import {
    authorize,
    getAllData,
    getTokenFromUrl,
    userToken
} from './utilities/app';

const tokenFromURL = getTokenFromUrl();

if (tokenFromURL) {
    localStorage.setItem('trello_token', tokenFromURL);
}

if (userToken()) {
    getAllData().then(data => {
        ReactDOM.render(
            <Board>
                {data.map((list, i) => (
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
            </Board>,
            document.getElementById('root')
        );
    });
} else {
    ReactDOM.render(
        <button onClick={authorize}>Login with Trello</button>,
        document.getElementById('root')
    );
}
