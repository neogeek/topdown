(() => {

    const appKey = '6a26fcd8d47e93922b8caaab9178aa18';
    const userToken = localStorage.getItem('trelloUserToken');

    const apiRequest = (path) => {

        return fetch(`https://api.trello.com/1/${path}&key=${appKey}&token=${userToken}`)
            .then(response => response.json());

    }

    const requestAllBoards = () => {

        return apiRequest('members/me/boards?filter=starred&fields=id,name');

    }

    const requestBoardLists = boardId => {

        return apiRequest(`boards/${boardId}/lists?cards=open&card_fields=id,name&filter=open`)

    }

    const mapBoardListsToBoards = (boardLists, boards) => {

        boardLists.map(lists => {

            boards.filter(board => board.id === lists[0].idBoard)[0].lists = lists;

        });

        return boards;

    }

    requestAllBoards().then()
        .then(boards => {

            return Promise.all(boards.map(({ id }) => requestBoardLists(id)))
                .then(boardLists => mapBoardListsToBoards(boardLists, boards))
                .then(() => boards);

        }).then(data => {

            console.log(data);

        });

})();
