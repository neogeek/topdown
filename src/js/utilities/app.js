const appName = 'Top Down';
const appKey = '6a26fcd8d47e93922b8caaab9178aa18';
const redirectUrl = `${window.location.origin}${window.location.pathname}`;
const userToken = () => localStorage.getItem('trello_token');

const apiRequest = path => {
    return fetch(
        `https://api.trello.com/1/${path}&key=${appKey}&token=${userToken()}`
    ).then(response => {
        if (!response.ok) {
            localStorage.removeItem('trello_token');
            return null;
        }
        return response.json();
    });
};

const requestAllBoards = () => {
    return apiRequest('members/me/boards?filter=starred&fields=id,name');
};

const requestBoardLists = boardId => {
    return apiRequest(
        `boards/${boardId}/lists?cards=open&card_fields=id,name,url,idBoard&filter=open`
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
