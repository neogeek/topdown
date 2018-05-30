import React, { Component } from 'react';

import { appName, appKey, redirectUrl } from '../config';

import { authorize } from '../utilities/api';
import {
    getUserToken,
    setUserToken,
    removeUserToken,
    getTokenFromUrl
} from '../utilities/auth';

class Authentication extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: getUserToken()
        };

        const userTokenFromUrl = getTokenFromUrl();

        if (userTokenFromUrl) {
            this.state.token = userTokenFromUrl;

            setUserToken(userTokenFromUrl);
        }

        this.invalidateToken = this.invalidateToken.bind(this);
    }

    invalidateToken() {
        this.setState({ token: null });

        removeUserToken();
    }

    render() {
        return (
            <div className="authentication">
                {this.state.token ? (
                    React.Children.map(this.props.children, child =>
                        React.cloneElement(child, {
                            invalidateToken: this.invalidateToken
                        })
                    )
                ) : (
                    <button
                        onClick={() =>
                            authorize({ appName, appKey, redirectUrl })
                        }
                    >
                        Login with Trello
                    </button>
                )}
            </div>
        );
    }
}

export default Authentication;
