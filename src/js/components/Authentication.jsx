import React, { useEffect, useState } from 'react';

import { authorize } from '../utilities/api';
import { getSetting, setSetting, removeSetting } from '../utilities/settings';

import { USER_TOKEN_KEY } from '../config';

const Authentication = ({ children }) => {
    const [token, setToken] = useState(getSetting(USER_TOKEN_KEY));

    useEffect(() => {
        const userTokenFromUrl = window.location.hash.match(/token=([^&]+)/u);

        if (userTokenFromUrl) {
            setToken(userTokenFromUrl[1]);

            setSetting(USER_TOKEN_KEY, userTokenFromUrl[1]);

            window.history.replaceState(
                null,
                document.title,
                window.location.pathname
            );
        }
    }, []);

    useEffect(() => {
        setSetting(USER_TOKEN_KEY, token);
    }, [token]);

    const invalidateToken = () => {
        setToken();

        removeSetting(USER_TOKEN_KEY);

        window.history.replaceState(
            null,
            document.title,
            window.location.pathname
        );
    };

    if (token) {
        return React.Children.map(children, child =>
            React.cloneElement(child, {
                invalidateToken
            })
        );
    }

    return (
        <div className="promo__wrapper">
            <header className="promo__header">
                <ul>
                    <li>
                        <a href="https://topdown.app">
                            <b>Top Down</b>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/neogeek/topdown/">GitHub</a>
                    </li>
                    <li>
                        <a href="https://github.com/neogeek/topdown/issues">
                            Support
                        </a>
                    </li>
                </ul>
            </header>
            <h1>
                Your tasks,
                <br />
                together at last
            </h1>
            <p>
                Trello makes it easy to track tasks per project, and{' '}
                <b>Top Down</b> makes it easy to aggregate those tasks in one
                place.
            </p>

            <p>
                Just{' '}
                <i role="img" aria-label="star">
                    ⭐️
                </i>{' '}
                your most active boards and their lists will appear, combined,
                in your <b>Top Down</b> dashboard.
            </p>

            <p>
                Hide the lists you don't want, keep the ones you do. Easy as
                that!
            </p>
            <div className="authentication__wrapper">
                <button
                    className="button button_authentication"
                    onClick={authorize}
                >
                    Login with Trello
                </button>{' '}
                <span className="button_authentication_notice">
                    We request read-only access.
                </span>
            </div>
            <a href="images/screenshot.jpg">
                <img src="images/screenshot.jpg" />
            </a>
        </div>
    );
};

export default Authentication;
