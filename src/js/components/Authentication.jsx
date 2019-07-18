import React, {useEffect, useState} from 'react';

import {authorize} from '../utilities/api';
import {getSetting, setSetting} from '../utilities/settings';

import {USER_TOKEN_KEY} from '../config';

const Authentication = ({children}) => {

    const [
        token,
        setToken
    ] = useState(getSetting(USER_TOKEN_KEY));

    useEffect(() => {

        const userTokenFromUrl = window.location.hash.match(/token=([^&]+)/u);

        if (userTokenFromUrl) {

            setToken(userTokenFromUrl[1]);

        }

    }, []);

    useEffect(() => {

        setSetting(USER_TOKEN_KEY, token);

    }, [token]);

    const invalidateToken = () => setToken();

    if (token) {

        return React.Children.map(children, child =>
            React.cloneElement(child, {
                invalidateToken
            }));

    }

    return (
        <div className="authentication__loginwrapper">
            <button
                className="button button_authentication"
                onClick={authorize}
            >
                Login with Trello
            </button>
        </div>
    );

};

export default Authentication;
