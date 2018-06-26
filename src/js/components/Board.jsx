import React, { PureComponent } from 'react';

import { List, Card, Settings } from './index';

import { getAllData } from '../utilities/datastore';
import { getSettings, setSettings, clearSettings } from '../utilities/settings';

class Board extends PureComponent {
    constructor(props) {
        super(props);

        const settings = getSettings();

        this.state = {
            data: [],
            settings
        };
    }

    componentDidMount() {
        getAllData()
            .then(data => this.setState({ data }))
            .catch(() => this.props.invalidateToken());
    }

    handleHideList(listName) {
        this.setState(
            {
                settings: {
                    hiddenLists: [...this.state.settings.hiddenLists, listName]
                }
            },
            () => setSettings(this.state.settings)
        );
    }

    handleResettingHiddenLists() {
        this.setState(
            {
                settings: {
                    hiddenLists: []
                }
            },
            () => clearSettings()
        );
    }

    render() {
        return (
            <div className="board">
                {this.state.data
                    .filter(
                        list =>
                            this.state.settings.hiddenLists.indexOf(
                                list.name
                            ) === -1
                    )
                    .map((list, i) => (
                        <List
                            name={list.name}
                            key={i}
                            handleHideList={this.handleHideList.bind(this)}
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
                    handleResettingHiddenLists={this.handleResettingHiddenLists.bind(
                        this
                    )}
                    handleLogout={this.props.invalidateToken}
                />
            </div>
        );
    }
}

export default Board;
