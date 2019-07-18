import React, {useEffect, useState} from 'react';

import {Card, List, Settings} from './index';

import {setJSONSetting, getJSONSetting} from '../utilities/settings';
import {getAllData} from '../utilities/datastore';

import {HIDDEN_LISTS_KEY} from '../config';

const Board = ({invalidateToken}) => {

    const [
        data,
        setData
    ] = useState([]);
    const [
        hiddenLists,
        setHiddenLists
    ] = useState(getJSONSetting(HIDDEN_LISTS_KEY, []));

    const handleResettingHiddenLists = () => setHiddenLists([]);

    const handleHideList = listName =>
        setHiddenLists([
            ...hiddenLists,
            listName
        ]);

    useEffect(() => setJSONSetting(HIDDEN_LISTS_KEY, hiddenLists), [hiddenLists]);

    useEffect(
        () =>
            getAllData()
                .then(setData)
                .catch(() => invalidateToken()),
        []
    );

    return (
        <div className="board">
            {data
                .filter(list => hiddenLists.indexOf(list.name) === -1)
                .map((list, i) => (
                    <List
                        name={list.name}
                        key={i}
                        handleHideList={handleHideList}
                    >
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
            <Settings
                handleResettingHiddenLists={handleResettingHiddenLists}
                handleLogout={invalidateToken}
            />
        </div>
    );

};

export default Board;
