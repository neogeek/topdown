import React, { PureComponent } from 'react';

class Settings extends PureComponent {
    render() {
        return (
            <div className="list">
                <h2 className="list__header">Settings</h2>
                <ul className="list__list">
                    <li className="list__list_item">
                        <a
                            className="list__list_item_link button"
                            onClick={e => {
                                e.preventDefault();
                                this.props.handleResettingHiddenLists();
                            }}
                        >
                            Reset Hidden Lists
                        </a>
                    </li>
                    <li className="list__list_item">
                        <a
                            href="https://github.com/neogeek/top-down/issues"
                            target="_blank"
                            className="list__list_item_link button"
                        >
                            Support
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Settings;
