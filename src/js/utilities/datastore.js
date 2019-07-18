import {apiRequest} from './api';
import {getSetting} from './settings';

import {APP_KEY, USER_TOKEN_KEY} from '../config';

const requestAllBoards = () =>
    apiRequest('members/me/boards?filter=starred&fields=id,name', {
        APP_KEY,
        'userToken': getSetting(USER_TOKEN_KEY)
    });

const requestBoardLists = boardId =>
    apiRequest(
        `boards/${boardId}/lists?cards=open&card_fields=id,name,url,idBoard&filter=open`,
        {
            APP_KEY,
            'userToken': getSetting(USER_TOKEN_KEY)
        }
    );

const mapBoardListsToBoards = (boardLists, boards) => {

    boardLists.map(lists =>
        (boards.filter(board => board.id === lists[0].idBoard)[0].lists = lists));

    return boards;

};

const convertDataToStateStructure = data => {

    const lists = [];

    for (let i = 0; i < data.length; i += 1) {

        const boardName = data[i].name;

        for (let j = 0; j < data[i].lists.length; j += 1) {

            const {id, name, cards} = data[i].lists[j];

            const exisitingList = lists.filter(list => list.name === name);

            let currentList = null;

            if (exisitingList.length) {

                [currentList] = exisitingList;

                currentList.ids.push(id);
                currentList.cards = currentList.cards.concat([
                    ...cards.map(card => ({...card,
                        boardName}))
                ]);

            } else {

                currentList = {
                    name,
                    'ids': [id],
                    'cards': [
                        ...cards.map(card => ({...card,
                            boardName}))
                    ]
                };

                lists.push(currentList);

            }

        }

    }

    return lists;

};

export const getAllData = () =>
    requestAllBoards()
        .then(boards =>
            Promise.all(boards.map(({id}) => requestBoardLists(id)))
                .then(boardLists => mapBoardListsToBoards(boardLists, boards))
                .then(() => boards))
        .then(convertDataToStateStructure);
