import React from 'react';
import ReactDOM from 'react-dom';

import { Board, List, Card } from './components';

import { appName, appKey, redirectUrl } from './config';

import { authorize } from './utilities/api';
import { getUserToken, getTokenFromUrl } from './utilities/auth';
import { getAllData } from './utilities/app';

const tokenFromURL = getTokenFromUrl();

if (tokenFromURL) {
    localStorage.setItem('trello_token', tokenFromURL);
}

if (getUserToken()) {
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
        <button onClick={() => authorize({ appName, appKey, redirectUrl })}>
            Login with Trello
        </button>,
        document.getElementById('root')
    );
}
