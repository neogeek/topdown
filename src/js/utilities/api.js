import { removeUserToken } from './auth';

const API_URL = 'https://trello.com/1';

const apiRequest = (path, { appKey, userToken }) => {
    return fetch(`${API_URL}/${path}&key=${appKey}&token=${userToken}`).then(
        response => {
            if (!response.ok) {
                removeUserToken();
                return null;
            }
            return response.json();
        }
    );
};

const authorize = ({ appName, appKey, redirectUrl }) => {
    window.location.href = `${API_URL}/authorize?response_type=token&key=${appKey}&redirect_uri=${encodeURIComponent(
        redirectUrl
    )}&callback_method=fragment&scope=read%2Cwrite&expiration=never&name=${encodeURIComponent(
        appName
    )}`;
};

export { apiRequest, authorize };
