import { appName, appKey, redirectUrl } from '../config';

import { apiRequest, authorize } from './api';
import { getUserToken, setUserToken, getTokenFromUrl } from './auth';

const requestAllBoards = () => {
    return apiRequest('members/me/boards?filter=starred&fields=id,name', {
        appKey,
        userToken: getUserToken()
    });
};

const requestBoardLists = boardId => {
    return apiRequest(
        `boards/${boardId}/lists?cards=open&card_fields=id,name,url,idBoard&filter=open`,
        {
            appKey,
            userToken: getUserToken()
        }
    );
};

const mapBoardListsToBoards = (boardLists, boards) => {
    boardLists.map(lists => {
        boards.filter(board => board.id === lists[0].idBoard)[0].lists = lists;
    });

    return boards;
};

const convertDataToStateStructure = data => {
    const lists = [];

    for (let i = 0; i < data.length; i += 1) {
        const boardName = data[i].name;

        for (let j = 0; j < data[i].lists.length; j += 1) {
            const { id, name, cards } = data[i].lists[j];

            const exisitingList = lists.filter(list => list.name === name);

            let currentList = null;

            if (!exisitingList.length) {
                currentList = {
                    name,
                    ids: [id],
                    cards: [...cards.map(card => ({ ...card, boardName }))]
                };

                lists.push(currentList);
            } else {
                currentList = exisitingList[0];

                currentList.ids.push(id);
                currentList.cards = currentList.cards.concat([
                    ...cards.map(card => ({ ...card, boardName }))
                ]);
            }
        }
    }

    return lists;
};

const getAllData = () =>
    requestAllBoards()
        .then(boards => {
            return Promise.all(boards.map(({ id }) => requestBoardLists(id)))
                .then(boardLists => mapBoardListsToBoards(boardLists, boards))
                .then(() => boards);
        })
        .then(convertDataToStateStructure);

export { getAllData };
