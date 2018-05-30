import React, { Component } from 'react';

import { appName, appKey, redirectUrl } from '../config';

import { authorize } from '../utilities/api';
import { getUserToken, setUserToken, getTokenFromUrl } from '../utilities/auth';

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
    }

    render() {
        return (
            <div className="authentication">
                {this.state.token ? (
                    React.Children.map(this.props.children, child =>
                        React.cloneElement(child, this.state)
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
